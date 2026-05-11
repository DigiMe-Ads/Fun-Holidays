import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./common/TopBar";
import Navbar from "./common/Navbar";
import HomePage from "./pages/HomePage";
import  Footer from "./common/Footer";



function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;