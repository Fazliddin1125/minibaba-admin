import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Sidebar from "./components/shared/sidebar";
import Navbar from "./components/shared/navbar";
import AddProductPage from "./pages/AddProduct/AddProduct";
import Settings from "./pages/Settings/Settings";
import OrderDetailPage from "./pages/OrderDetailPage";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-full min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-[#f8f9fa]">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="w-full bg-background font-sans text-foreground">
      <Routes>

        {/* Auth sahifalari - layout yo'q */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Alohida sahifalar - layout yo'q */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-product" element={<AddProductPage />} />

        {/* Dashboard sahifalari - Sidebar + Navbar bilan */}
        <Route path="/" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/products" element={<DashboardLayout><Products /></DashboardLayout>} />
        <Route path="/orders" element={<DashboardLayout><Orders /></DashboardLayout>} />
        <Route path="/orders/:id" element={<DashboardLayout><OrderDetailPage /></DashboardLayout>} />
        <Route path="/messages" element={<DashboardLayout><Messages /></DashboardLayout>} />

      </Routes>
    </div>
  );
}

export default App;