import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
