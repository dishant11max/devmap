import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Languages from "./pages/Languages";
import RoadmapViewer from "./pages/RoadmapViewer";
import Resources from "./pages/Resources";
import About from "./pages/About";

import Dashboard from "./pages/Dashboard";
import TIL from "./pages/TIL";
import PublicProfile from "./pages/PublicProfile";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/languages" element={<Languages />} />
              <Route
                path="/roadmap/:languageSlug"
                element={<RoadmapViewer />}
              />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              <Route path="/til" element={<TIL />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/u/:username" element={<PublicProfile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
