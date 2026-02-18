
import Navbar from "./components/shared/navbar";
import Sidebar from "./components/shared/sidebar";
import Home from "./pages/Home"
import Messages from "./pages/Messages";
import Orders from "./pages/Orders";
import Products from "./pages/Products"
import { Routes, Route } from "react-router-dom";



const App = () => {
  return (
    <div className="min-h-screen h-screen  bg-background font-sans text-foreground">
      <div className="flex flex-col  mx-auto  h-full">   
        <div className="flex flex-1 w-full  justify-center item-start">
          <Sidebar />
          <div className="flex-1 flex-col w-full">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/messages" element={<Messages/>} />
            </Routes>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App