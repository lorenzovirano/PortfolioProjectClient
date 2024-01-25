import './App.css';
import Home from "./pages/Home";
import Login from "./pages/auth/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
