import "../App.css";

import { Link } from "react-router-dom";

export const Item = ({ item }) => {
  return (
    <>
      <div className="bg-[#2d2d2d] w-96 rounded-xl p-6">
        <div className="flex flex-col justify-center items-center">
          <img src={item.pictureUrl} alt="" width="250" height="250" />
        </div>
        <h3 className="font-medium text-xl text-white text-center">
          {item.title}
        </h3>
        <h2 className="text-gray-200 font-semibold text-3xl mt-2 text-center">
          <span className="gradient-text">${item.price}</span>
        </h2>
        <div className="w-full h-[1px] bg-gray-500 my-4"></div>
        <p className="font-medium text-base text-zinc-400 text-center mt-2">
          {item.description}
        </p>
        <div className="w-full h-[1px] bg-gray-500 my-4"></div>

        <Link to={`/items/${item.id}`}>
          <button className="bg-[#272727] hover:bg-black/20 transitions-all duration-200 w-full py-2 rounded-xl text-gray-200 font-medium">
            Ver más detalles
          </button>
        </Link>
      </div>
    </>
  );
};
