import { CartContext } from "../contexts/CartContext";

import { useState } from "react";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaMinus, FaPlus } from "react-icons/fa6";

export const ItemCounter = ({ product }) => {
  const { items, onAdd } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        const totalQuantity = existingItem.quantity + quantity;
        if (totalQuantity <= product.stock) {
          onAdd({ ...product, quantity });
          toast.success(`Agregados ${quantity} ${product.title} al carrito`, {
            theme: "colored",
          });
        } else {
          toast.error("Se ha superado el límite de stock disponible!", {
            theme: "colored",
          });
        }
      } else {
        if (quantity <= product.stock) {
          onAdd({ ...product, quantity });
          toast.success(`Agregados ${quantity} ${product.title} al carrito`, {
            theme: "colored",
          });
        } else {
          toast.error("Se ha superado el límite de stock disponible!", {
            theme: "colored",
          });
        }
      }
    } else {
      toast.error("Agregue al menos un producto", {
        theme: "colored",
      });
    }
  };

  const handleIncrement = () => {
    if (quantity + 1 <= product.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      toast.error("Se ha superado el límite de stock disponible!", {
        theme: "colored",
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-4 mb-4">
        <button
          onClick={handleDecrement}
          className="bg-[#272727] hover:bg-black/20 transitions-all duration-200 w-8 h-8 rounded-xl text-red-500 font-medium flex items-center justify-center mr-3"
        >
          <FaMinus />
        </button>
        <span className="px-2 input-text inline-flex text-xs lg:text-xs leading-5 font-semibold rounded-[5px] py-2 bg-[#212121] text-white">
          <p className="text-white mx-4 text-lg font-semibold">{quantity}</p>
        </span>
        <button
          onClick={handleIncrement}
          className="bg-[#272727] hover:bg-black/20 transitions-all duration-200 w-8 h-8 rounded-xl text-green-500 font-medium flex items-center justify-center ml-3"
        >
          <FaPlus />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-[#272727] hover:bg-black/20 transitions-all duration-200 w-full py-2 rounded-xl text-gray-200 font-medium"
      >
        Agregar al carrito
      </button>
      <ToastContainer />
    </>
  );
};
