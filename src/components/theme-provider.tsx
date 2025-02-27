import { ThemeProviderContext } from "@/contexts/ThemeProviderState"
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import CssBaseline from '@mui/material/CssBaseline';

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'hsl(222.2, 84%, 4.9%)',
      paper: 'hsl(222.2, 84%, 4.9%)',
    },
    text: {
      primary: 'hsl(210, 40%, 98%)',
    },
    primary: {
      main: 'hsl(217.2, 91.2%, 59.8%)',
    },
    secondary: {
      main: 'hsl(217.2, 32.6%, 17.5%)',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const [muiTheme, setMuiTheme] = useState(lightTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setMuiTheme(systemTheme === "dark" ? darkTheme : lightTheme);
      return;
    }

    root.classList.add(theme);
    setMuiTheme(theme === "dark" ? darkTheme : lightTheme);
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
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeProviderContext.Provider>
  )
}
