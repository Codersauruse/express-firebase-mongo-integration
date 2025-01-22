import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Profile, Register, Home } from "./Pages/index.js";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
