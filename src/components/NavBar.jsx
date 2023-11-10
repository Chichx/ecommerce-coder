import { NavLink } from "react-router-dom"
import { CartWidget } from "./CartWidget";
import { productos } from "../data/data";

const categorias = productos.map(item => item.category)
const categoriasUnicas = new Set(categorias)

export const NavBar = () => {
  return (
    <nav className="sticky z-[2] top-0 bg-black/10  p-5 border-b backdrop-blur-md border-gray-400/20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-white text-2xl ml-2 font-bold">New Vision</NavLink>
        </div>
        <div className="hidden md:flex space-x-10">
          <NavLink to="/" className="font-medium text-gray-300 hover:text-gray-100 transitions-all duration-200">Home</NavLink>
          {[...categoriasUnicas].map(category => (
            <NavLink key={category} to={`category/${category}`} className="font-medium text-gray-300 hover:text-gray-100 transitions-all duration-200">{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</NavLink>
          ))}
        </div>
        
        <div>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};
