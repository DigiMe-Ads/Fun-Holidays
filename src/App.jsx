import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./common/TopBar";
import Navbar from "./common/Navbar";
import HomePage from "./pages/HomePage";



function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;