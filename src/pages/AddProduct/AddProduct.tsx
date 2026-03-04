import { useNavigate } from "react-router-dom";
import { FileText, Images, ListChecks, DollarSign, LayoutGrid, X, Printer } from "lucide-react";
import { useAddProductStore } from "../../store/addProductStore";
import type { TabKey } from "../../store/addProductStore";
import BasicTab from "./Tabs/BasicTab";
import ImagesVideosTab from "./Tabs/ImagesVideosTab";
import { cn } from "../../lib/utils";

import InfoCards from "./ui/InfoCards";
import CharacteristicsTab from "./Tabs/CharacteristicsTab";
import TiersTab from "./Tabs/TiersTab";
import VariantsTab from "./Tabs/VariantsTab";
import i18n from "@/i18n/i18n";

// Tab config

const TAB_ORDER: TabKey[] = [
  "basic", "images", "characteristics", "prices", "variants",
];




// AddProduct componenti =========================================================================================

export default function AddProductPage() {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, completedTabs } = useAddProductStore();

  // Tabs Nav config
  const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "basic",           label: i18n.t("basic_tabname"),            icon: <FileText size={15} />   },
    { key: "images",          label: i18n.t("img_and_vid_tabname"),  icon: <Images size={15} />     },
    { key: "characteristics", label: i18n.t("characteristics_tabname"),  icon: <ListChecks size={15} /> },
    { key: "prices",          label: i18n.t("prices_tabname"),           icon: <DollarSign size={15} /> },
    { key: "variants",        label: i18n.t("variants_tabname"),         icon: <LayoutGrid size={15} /> },
  ];

  const isCompleted = (key: TabKey): boolean => {
    if (!completedTabs) return false;
    if (Array.isArray(completedTabs)) return completedTabs.includes(key);
    return (completedTabs as Set<TabKey>).has(key);
  };

  const handleNext = () => {
    const nextIdx = TAB_ORDER.indexOf(activeTab) + 1;
    if (nextIdx < TAB_ORDER.length) {
      setActiveTab(TAB_ORDER[nextIdx]);
    }
  };

  const handleSaveDraft    = () => console.log("Saving draft...");
  const handleCancel       = () => navigate("/products");
  const handleSaveAndPrint = () => alert("Saqlash va chop etish funksiyasi yaratilishi kerak!");

  const renderTab = () => {
    switch (activeTab) {
      case "basic":
        return <BasicTab onNext={handleNext} onSaveDraft={handleSaveDraft} />;
      case "images":
        return <ImagesVideosTab onNext={handleNext} onSaveDraft={handleSaveDraft} />;
      case "characteristics":
        return <CharacteristicsTab onNext={handleNext} onSaveDraft={handleSaveDraft} />;
      case "prices":
        return <TiersTab onNext={handleNext} onSaveDraft={handleSaveDraft}/>
      case "variants":
        return <VariantsTab onNext={handleNext} onSaveDraft={handleSaveDraft}/>
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-background">
      {/* <Header /> */}

      <div className="max-w-7xl mx-auto md:p-4 p-2 ">

        {/* Add Product sahifasi Headeri */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1">
           
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {i18n.t("add_product")}
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium",
                "border border-border bg-card text-foreground hover:bg-muted transition-colors"
              )}
            >
              <X size={15} /> {i18n.t("cancel", )}
            </button>
            <button
              type="button"
              onClick={handleSaveAndPrint}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold",
                "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all"
              )}
            >
              <Printer size={15} /> {i18n.t("save_and_print")}
            </button>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className={cn(
                "flex-1 flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-medium",
                "border border-border bg-card text-foreground hover:bg-muted transition-colors"
              )}
            >
              {i18n.t("cancel")}
            </button>
            <button
              type="button"
              onClick={handleSaveAndPrint}
              className={cn(
                "flex-1 flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-semibold",
                "bg-primary text-primary-foreground hover:opacity-90 transition-all"
              )}
            >
              {i18n.t("save_and_print")}
            </button>
          </div>
        </div>

        {/* Tablar */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">

          {/* Tab bar  */}
          <div className="border-b border-border overflow-x-auto scrollbar-none">
            <div className="flex min-w-max">
              {TABS.map((tab) => {
                const isActive  = activeTab === tab.key;
                const completed = isCompleted(tab.key);

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "flex items-center gap-2 px-4 sm:px-5 py-4 text-sm font-medium whitespace-nowrap",
                      "border-b-2 transition-all relative select-none cursor-pointer",
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    )}
                  >
                    <span className={cn("transition-colors", isActive && "text-primary")}>
                      {tab.icon}
                    </span>
                    {tab.label}
                    {completed && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-3 right-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>{renderTab()}</div>
        </div>

        <InfoCards />
      </div>
    </div>
  );
}