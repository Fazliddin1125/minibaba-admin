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
            © 2024 Minibaba Seller Center. Barcha huquqlar himoyalangan.
          </p>
        </div>

        {/* o'ng */}
        <nav className="flex items-center gap-1">
          {["Yordam markazi", "Maxfiylik siyosati", "Bog'lanish"].map(
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