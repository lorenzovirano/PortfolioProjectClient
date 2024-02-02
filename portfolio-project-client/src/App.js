import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home";
import Login from "./pages/auth/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";
import Account from "./pages/dashboard/account/Account";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/account" element={<Account />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
