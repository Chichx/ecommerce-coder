import { CartWidget } from "./CartWidget";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { getFirestore, collection, getDocs} from "firebase/firestore";

export const NavBar = () => {
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, 'items');

    getDocs(itemsCollection).then((snapshot) => {
      if (snapshot.size === 0) {
        console.log('No hay resultados');
      } else {
        const categorias = new Set(); 

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.category) {
            categorias.add(data.category);
          }
        });

        setCategoriasUnicas([...categorias]);
      }
    });
  }, []);

  return (
    <nav className="sticky z-[2] top-0 bg-black/10  p-5 border-b backdrop-blur-md border-gray-400/20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-white text-2xl ml-2 font-bold">New Vision</NavLink>
        </div>
        <div className="hidden md:flex space-x-10">
          <NavLink to="/" className="font-medium text-gray-300 hover:text-gray-100 transitions-all duration-200">Home</NavLink>
          {categoriasUnicas.map((category, index) => (
            <NavLink
              key={index}
              to={`/category/${category}`}
              className="font-medium text-gray-300 hover:text-gray-100 transitions-all duration-200"
            >
              {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
            </NavLink>
          ))}
        </div>
        
        <div>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};
