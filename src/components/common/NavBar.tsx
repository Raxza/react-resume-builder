import { ThemeSwitcher } from "@/components/theme-switcher"

const Navbar = () => {
  return (
    <header className="fixed z-50 top-0 w-full h-12 bg-card text-card-foreground flex items-center justify-between px-6">
      <strong>RRB</strong>
      <ThemeSwitcher />
    </header>
  )
}

export default Navbar