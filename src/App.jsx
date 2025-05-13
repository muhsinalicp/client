import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Homepage/Home";
import SIgnUp from "./components/signing/SIgnUp";
import Signin from "./Signin";
import Sellerhome from "./components/seller/Sellerhome";
import Sellerreg from "./components/seller/Sellerreg";
import Addprod from "./components/seller/Addprod";
import Dashboard from "./components/seller/sidecomponents/Dashboard";
import Products from "./components/seller/sidecomponents/Products";
import Orders from "./components/seller/sidecomponents/Orders";
import ProductDetail from "./components/product/ProductDetail";
import { AuthProvider } from "./context/context";
import Shop from "./components/Homepage/shop/Shop";
import ProductSeller from "./components/seller/sidecomponents/ProductSeller";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<h1>Page not Found</h1>} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SIgnUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* <Route path="/sellerhome/products/addproduct" element={<Addprod />} /> */}
        <Route path="/shop" element={<Shop />} />

        <Route path="/sellerhome" element={<Sellerhome />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductSeller />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products/addproduct" element={<Addprod />} />
          <Route path="products/editproduct/:id" element={<>hello editing</>} />
        </Route>

        <Route path="/sellerregister" element={<Sellerreg />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
