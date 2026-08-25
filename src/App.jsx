import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";

import Home from "./pages/Home";
import MspOutbound from "./pages/MspOutbound";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import Results from "./pages/Results";
import Pilot from "./pages/Pilot";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import Insights from "./pages/Insights";
import InsightArticle from "./pages/InsightArticle";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminArticles from "./admin/pages/AdminArticles";
import AdminArticleEditor from "./admin/pages/AdminArticleEditor";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* =========================================
            ADMIN ROUTES
        ========================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/articles"
          element={<AdminArticles />}
        />

        <Route
          path="/admin/articles/new"
          element={<AdminArticleEditor />}
        />

        <Route
          path="/admin/articles/:id/edit"
          element={<AdminArticleEditor />}
        />

        {/* =========================================
            PUBLIC WEBSITE
        ========================================= */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/msp-outbound"
          element={
            <PublicLayout>
              <MspOutbound />
            </PublicLayout>
          }
        />

        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />

        <Route
          path="/how-it-works"
          element={
            <PublicLayout>
              <HowItWorks />
            </PublicLayout>
          }
        />

        <Route
          path="/results"
          element={
            <PublicLayout>
              <Results />
            </PublicLayout>
          }
        />

        <Route
          path="/pilot"
          element={
            <PublicLayout>
              <Pilot />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/insights"
          element={
            <PublicLayout>
              <Insights />
            </PublicLayout>
          }
        />

        <Route
          path="/insights/:slug"
          element={
            <PublicLayout>
              <InsightArticle />
            </PublicLayout>
          }
        />

        <Route
          path="/privacy"
          element={
            <PublicLayout>
              <Privacy />
            </PublicLayout>
          }
        />

        <Route
          path="/terms"
          element={
            <PublicLayout>
              <Terms />
            </PublicLayout>
          }
        />

        {/* =========================================
            FALLBACK
        ========================================= */}

        <Route
          path="*"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}