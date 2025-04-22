import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  return (
    <>
      <div className="container mx-auto py-5 flex-col flex mt-20 h-full">
        {/* If cart is empty */}
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center flex-col gap-4 py-10 h-screen">
            <h1 className="text-4xl text-pink-950 font-bold font-serif">
              Your Cart is Empty!
            </h1>
            <p className="text-sm text-pink-950 font-bold italic">
              Find your favorites
              <Link to="/product" className="underline px-1">
                here...
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 ">
            {/* Cart Items List */}
            <div className="col-span-2">
              <table className="w-full text-left border-collapse">
                <thead className="border-b">
                  <tr className="text-pink-950">
                    <th className="py-2">Products</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">SubTotal</th>
                    <th className="py-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-300 ">
                      <td className="flex items-center font-semibold text-sm gap-2 py-4 cursor-pointer">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 rounded"
                          onClick={() => navigate(`/productdetails/${item.id}`)}
                        />
                        <span
                          className="cursor-pointer"
                          onClick={() => navigate(`/productdetails/${item.id}`)}
                        >
                          {item.title}
                        </span>
                      </td>
                      <td className="w-20">${item.price.toFixed(2)}</td>
                      <td className="w-28">
                        <div className="flex space-x-2 items-center">
                          <button
                            className="text-red-500 text-lg font-bold w-6 h-6 border rounded-full flex items-center justify-center"
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            className="text-green-500 text-lg font-bold w-6 h-6 border rounded-full flex items-center justify-center"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="w-20">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="w-20">
                        <button
                          className="text-red-500 hover:text-red-600 ml-4"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fa-solid fa-trash cursor-pointer"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <div className="md:block hidden border p-4 rounded-lg shadow-lg bg-white ">
              <h3 className="text-xl font-bold mb-2">Cart Total</h3>
              <p className="text-sm text-gray-700">
                Total Items: {cartItems.length}
              </p>

              <div className="my-4">
                <p className="text-gray-700 font-semibold">Shipping:</p>
                <p className="text-gray-600">
                  Shipping To: <span className="font-bold">Chennai</span>
                </p>
                <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-md">
                  Change Address
                </button>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between items-center mt-4">
                <h3 className="text-lg font-bold">Total Price:</h3>
                <p className="text-xl font-semibold text-pink-950">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>

              {/* Checkout Button */}
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md text-center">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
        {/* Cart Summary for mobile view*/}
        <div className="sm:hidden block border p-4 rounded-lg shadow-lg ">
          <h3 className="text-xl font-bold mb-2">Cart Total</h3>
          <p className="text-sm text-gray-700">
            Total Items: {cartItems.length}
          </p>

          <div className="my-4">
            <p className="text-gray-700 font-semibold">Shipping:</p>
            <p className="text-gray-600">
              Shipping To: <span className="font-bold">Chennai</span>
            </p>
            <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-md">
              Change Address
            </button>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between items-center mt-4">
            <h3 className="text-lg font-bold">Total Price:</h3>
            <p className="text-xl font-semibold text-pink-950">
              ${totalPrice.toFixed(2)}
            </p>
          </div>

          {/* Checkout Button */}
          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md text-center">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
