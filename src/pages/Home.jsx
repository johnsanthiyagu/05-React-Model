import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="flex justify-center items-center flex-col gap-4 min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl text-pink-950 font-bold font-serif text-center">
        Welcome to Online Shopping
      </h1>
      <p className="text-sm text-pink-950 font-bold italic text-center max-w-md">
        Find your favorites
        <Link to="/product" className="underline px-1 ">
          here...
        </Link>
      </p>
    </main>
  );
};

export default Home;
