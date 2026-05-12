import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./common/TopBar";
import Navbar from "./common/Navbar";
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import ToursPage from "./pages/ToursPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import  Footer from "./common/Footer";
import ScrollToTop from "./ui/ScrollToTop";
import TourDetailPage from "./pages/TourDetailPage";
import BlogPage from "./pages/BlogPage";



function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationPage />} />
        <Route path="/destination/:slug" element={<DestinationDetailPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/tours/:slug" element={<TourDetailPage />} />
        <Route path="/blogs" element={<BlogPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;