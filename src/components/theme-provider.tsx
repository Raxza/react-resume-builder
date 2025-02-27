import { ThemeProviderContext } from "@/contexts/ThemeProviderState"
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider as MuiThemeProdiver } from "@mui/system"

type Theme = "dark" | "light" | "system"
type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

const rrbTheme = createTheme({
  palette: {
    background: {
      default: 'hsl(var(--background))',
      paper: 'hsl(var(--background))'
    },
    text: {
      primary: 'hsl(var(--foreground))',
      disabled: 'hsl(var(--muted-foreground))'
    },
    primary: {
      main: 'hsl(var(--primary))',
    },
    secondary: {
      main: 'hsl(var(--secondary))',
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'hsl(var(--foreground))',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'inherit',
        }
      }
    }
  }
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {/* <MuiThemeProdiver theme={rrbTheme}> */}
      {children}
      {/* </MuiThemeProdiver> */}
    </ThemeProviderContext.Provider>
  )
}
