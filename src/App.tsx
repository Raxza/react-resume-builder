import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ResumeList from "./pages/Resume";
import ResumeForm from "./pages/Resume/resume-form";
import { ThemeProvider as CustomThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/common/NavBar";
// import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { useState } from 'react';

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

function App() {
  // const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <CustomThemeProvider storageKey="vite-ui-theme">
      {/* Shits working if using this, but not if put inside the theme provider?? */}
      {/* <MuiThemeProvider theme={isDarkTheme ? darkTheme : createTheme()}> */}
        {/* <CssBaseline /> */}
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<ResumeList />} />
            <Route path="/resume/create" element={<ResumeForm />} />
            <Route path="/resume/edit/:id" element={<ResumeForm />} />
          </Routes>
        </Router>
      {/* </MuiThemeProvider> */}
    </CustomThemeProvider>
  );
}

export default App;