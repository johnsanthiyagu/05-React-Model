import React from "react";

const Footer = () => {
  return (
    <footer className="bottom-0 px-24 p-2 bg-pink-900 w-full">
      <div className="md:flex md:justify-between items-center text-center text-white  p-2 justify-center">
        <div className="flex md:space-x-8 space-x-4 text-center justify-center">
          <i
            className="fa-brands fa-instagram cursor-pointer"
            title="Instagram"
          ></i>
          <i
            className="fa-brands fa-facebook cursor-pointer"
            title="Facebook"
          ></i>
          <i
            className="fa-brands fa-whatsapp cursor-pointer"
            title="Whatsapp"
          ></i>
          <i
            className="fa-brands fa-youtube cursor-pointer"
            title="Youtube"
          ></i>
        </div>
        <div className="md:flex justify-center items-center md:mt-0 mt-4">
          © All rights reserved 2025.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
