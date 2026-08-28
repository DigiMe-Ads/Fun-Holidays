import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

// Auth
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./admin/ProtectedRoute";

// Admin pages
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import EnquiriesManager from "./admin/pages/EnquiriesManager";
import ToursManager from "./admin/pages/ToursManager";
import BlogManager from "./admin/pages/BlogManager";
import DestinationsManager from "./admin/pages/DestinationsManager";
import TeamManager from "./admin/pages/TeamManager";
import SeedData from "./admin/pages/SeedData";

// Public layout components
import TopBar from "./common/TopBar";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import ScrollToTop from "./ui/ScrollToTop";

// Public pages
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import ToursPage from "./pages/ToursPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TourDetailPage from "./pages/TourDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import TailorMadePage from "./pages/TailorMadePage";
import MicePage from "./pages/MicePage";

// Wrapper that renders TopBar + Navbar + <page content> + Footer
function PublicLayout() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          {/* ── Admin: no public nav/footer ─────────────────────────────── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"    element={<AdminDashboard />} />
            <Route path="enquiries"    element={<EnquiriesManager />} />
            <Route path="tours"        element={<ToursManager />} />
            <Route path="blog"         element={<BlogManager />} />
            <Route path="destinations" element={<DestinationsManager />} />
            <Route path="team"         element={<TeamManager />} />
            <Route path="seed"         element={<SeedData />} />
          </Route>

          {/* ── Public pages: TopBar + Navbar + Footer ───────────────────── */}
          <Route element={<PublicLayout />}>
            <Route path="/"                    element={<HomePage />} />
            <Route path="/destinations"        element={<DestinationPage />} />
            <Route path="/destination/:slug"   element={<DestinationDetailPage />} />
            <Route path="/tours"               element={<ToursPage />} />
            <Route path="/tours/:slug"         element={<TourDetailPage />} />
            <Route path="/tailor-made"         element={<TailorMadePage />} />
            <Route path="/mice"                element={<MicePage />} />
            <Route path="/about"               element={<AboutPage />} />
            <Route path="/contact"             element={<ContactPage />} />
            <Route path="/blogs"               element={<BlogPage />} />
            <Route path="/blog"                element={<BlogListPage />} />
            <Route path="/blog/:slug"          element={<BlogDetailPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
