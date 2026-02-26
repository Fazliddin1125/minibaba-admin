import { FileText, Award, Plus, Info, CheckCircle2, X } from "lucide-react";
import { useRef } from "react";
import { useSettingsStore } from "../../../store/settingsStore";

const iconMap: Record<string, React.ReactNode> = {
  "1": <FileText size={18} style={{ color: "var(--primary)" }} />,
  "2": <Award size={18} style={{ color: "var(--primary)" }} />,
};

export default function BusinessDocumentsCard() {
  const { documents, addDocument, removeDocument } = useSettingsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    addDocument({
      id: Date.now().toString(),
      name: file.name.replace(/\.[^/.]+$/, ""),
      filename: file.name,
      verified: false,
    });
    // reset input
    e.target.value = "";
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Biznes hujjatlar
      </h3>

      {/* Dokumetnlar royxati */}
      <div className="space-y-2 mb-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-secondary/40 transition-colors group"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "oklch(0.97 0.02 45)" }}
            >
              {iconMap[doc.id] || (
                <FileText size={18} style={{ color: "var(--primary)" }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {doc.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {doc.filename}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {doc.verified ? (
                <CheckCircle2 size={20} className="text-green-500 shrink-0" />
              ) : (
                <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
                  Tekshirilmoqda
                </span>
              )}
              <button
                onClick={() => removeDocument(doc.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded flex items-center justify-center hover:bg-destructive/10"
              >
                <X size={14} className="text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dokument qoshish tugmasi */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full h-11 flex items-center justify-center gap-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors mb-3"
      >
        <Plus size={16} />
        Hujjat qo'shish
      </button>

      {/* Ogohlantirish */}
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-50 border border-blue-100">
        <Info size={15} className="text-blue-500 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Hujjatlar faqat platforma ma'muriyati uchun ko'rinadi va xavfsiz saqlanadi.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}