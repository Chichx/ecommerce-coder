import { CartContext } from "../contexts/CartContext";
import { Button } from "./Button";

import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import {
  FaTrash,
  FaX,
  FaCircleInfo,
  FaMinus,
  FaPlus,
  FaCheck,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const valoresIniciales = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
};

export const Cart = () => {
  const { clear, items, onRemove, totalItems, totalPrice, onAddInCart } =
    useContext(CartContext);
  const [buyer, setBuyer] = useState(valoresIniciales);

  const validarInputs = () => {
    const { name, lastname, email, phone } = buyer;

    if (!name || !lastname || !email || !phone) {
      toast.error("Por favor completá todos los campos.", {
        theme: "colored",
      });
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setBuyer((buyer) => {
      return {
        ...buyer,
        [event.target.name]: event.target.value,
      };
    });
  };

  const showPopup = (id) => {
    const popup = document.getElementById("popupDeCompra");
    const idDeCompra = document.getElementById("idDeCompra");

    idDeCompra.textContent = id;

    popup.classList.remove("hidden");
  };

  const hidePopup = () => {
    const popup = document.getElementById("popupDeCompra");
    popup.classList.add("hidden");
    clear();
  };

  const sendOrder = () => {
    const esValid = validarInputs();

    if (esValid) {
      const order = {
        buyer: buyer,
        items: items,
        total: totalPrice,
      };

      const db = getFirestore();
      const orderCollection = collection(db, "orders");

      addDoc(orderCollection, order).then(({ id }) => {
        if (id) {
          console.log(id);
          showPopup(id);
          setBuyer(valoresIniciales);
        }
      });
    }
  };

  console.log(items);

  if (!items.length) {
    return (
      <div className="relative mt-20 xl:mt-40 px-10 flex flex-col items-center justify-center">
        <div className="absolute top-96 right-0 w-48 h-48 blur-[180px] bg-gradient-to-r from-orange-300 to-orange-500 rounded-3xl z-[-1]"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 blur-[200px] bg-gradient-to-r from-orange-300 to-orange-500 rounded-3xl z-[-1]"></div>
        <h1 className="text-4xl lg:text-2xl xl:text-4xl font-semibold gradient-text">
          No hay productos en el carrito.
        </h1>
        <Button navigateLink="/" text="Ver productos!" />
      </div>
    );
  }

  return (
    <>
      <div
        id="popupDeCompra"
        className="hidden z-20 bg-black/40 fixed inset-0 flex justify-center items-center transition-opacity duration-500"
      >
        <div className="flex m-4 flex-col relative overflow-hidden text-gray-200 bg-[#272727] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-xl max-w-[500px] w-full p-6">
          <button
            onClick={hidePopup}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none transitions-all duration-200"
          >
            <FaX />
          </button>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col w-full">
              <div className="w-full flex items-center">
                <div className="h-24 w-24 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-4xl font-bold text-green-700">
                      <FaCheck />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 ml-3">
                  <h3 className="text-gray-200 font-bold font-semibold text-lg">
                    Gracias por confiar en New Vision!
                  </h3>
                  <p className="px-4 py-1 rounded-xl text-zinc-400 text-xs bg-[#212121] font-medium">
                    Tu ID de compra es{" "}
                    <span
                      id="idDeCompra"
                      className="text-orange-400 font-bold"
                    ></span>
                  </p>
                  <p className="px-4 py-1 rounded-xl text-zinc-400 text-xs bg-[#212121] font-medium">
                    Compraste un total de:{" "}
                    <span className="text-green-400 font-bold">
                      {totalItems}
                    </span>{" "}
                    productos
                  </p>
                  <p className="px-4 py-1 rounded-xl text-zinc-400 text-xs bg-[#212121] font-medium">
                    Gastaste un total de:{" "}
                    <span className="text-green-400 font-bold">
                      {totalPrice}
                    </span>{" "}
                    USD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 relative">
        <div className="absolute top-96 right-0 w-48 h-48 blur-[180px] bg-gradient-to-r from-orange-300 to-orange-500 rounded-3xl z-[-1]"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 blur-[200px] bg-gradient-to-r from-orange-300 to-orange-500 rounded-3xl z-[-1]"></div>

        <div className="flex flex-col lg:flex-row space-x-0 m-16 lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="w-full bg-[#2d2d2d] p-6 overflow-y-auto  rounded-xl">
            <table
              className="w-full divide-y divide-orange-600 rounded-lg"
              style={{ borderRadius: "0.5rem" }}
            >
              <thead className="bg-[#212121] rounded-xl">
                <tr>
                  <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider text-center">
                    Imagen
                  </th>
                  <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider text-center">
                    Producto
                  </th>
                  <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider text-center">
                    Precio
                  </th>
                  <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider text-center">
                    Cantidad
                  </th>
                  <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider text-center">
                    Eliminar
                  </th>
                </tr>
              </thead>
              {items.map((item) => (
                <tbody
                  key={item.id}
                  className="divide-y bg-[#272727] divide-zinc-700 rounded-xl"
                >
                  <tr>
                    <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center items-center">
                        <img
                          src={item.pictureUrl}
                          alt={item.title}
                          width={60}
                          height={60}
                        />
                      </div>
                    </td>
                    <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-xs lg:text-sm text-orange-500 text-center">
                        <Link to={`/items/${item.id}`}>{item.title}</Link>
                      </div>
                    </td>
                    <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-xs lg:text-sm text-gray-200 text-center">
                        {item.price}
                      </div>
                    </td>
                    <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-xs lg:text-sm text-gray-200 text-center">
                        x{item.quantity}
                      </div>
                    </td>
                    <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center items-center">
                        <span className="px-2 mr-2 inline-flex text-xs lg:text-xs leading-5 font-semibold rounded-[5px] py-2 bg-[#212121] text-red-500 cursor-pointer ">
                          <FaMinus
                            onClick={() => onRemove(item.id)}
                            className="text-center"
                          />
                        </span>
                        <span className="px-2 mr-2 inline-flex text-xs lg:text-xs leading-5 font-semibold rounded-[5px] py-2 bg-[#212121] text-white">
                          {item.quantity}
                        </span>
                        <span className="px-2 inline-flex text-xs lg:text-xs leading-5 font-semibold rounded-[5px] py-2 bg-[#212121] text-green-500 cursor-pointer ">
                          <FaPlus
                            onClick={() => onAddInCart(item)}
                            className="text-center"
                          />
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="w-full p-6 min-w-0 bg-[#2d2d2d] h-64 rounded-xl">
              <div className="flex items-center mb-4 gap-3">
                <div>
                  <div className="w-12 h-12 flex group items-center transition-all justify-center rounded-xl text-gray-900 group-hover:text-white bg-[#272727] text-white transition-all duration-200 ">
                    <div className="flex items-center justify-center relative w-8 h-8 undefined">
                      <FaTrash />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center justify-center bg-input rounded-full text-lg bg-transparent"></div>
                    <h3 className="min-w-min text-white font-semibold text-lg line-clamp-1">
                      Vaciar carrito
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-1 line-clamp-4 h-20">
                Cuidado! apretando este botón eliminarás todos tus productos.
              </p>

              <button
                onClick={clear}
                className="w-full justify-center md:w-full text-center whitespace-nowrap flex bg-red-700/10 items-center justify-center gap-2 px-10 py-2.5 rounded-xl text-gray-200 border-red-500 border hover:bg-red-500 active:bg-red-500/20 transition-all duration-200"
              >
                <p className="text-sm font-semibold select-none">Vaciar</p>
              </button>
            </div>
            <div className="w-full p-6 min-w-0 bg-[#2d2d2d] h-98 rounded-xl">
              <div className="flex items-center mb-4 gap-3">
                <div>
                  <div className="w-12 h-12 flex group items-center transition-all justify-center rounded-xl text-gray-900 group-hover:text-white bg-[#272727] text-white transition-all duration-200 ">
                    <div className="flex items-center justify-center relative w-8 h-8 undefined">
                      <FaCircleInfo />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center justify-center bg-input rounded-full text-lg bg-transparent"></div>
                    <h3 className="min-w-min text-white font-semibold text-lg line-clamp-1">
                      Información
                    </h3>
                  </div>
                  <h4 className="text-gray-400 text-sm">
                    Información de tu compra
                  </h4>
                </div>
              </div>
              <p className="text-gray-400 text-sm line-clamp-4 mb-2">
                Total de productos:{" "}
                <span className="text-orange-500">{totalItems}</span>
              </p>
              <p className="text-gray-400 text-sm line-clamp-4 mb-3">
                Total: $<span className="text-green-500">{totalPrice}</span>
              </p>

              <div className="w-full h-[1px] bg-gray-500 mb-6"></div>

              <div className="max-w-md mx-auto">
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      value={buyer.name}
                      onChange={handleChange}
                      name="name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                      required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Nombre
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      value={buyer.lastname}
                      onChange={handleChange}
                      name="lastname"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                      required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Apellido
                    </label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    value={buyer.email}
                    onChange={handleChange}
                    name="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Email
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="tel"
                    value={buyer.phone}
                    onChange={handleChange}
                    name="phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Numero de telefono (123-456-7890)
                  </label>
                </div>
                <button
                  onClick={sendOrder}
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-full md:w-full lg:w-full xl:w-full px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
