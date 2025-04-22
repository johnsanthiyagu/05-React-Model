import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]); // ✅ Fixed dependency array placement

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-pink-950">
        Loading...
      </div>
    );

  const added = isInCart(product.id);

  const handleCart = () => {
    if (added) {
      removeFromCart(product.id);
    } else {
      addToCart({ ...product, quantity: 1 });
    }
  };

  return (
    <>
      <div className="md:flex hidden justify-center items-center h-screen px-8">
        <div className="flex border border-pink-300 rounded p-4 shadow-lg bg-white  justify-center items-center">
          {/* Product Image */}
          <div className="flex justify-center items-center w-2/5">
            <img
              src={product.image}
              alt={product.title}
              className="h-96 w-auto"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col w-3/5 border-l border-pink-300 p-4">
            <h1 className="text-2xl font-bold mb-4 text-pink-950">
              {product.title}
            </h1>
            <p className="text-lg">{product.description}</p>

            <div className="flex items-center mt-4 space-x-6">
              {/* Price */}
              <p className="text-xl font-bold text-pink-950">
                ${product.price}
              </p>

              {/* Add/Remove Cart Button */}
              <button
                className={`p-2 px-4 rounded-full text-white ${
                  added ? "bg-gray-500" : "bg-pink-900 hover:bg-pink-800"
                }`}
                onClick={handleCart}
              >
                {added ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>

            {/* Product Rating */}
            <div className="flex items-center mt-2 space-x-2 text-gray-700">
              <p className="text-sm font-semibold">
                {product?.rating?.rate || "No rating"}
              </p>
              {/* Render star icons */}
              <div className="flex">
                {Array.from({
                  length: Math.floor(product?.rating?.rate || 0),
                }).map((_, index) => (
                  <i
                    key={index}
                    className="fa-solid fa-star text-amber-600 text-xs"
                  ></i>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view */}

      <div className="md:hidden flex flex-col justify-center items-center ">
        <div className="flex flex-col p-4 justify-center items-center mt-36">
          {/* Product Image */}
          <div className="flex justify-center items-center w-1/2 h-auto">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col w-3/5 p-4">
            <h1 className="text-2xl font-bold mb-4 text-pink-950">
              {product.title}
            </h1>
            <p className="text-lg">{product.description}</p>

            <div className="flex justify-between items-center mt-4 space-x-6">
              {/* Price */}
              <p className="text-xl font-bold text-pink-950">
                ${product.price}
              </p>
              {/* Product Rating */}
              <div className="flex items-center mt-2 space-x-2 text-gray-700">
                <p className="text-sm font-semibold">
                  {product?.rating?.rate || "No rating"}
                </p>
                {/* Render star icons */}
                <div className="flex">
                  {Array.from({
                    length: Math.floor(product?.rating?.rate || 0),
                  }).map((_, index) => (
                    <i
                      key={index}
                      className="fa-solid fa-star text-amber-600 text-xs"
                    ></i>
                  ))}
                </div>
              </div>
              {/* Add/Remove Cart Button */}
            </div>
            <button
              className={`p-2 mt-4 px-4 rounded-full text-white ${
                added ? "bg-gray-500" : "bg-pink-900 hover:bg-pink-800"
              }`}
              onClick={handleCart}
            >
              {added ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
