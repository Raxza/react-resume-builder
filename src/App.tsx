import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ResumeList from "./pages/Resume";
import ResumeForm from "./pages/Resume/resume-form";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./components/common/NavBar";

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ResumeList />} />
          <Route path="/resume/create" element={<ResumeForm />} />
          <Route path="/resume/edit/:id" element={<ResumeForm />} />
        </Routes>
      </Router>
    </ThemeProvider >
  )
}

export default App