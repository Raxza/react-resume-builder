import { createContext, useContext, useEffect, useState } from "react"
// import { createTheme, ThemeProvider as MuiThemeProdiver } from "@mui/system"
// import CssBaseline from '@mui/material/CssBaseline';

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Define the dark theme
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     background: {
//       default: 'hsl(222.2, 84%, 4.9%)',
//       paper: 'hsl(222.2, 84%, 4.9%)',
//     },
//     text: {
//       primary: 'hsl(210, 40%, 98%)',
//     },
//     primary: {
//       main: 'hsl(217.2, 91.2%, 59.8%)',
//     },
//     secondary: {
//       main: 'hsl(217.2, 32.6%, 17.5%)',
//     },
//   },
// });

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [_, setIsMuiDarkTheme] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setIsMuiDarkTheme(systemTheme === "dark");
      return;
    }

    root.classList.add(theme);
    setIsMuiDarkTheme(theme === "dark");
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
      {/* <MuiThemeProdiver theme={isMuiDarkTheme ? darkTheme : createTheme()}>
        <CssBaseline /> */}
        {children}
      {/* </MuiThemeProdiver> */}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
