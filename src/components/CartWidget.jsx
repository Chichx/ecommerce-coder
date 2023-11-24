import { CartContext } from "../contexts/CartContext";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

export const CartWidget = () => {
  const { items } = useContext(CartContext);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart">
      <div className="relative flex items-center justify-center h-[27px] bg-white border border-transparent px-8 py-1 text-xs lg:px-6 rounded-full hover:bg-zinc-900 hover:text-gray-300 transitions-all duration-300 cursor-pointer">
        <FaCartShopping style={{ fontSize: "20px" }} />
        {totalItems > 0 && (
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-orange-400 rounded-full w-4 h-4 flex items-center justify-center z-10">
            <p className="text-white text-xs">{totalItems}</p>
          </div>
        )}
      </div>
    </Link>
  );
};
