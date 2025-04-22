import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [menu, setMenu] = useState(true);
  const [cartOpen, setCartOpen] = useState(true);

  return (
    <>
      <header>
        <nav className="md:justify-between flex items-center fixed px-24 p-2 bg-pink-900 w-full sm:justify-evenly z-50 top-0">
          <Link to="/">
            <div className="w-10 h-auto">
              <img
                src="https://fakestoreapi.com/icons/logo.png"
                alt="Logo"
                title="Logo"
                className="w-10 h-auto"
              />
            </div>
          </Link>

          <div className="flex justify-center items-center w-full">
            <input
              type="text"
              placeholder="Search Product here"
              name="search"
              className="border-1 p-2 rounded-full border-pink-950 text-pink-950 bg-pink-100 font-semibold h-10 w-5/6 md:w-3/6"
            />
            <i className="fa-solid fa-magnifying-glass text-pink-950 -ml-8"></i>
          </div>

          {/* menu for moblie */}
          <div
            className="w-7 h-5 md:hidden relative cursor-pointer "
            onClick={() => setMenu((prev) => !prev)}
          >
            <i className="fa-solid fa-bars text-white cursor-pointer "></i>
          </div>
          <div
            className={`absolute h-screen w-full bg-pink-900 right-0 top-0 md:hidden z-50 ${
              menu ? "hidden" : ""
            }`}
          >
            <i
              className="fa-solid fa-xmark text-white cursor-pointer right-20 top-5 absolute"
              onClick={() => setMenu(true)}
            ></i>
            <div
              className="flex flex-col items-center space-x-8"
              onClick={() => setMenu(true)}
            >
              <div className="flex flex-col mt-20 justify-center items-center gap-6 px-6 text-white ">
                <Link to="/" className="hover:underline underline-offset-4">
                  Home
                </Link>
                <Link
                  to="/product"
                  className="hover:underline underline-offset-4"
                >
                  Shop
                </Link>
                <Link to="/cart" className="hover:underline underline-offset-4">
                  Cart
                </Link>
              </div>
            </div>
          </div>

          <div className="md:flex hidden items-center space-x-8">
            <div className="flex justify-center items-center gap-6 px-6 text-white">
              <Link to="/" className="hover:underline underline-offset-4">
                Home
              </Link>
              <Link
                to="/product"
                className="hover:underline underline-offset-4"
              >
                Shop
              </Link>
            </div>
          </div>

          {/* Cart icon for desktop*/}

          <div
            className="justify-center items-center md:flex hidden cursor-pointer"
            onClick={() => setCartOpen((prev) => !prev)}
          >
            <i className="fa-solid fa-cart-shopping text-white text-2xl relative"></i>
            <div className="flex justify-center items-center absolute bg-red-500 text-white text-xs h-5 w-5 rounded-full -mt-8 ml-6">
              {cartItems.length || 0}
            </div>
          </div>

          {/* Float cart for mobile */}

          <div className="fixed justify-center items-center md:hidden right-8 bottom-20 bg-pink-900 h-12 w-12 p-2 rounded-full">
            <i className="fa-solid fa-cart-shopping text-white text-2xl relative top-1"></i>
            <div className="flex justify-center items-center absolute bg-red-500 text-white text-xs h-5 w-5 rounded-full right-0 -top-1">
              {cartItems.length || 0}
            </div>
          </div>
        </nav>

        {/* Cart items display in desktop view */}

        <div
          className={` relative bg-blue bg-black/50 w-full h-full  ${
            cartOpen ? "hidden" : ""
          }`}
        >
          <i
            onClick={() => setCartOpen((prev) => !prev)}
            className={`fa-solid fa-xmark absolute bg-pink-950 text-white p-2 rounded-full top-16 right-1 cursor-pointer z-20 ${
              cartOpen ? "hidden" : ""
            }`}
          ></i>
          <div className="fixed justify-center items-center bg-white border-2 border-pink-900 shadow-2xl overflow-auto h-1/2 w-1/3 right-2 mt-18 p-2">
            {cartItems.length === 0 ? (
              <h4 className="text-center text-pink-950 font-bold font-serif">
                Your Cart is Empty
              </h4>
            ) : (
              <div>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="border-b-1 border-pink-900 py-2 flex mt-2"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className=" w-10 px-2"
                    />
                    <h4>{item.title}</h4>
                    <button
                      className="text-red-500 hover:text-red-600 ml-4"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i
                        className="fa-solid fa-trash cursor-pointer"
                        title="Remove from Cart"
                      ></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
