import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { Error404 } from "./components/Error404";
import { CartProvider } from "./contexts/CartContext";
import { Cart } from "./components/Cart";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:id" element={<ItemListContainer />} />
            <Route path="/items/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
