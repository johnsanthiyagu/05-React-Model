import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const API_URL = "https://fakestoreapi.com/products";
const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(data.length / postPerPage);
  const Paginate = (page) => setCurrentPage(page);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="flex justify-center items-center text-2xl text-pink-950 h-screen">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="flex justify-center items-center text-2xl text-pink-950 h-screen">
        Error:{error.message}
      </p>
    );
  // console.log(data);
  return (
    <>
      <section className="bg-pink-100 pt-10">
        <div className="flex justify-center items-center flex-col px-10 py-10 ">
          <div className="flex justify-center items-center flex-col gap-4 px-10 py-10">
            {data.length > 0 ? (
              data
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((product, index) => (
                  <>
                    <ProductCard key={index} product={product} />
                  </>
                ))
            ) : (
              <div>No Data in database</div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <button
              className="ml-2 py-0.5 px-2 cursor-pointer text-white font-semibold bg-pink-950 rounded hover:bg-pink-900"
              onClick={() => Paginate(1)}
            >
              Home
            </button>
            <button
              className="ml-2 py-0.5 px-2 cursor-pointer text-white font-semibold bg-pink-950 rounded hover:bg-pink-900"
              onClick={() => Paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            {new Array(totalPages).fill(0).map((_, index) => {
              return (
                <button
                  onClick={() => Paginate(index + 1)}
                  key={index + 1}
                  className={` 
                    ${
                      currentPage === index + 1
                        ? "ml-2 py-0.5 px-2.5 cursor-pointer text-white font-semibold bg-pink-500 rounded hover:bg-pink-900"
                        : "ml-2 py-0.5 px-2.5 cursor-pointer text-white font-semibold bg-pink-950 rounded hover:bg-pink-900"
                    }`}
                >
                  {index + 1}
                </button>
              );
            })}
            <button
              className="ml-2 py-0.5 px-2 cursor-pointer text-white font-semibold bg-pink-950 rounded hover:bg-pink-900"
              onClick={() => Paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            <button
              className="ml-2 py-0.5 px-2 cursor-pointer text-white font-semibold bg-pink-950 rounded hover:bg-pink-900"
              onClick={() => Paginate(totalPages)}
            >
              Last
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
