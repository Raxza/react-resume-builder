import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResumeCreate from "@/pages/Resume/create.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResumeList from "./pages/Resume";
import ResumeEdit from "./pages/Resume/edit";

function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<ResumeList />} />
            <Route path="/resume/create" element={<ResumeCreate />} />
            <Route path="/resume/edit/:id" element={<ResumeEdit />} />
          </Routes>
        </Router>
    </>
  )
}

export default App