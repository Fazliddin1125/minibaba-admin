import i18n from "@/i18n/i18n";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-12">
      <div className="max-w-300 mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* chap */}
        <div className="flex items-center gap-2">
          <a href="/">
            <img src="/logo.png" alt="logo" />
          </a>
          <p className="text-sm text-muted-foreground">
            © 2024 Minibaba Seller Center. {i18n.t("all_rights_reserved")}
          </p>
        </div>

        {/* o'ng */}
        <nav className="flex items-center gap-1">
          {[i18n.t("help_center"), i18n.t("privacy_policy"), i18n.t("contact"),].map(
            (link, i, arr) => (
              <span key={link} className="flex items-center">
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                >
                  {link}
                </a>
                {i < arr.length - 1 && (
                  <span className="text-border">·</span>
                )}
              </span>
            )
          )}
        </nav>
      </div>
    </footer>
  );
}