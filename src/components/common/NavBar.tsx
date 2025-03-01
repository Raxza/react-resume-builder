import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"

const Navbar = () => {
  return (
    <header className="fixed z-50 top-0 w-full h-12 bg-card text-card-foreground flex items-center justify-between px-6">
      <strong>RRB</strong>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  )
}

export default Navbar