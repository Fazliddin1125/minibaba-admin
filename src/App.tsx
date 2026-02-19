import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Sidebar from "./components/shared/sidebar";
import Navbar from "./components/shared/navbar";

function App() {
  return (
    <div className="h-screen w-full bg-background font-sans text-foreground overflow-hidden">
      <Routes>

        {/* Boshlang'ich sahifa - loginga yo'naltiradi */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth sahifalari */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Dashboard sahifalari */}
        <Route path="/dashboard" element={
          <div className="flex h-full w-full">
            <div className="hidden md:flex h-full">
              <Sidebar />
            </div>
            <div className="flex-1 flex flex-col h-full min-w-0">
              <Navbar />
              <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f8f9fa]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/messages" element={<Messages />} />
                </Routes>
              </main>
            </div>
          </div>
        } />

      </Routes>
      <div className="flex h-full w-full">
        <div className="hidden md:flex h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col h-full min-w-0">         
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f8f9fa]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;