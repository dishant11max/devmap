import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CommandPalette } from "./components/ui/CommandPalette";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import Languages from "./pages/Languages";
import Resources from "./pages/Resources";
import About from "./pages/About";

import Dashboard from "./pages/Dashboard";
import TIL from "./pages/TIL";
import PublicProfile from "./pages/PublicProfile";
import CSCore from "./pages/CSCore";

const RoadmapViewer = lazy(() => import("./pages/RoadmapViewer"));

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <CommandPalette />
          <ScrollToTop />
          <Suspense fallback={null}>
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
                <Route path="/cs-core" element={<CSCore />} />
                <Route path="/u/:username" element={<PublicProfile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
