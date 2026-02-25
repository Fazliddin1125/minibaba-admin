import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Sidebar from "./components/shared/sidebar";
import Navbar from "./components/shared/navbar";
import AddProductPage from "./pages/AddProduct/AddProduct";

function App() {
  return (
    // 👇 Ushbu div'dan h-screen class'ini olib tashladim. Sababi mening bu yerga qo'shgan /add-product sahifasi scroll bo'lmayapti. /add-product sahifasini qurib bo'lgandan so'ng, path'larni to'g'irlab, /add-product sahifasini boshqa joyga ko'chiramiz. Shunda h-screen classini qayta qo'shib qo'yish kerak ushbu div'ga! (PRATOV)
    <div className=" w-full bg-background font-sans text-foreground overflow-hidden">
      <Routes>

        {/* Boshlang'ich sahifa - loginga yo'naltiradi */}
        

        {/* Auth sahifalari */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/add-product" element={<AddProductPage/>} />

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
    </div>
  );
}

export default App;