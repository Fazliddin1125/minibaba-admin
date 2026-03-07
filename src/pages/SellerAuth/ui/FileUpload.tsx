import { useCallback, useRef, useState } from "react";
import { CloudUpload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import i18n from "@/i18n/i18n";

type FileUploadProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

export const FileUpload = ({ value, onChange, error }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onChange(file);
    },
    [onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
    e.target.value = "";
  };

  const isImage = value?.type.startsWith("image/");
  const previewUrl = value && isImage ? URL.createObjectURL(value) : null;
  const fileSizeMB = value ? (value.size / 1024 / 1024).toFixed(2) : null;

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => !value && inputRef.current?.click()}
        className={cn(
          "rounded-lg border-2 border-dashed transition-all duration-200",
          !value && "cursor-pointer",
          value ? "p-4" : "p-8",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : error
            ? "border-destructive bg-destructive/5"
            : "border-border hover:border-primary/50 hover:bg-muted/30"
        )}
      >
        {value ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {isImage && previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-12 h-12 object-cover rounded-lg shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{value.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{fileSizeMB} MB</p>
              </div>
            </div>
            <button
              type="button"
              aria-label={i18n.t("remove_file")}
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <CloudUpload className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">{i18n.t("upload_file")}</span>{" "}
              {i18n.t("or_drop_here")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{i18n.t("max_file_10mb")}</p>
          </div>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};