import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ResumeList from "./pages/Resume";
import ResumeForm from "./pages/Resume/resume-form";
import { ThemeProvider as CustomThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/common/NavBar";
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

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

function App() {
  return (
    <CustomThemeProvider storageKey="vite-ui-theme">
      <MuiThemeProvider theme={rrbTheme}>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<ResumeList />} />
            <Route path="/resume/create" element={<ResumeForm />} />
            <Route path="/resume/edit/:id" element={<ResumeForm />} />
          </Routes>
        </Router>
      </MuiThemeProvider>
    </CustomThemeProvider>
  );
}

export default App;