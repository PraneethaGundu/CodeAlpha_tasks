import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={ <ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
          <Route path="/success" element={<OrderSuccess />}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;