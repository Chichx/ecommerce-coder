import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const clear = () => setItems([]);

  const onAdd = (itemToAdd) => {
    const existingItem = items.find((item) => item.id === itemToAdd.id);

    if (existingItem) {
      if (existingItem.quantity + itemToAdd.quantity > existingItem.stock) {
        toast.error("Se ha superado el límite de stock disponible!", {
          theme: "colored",
        });
        return;
      }
      const updatedItems = items.map((item) => {
        if (item.id === itemToAdd.id) {
          return { ...item, quantity: item.quantity + itemToAdd.quantity };
        }
        return item;
      });
      setItems(updatedItems);
    } else {
      if (itemToAdd.stock < 1) {
        toast.error("Producto fuera de stock", {
          theme: "colored",
        });
        return;
      }
      setItems([...items, { ...itemToAdd }]);
    }
  };

  const onAddInCart = (itemToAdd) => {
    const existingItem = items.find((item) => item.id === itemToAdd.id);

    if (existingItem) {
      if (existingItem.quantity + 1 > existingItem.stock) {
        toast.error("Se ha superado el límite de stock disponible!", {
          theme: "colored",
        });
        return;
      }
      const updatedItems = items.map((item) => {
        if (item.id === itemToAdd.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setItems(updatedItems);
    } else {
      if (itemToAdd.stock < 1) {
        toast.error("Producto fuera de stock", {
          theme: "colored",
        });
        return;
      }
      setItems([...items, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const onRemove = (id) => {
    const updatedItems = items.reduce((acc, item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    setItems(updatedItems);
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        clear,
        onAdd,
        onAddInCart,
        totalItems,
        onRemove,
        totalPrice,
      }}
    >
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};
