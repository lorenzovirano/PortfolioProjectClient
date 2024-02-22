import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home";
import Login from "./pages/auth/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";
import Account from "./pages/dashboard/account/Account";
import AlbumPage from "./pages/album/AlbumPage";
import PhotographerPage from "./pages/dashboard/photographer/PhotographerPage";
import Chat from "./pages/chat/Chat";
import PhotographerListPage from "./pages/photographerList/PhotographerListPage";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/chat/:username" element={<Chat />} />
                  <Route path="/album/:photographer/:albumId" element={<AlbumPage />} />
                  <Route path="/photographer/:photographer" element={<PhotographerPage />} />
                  <Route path="/photographer/list" element={<PhotographerListPage />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
