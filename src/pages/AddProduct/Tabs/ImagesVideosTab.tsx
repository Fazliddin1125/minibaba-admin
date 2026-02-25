import { useRef, useState, useCallback } from "react";
import { CloudUpload, Plus, X, FileVideo, ImageIcon, Save } from "lucide-react";
import { useAddProductStore } from "../../../store/addProductStore";
import { cn } from "../../../lib/utils";
import type { TabProps } from "./BasicTab";
import FooterNavigation from "../ui/FooterNavigation";


interface MediaFile {
  file: File;
  preview: string;
  type: "image" | "video";
}

// Yordamchi funksiyalar

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "video/mp4"];
const ACCEPT_ATTR = ".jpg,.jpeg,.png,.webp,.mp4";

function isVideo(file: File) {
  return file.type.startsWith("video/");
}

function createMediaFile(file: File): MediaFile {
  return {
    file,
    preview: URL.createObjectURL(file),
    type: isVideo(file) ? "video" : "image",
  };
}

function validateFile(file: File): string | null {
  if (!ACCEPTED.includes(file.type)) return "Faqat JPG, PNG, MP4 formatlar qabul qilinadi";
  if (file.size > 50 * 1024 * 1024) return "Fayl hajmi 50MB dan oshmasligi kerak";
  return null;
}

// Ma'lumotlarni Upload qiladigan qism

interface UploadZoneProps {
  file: MediaFile | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
  large?: boolean;
}

function UploadZone({ file, onUpload, onRemove, large = false }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (f: File) => {
      const err = validateFile(f);
      if (err) { setError(err); return; }
      setError(null);
      onUpload(f);
    },
    [onUpload]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.target.value = "";
  };

  return (
    <div className="space-y-1.5">
      <div
        onClick={() => !file && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-lg border-2 border-dashed transition-all overflow-hidden",
          large ? "min-h-70 sm:min-h-85" : "min-h-40",
          file
            ? "border-(--primary)/40 bg-muted"
            : isDragging
            ? "border-primary bg-(--primary)/5 scale-[1.01]"
            : "border-(--primary)/40 bg-(--primary)/2 hover:bg-(--primary)/4 hover:border-(--primary)/60 cursor-pointer"
        )}
      >
        {file ? (
          <div className="w-full h-full">
            {file.type === "video" ? (
              <video src={file.preview} className="w-full h-full object-cover" />
            ) : (
              <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
            )}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
            >
              <X size={14} />
            </button>
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {file.type === "video"
                ? <><FileVideo size={11} /> Video</>
                : <><ImageIcon size={11} /> Rasm</>
              }
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
            <div className="relative">
              <CloudUpload
                className="text-(--primary)/60"
                size={large ? 56 : 36}
                strokeWidth={1.2}
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Plus size={11} className="text-white" />
              </div>
            </div>
            <div className="space-y-0.5">
              <p className={cn(
                "font-semibold text-primary",
                large ? "text-base" : "text-xs uppercase tracking-wide"
              )}>
                Rasm yoki video yuklash
              </p>
              {large && (
                <p className="text-xs text-muted-foreground">
                  Bu rasm qidiruv natijalarida ko'rinadi
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}

// Images & Videos Tab component =====================================================================================

export default function ImagesVideosTab({ onNext, onSaveDraft }: TabProps) {
  const { images, setImages, markTabCompleted } = useAddProductStore();

  const [mainFile, setMainFile] = useState<MediaFile | null>(
    images.images[0] ? createMediaFile(images.images[0]) : null
  );
  const [extraFiles, setExtraFiles] = useState<(MediaFile | null)[]>(
    Array.from({ length: 4 }, (_, i) =>
      images.images[i + 1] ? createMediaFile(images.images[i + 1]) : null
    )
  );

  const syncToStore = (main: MediaFile | null, extras: (MediaFile | null)[]) => {
    const allFiles = [main, ...extras].filter(Boolean).map((m) => m!.file);
    setImages({ images: allFiles });
  };

  const handleMainUpload = (file: File) => {
    const mf = createMediaFile(file);
    setMainFile(mf);
    syncToStore(mf, extraFiles);
  };

  const handleMainRemove = () => {
    if (mainFile) URL.revokeObjectURL(mainFile.preview);
    setMainFile(null);
    syncToStore(null, extraFiles);
  };

  const handleExtraUpload = (index: number, file: File) => {
    const mf = createMediaFile(file);
    const updated = [...extraFiles];
    if (updated[index]) URL.revokeObjectURL(updated[index]!.preview);
    updated[index] = mf;
    setExtraFiles(updated);
    syncToStore(mainFile, updated);
  };

  const handleExtraRemove = (index: number) => {
    const updated = [...extraFiles];
    if (updated[index]) URL.revokeObjectURL(updated[index]!.preview);
    updated[index] = null;
    setExtraFiles(updated);
    syncToStore(mainFile, updated);
  };

  const handleNext = () => {
    markTabCompleted("images");
    onNext();
  };

  const totalCount = [mainFile, ...extraFiles].filter(Boolean).length;

  return (
    <div>
      {/* Tab content */}
      <div className="p-4 sm:p-6 space-y-5">

        {/* Tabning headeri */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-foreground">Media fayllar</h3>
            <p className="text-sm text-muted-foreground">
              Mahsulotingizning asosiy ko'rinishini boshqaring.
            </p>
          </div>
          <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-(--primary)/10 text-primary border border-(--primary)/20 whitespace-nowrap">
            Maksimal 5 ta fayl (JPG, PNG, MP4)
          </span>
        </div>

        {/* Upload layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Asosiy muqova rasmi</p>
            <UploadZone
              file={mainFile}
              onUpload={handleMainUpload}
              onRemove={handleMainRemove}
              large
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Qo'shimcha media</p>
            <div className="grid grid-cols-2 gap-3">
              {extraFiles.map((file, i) => (
                <UploadZone
                  key={i}
                  file={file}
                  onUpload={(f) => handleExtraUpload(i, f)}
                  onRemove={() => handleExtraRemove(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Nechta fayl yuklangan */}
        {totalCount > 0 && (
          <p className="text-xs text-muted-foreground text-right">
            {totalCount} / 5 ta fayl yuklangan
          </p>
        )}
      </div>

      {/* Footer navigaitn */}
      <FooterNavigation onSaveDraft={onSaveDraft} onNext={onNext}/>

      {/* Mobileda chiquvchi pastdagi button */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-10">
        <button
          type="button"
          onClick={handleNext}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold",
            "bg-primary text-primary-foreground",
            "hover:opacity-90 active:scale-[0.98] transition-all"
          )}
        >
          <Save size={16} />
          Saqlash
        </button>
      </div>
    </div>
  );
}