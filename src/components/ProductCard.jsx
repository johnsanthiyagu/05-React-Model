import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
  const navigate = useNavigate();
  const added = isInCart(product?.id); // Ensure product exists before accessing `.id`

  const clickCart = (e) => {
    e.stopPropagation(); // Stops click from bubbling
    added ? removeFromCart(product.id) : addToCart(product);
  };

  const handleEvent = () => {
    if (product?.id) {
      navigate(`/productdetails/${product.id}`);
    }
  };

  return (
    <>
      <div className="hidden md:flex justify-start items-center w-3/4 h-48 gap-6 rounded-2xl shadow-2xl bg-white p-4 border border-gray-300 ">
        <div className="flex justify-center items-center w-40 h-40">
          <img
            src={product.image}
            title={product.title}
            alt="Product"
            className="w-full h-full object-contain cursor-pointer"
            onClick={handleEvent}
          />
        </div>
        <div className="flex flex-col w-3/4 gap-4">
          <h2
            className="font-bold text-pink-950 hover:underline cursor-pointer"
            onClick={handleEvent}
          >
            {product.title}
          </h2>
          <p className="text-xs font-semibold h-16 overflow-hidden">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="font-bold text-pink-950 text-xl">${product.price}</p>

            <button
              className={`p-1 px-3 rounded-full text-white cursor-pointer ${
                added ? "bg-gray-500" : "bg-pink-900"
              }`}
              onClick={clickCart}
            >
              {added ? "Remove from Cart" : "Add to Cart"}
            </button>

            {/* Star Rating */}
            <div className="flex items-center gap-1">
              <p className="text-sm text-gray-700 font-semibold">
                {product.rating.rate}
              </p>
              {Array(Math.floor(product.rating.rate))
                .fill(0)
                .map((_, index) => (
                  <i
                    key={index}
                    className="fa-solid fa-star text-amber-600 text-xs"
                  ></i>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div className="md:hidden flex flex-col justify-center items-center p-2 relative">
        <div className="w-3/4 h-1/2 rounded-lg shadow-2xl flex flex-col justify-center items-center p-2 bg-white ">
          <div className="w-40 h-40">
            <img
              src={product.image}
              title={product.title}
              alt={product.title}
              className="w-full h-full object-contain cursor-pointer"
              onClick={handleEvent}
            />
          </div>
          <div>
            <h2
              className="font-bold text-pink-950 hover:underline p-2 cursor-pointer"
              onClick={handleEvent}
            >
              {product.title}
            </h2>
          </div>
          <div>
            <p className="text-xs font-semibold h-22 overflow-hidden p-1">
              {product.description}
            </p>
          </div>
          <div className="flex justify-between items-center w-full px-1">
            <span className="font-bold text-pink-950 text-xl">
              ${product.price}
            </span>
            <span className="text-sm text-gray-700 font-semibold">
              {product.rating.rate}{" "}
              <i className="fa-solid fa-star text-amber-600 text-xs"></i>
            </span>
          </div>
        </div>
        <div className="absolute top-2 right-12" onClick={clickCart}>
          {added ? (
            <i
              className="fa-solid fa-minus  text-white font-extrabold bg-gray-500 p-2 rounded cursor-pointer"
              title="Remove from Cart"
            ></i>
          ) : (
            <i
              className="fa-solid fa-plus text-white font-bold bg-pink-950 p-2 rounded cursor-pointer"
              title="Add to Cart"
            ></i>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
