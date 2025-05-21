import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Homepage/Home";
import SIgnUp from "./components/signing/SIgnUp";
import Signin from "./Signin";
import Sellerhome from "./components/seller/Sellerhome";
import Sellerreg from "./components/seller/Sellerreg";
import Addprod from "./components/seller/Addprod";
import Dashboard from "./components/seller/sidecomponents/Dashboard";
import Orders from "./components/seller/sidecomponents/Orders";
import ProductDetail from "./components/product/ProductDetail";
import { AuthProvider } from "./context/context";
import Shop from "./components/Homepage/shop/Shop";
import ProductSeller from "./components/seller/sidecomponents/ProductSeller";
import EditProd from "./components/seller/sidecomponents/EditProd";
import NotFound from "./components/NotFound";
import AboutPage from "./components/Homepage/AboutPage";
import Cart from "./components/Homepage/Cart";
import OrderPage from "./components/Homepage/orders/OrderPage";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SIgnUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/shop/:page/:category/:price/:rating" element={<Shop />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderPage />} />

        <Route path="/sellerhome" element={<Sellerhome />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductSeller />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products/addproduct" element={<Addprod />} />
          <Route path="products/editproduct/:id" element={<EditProd />} />
        </Route>

        <Route path="/sellerregister" element={<Sellerreg />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
