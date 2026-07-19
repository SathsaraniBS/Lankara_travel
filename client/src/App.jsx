import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Register";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>

          {/* ── Public Routes ── */}
          {/* <Route path="/"              element={<Home />} />
          <Route path="/login"         element={<Login />} /> */}
          <Route path="/register"      element={<Signup />} />
              {/* <Route path="/forgot-password" element={<ResetPassword />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<h1>About Us</h1>} />
          <Route path="/contact-us" element={<h1>Contact Us</h1>} />
          <Route path="/planning-a-trip" element={<h1>Planning a Trip</h1>} />
          <Route path="/article" element={<h1>Article</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
