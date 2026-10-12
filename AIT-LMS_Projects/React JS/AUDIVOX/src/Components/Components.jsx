import React, { useState, useEffect } from 'react'
import Black_Logo from "../assets/black theam logo.png"
import White_Logo from "../assets/white theam logo.png"
import { NavLink } from 'react-router-dom'
import { getCartCount } from "../Utils/cart";

// Icons
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";



// Navbar
function Header() {

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {

    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    // Get count when Header loads
    updateCartCount();

    // Listen for Add / Remove / Quantity changes
    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );
    };

  }, []);

  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const checkTheme = () => {
      setIsDark(systemTheme.matches);
    };

    checkTheme();

    systemTheme.addEventListener("change", checkTheme);

    return () => {
      systemTheme.removeEventListener("change", checkTheme);
    };
  }, []);

  return (
    <nav className="m-[10px] mx-[20px]">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/">
          {isDark ? (
            <img className="w-[140px] sm:w-[160px] lg:w-[180px] h-[40px] object-contain" src={Black_Logo} alt="Logo"/>
          ) : (
            <img className="w-[140px] sm:w-[160px] lg:w-[180px] h-[40px] object-contain" src={White_Logo} alt="Logo"/>
          )}
        </NavLink>


        {/* ================= DESKTOP SEARCH ================= */}
        <div className="hidden md:flex flex-1 mx-[30px] lg:mx-[80px]">
            <input type="text" placeholder="Search products..." className="hidden w-full h-[38px] px-[15px] rounded-md border border-gray-400 outline-none focus:border-orange-500 transition"/>
        </div>
        {/* ================= DESKTOP ICONS ================= */}
        <div className="hidden md:flex items-center">
            <CiSearch className="w-[30px] h-[30px] cursor-pointer hover:text-orange-500 hover:scale-110 active:scale-90 transition"/>
            <NavLink to="/cart">
              <div className="relative">
                <CiShoppingCart className="ml-[50px] w-[30px] h-[30px] cursor-pointer hover:text-orange-500 hover:scale-110 active:scale-90 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-[10px] -right-[10px] w-[20px] h-[20px] flex items-center justify-center bg-orange-600 text-white text-[11px] font-bold rounded-full">
                    {cartCount}
                  </span>
                )}

              </div>
            </NavLink>
            <GoPerson className="ml-[50px] w-[30px] h-[30px] cursor-pointer hover:text-orange-500 hover:scale-110 active:scale-90 transition"/>
        </div>


        {/* ================= MOBILE ICONS ================= */}
        <div className="flex md:hidden items-center">
            <NavLink to="/cart"><CiShoppingCart className=" w-[28px] h-[28px] hover:text-orange-500 active:scale-90 transition"/></NavLink>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className=" ml-[15px] w-[35px] h-[35px] flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-90 transition cursor-pointer">
            {menuOpen ? "✕" : "☰"}</button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className=" md:hidden mt-[15px] border border-gray-700 rounded-md p-[15px] flex flex-col gap-[15px]">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className=" hover:text-orange-500 active:scale-95 transition">Home</NavLink>
            <NavLink to="/products" onClick={() => setMenuOpen(false)} className=" hover:text-orange-500 active:scale-95 transition">Products</NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)} className=" hover:text-orange-500 active:scale-95 transition">Cart</NavLink>
            <div className="flex items-center gap-[8px] hover:text-orange-500 cursor-pointer">
                <GoPerson /><span>Account</span>
            </div>
        </div>
      )}
    </nav>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className=" pt-[40px] pb-[30px] px-[20px] md:px-[40px] lg:px-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px] border-b border-gray-700">
        {/* Logo + Subscribe */}
        <div className="lg:col-span-1">
          <img className="w-[180px] md:w-[200px]" src={Black_Logo} alt="Logo"/>
          <p className=" mt-[15px] text-base md:text-lg text-gray-400 max-w-[450px]">Subscribe to our Email alerts to receive early discount offers and new product info.</p>
          <input className=" mt-[15px] w-full max-w-[490px] h-[40px] px-[10px] rounded border border-gray-600 bg-transparent text-white outline-none focus:border-orange-500" type="email" placeholder="Enter Email Address*"/>
          <button className=" bg-orange-600 hover:bg-orange-700 active:scale-95 transition duration-200 cursor-pointer mt-[15px] w-[150px] h-[40px] rounded text-white">Subscribe</button>
        </div>

        {/* Help */}
        <div className="flex flex-col gap-[10px]">
          <h1 className="font-bold text-xl mb-[5px]">Help</h1>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">FAQs</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Track Order</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Cancel Order</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Return Order</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#"
          >Warranty Info</a>
        </div>

        {/* Policies */}
        <div className="flex flex-col gap-[10px]">
          <h1 className="font-bold text-xl mb-[5px]">Policies</h1>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Return Policy</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Security</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Sitemap</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#"> Privacy Policy</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Terms & Conditions</a>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-[10px]">
          <h1 className="font-bold text-xl mb-[5px]">Company</h1>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">About Us</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Contact Us</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Service Centers</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Careers</a>
          <a className="text-gray-400 hover:text-orange-500 hover:underline transition" href="#">Affiliates</a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="px-[20px] md:px-[40px] py-[15px] flex flex-col sm:flex-row items-center justify-between gap-[15px]">
        <div className="text-gray-400 text-sm text-center sm:text-left">
          © 2026 | All Rights Reserved
        </div>
        {/* Social Icons */}
        <div className="flex gap-[15px]">
          <FaFacebookF className="text-white text-xl cursor-pointer p-[2px] rounded hover:bg-orange-600 hover:scale-110 active:scale-90 transition"/>
          <FaTwitter className=" text-white text-xl cursor-pointer p-[2px] rounded hover:bg-orange-600 hover:scale-110 active:scale-90 transition"/>
          <FaInstagram className=" text-white text-xl cursor-pointer p-[2px] rounded hover:bg-orange-600 hover:scale-110 active:scale-90 transition"/>
          <FaLinkedinIn className="text-white text-xl cursor-pointer p-[2px] rounded hover:bg-orange-600 hover:scale-110 active:scale-90 transition"/>
        </div>

      </div>
    </footer>
  );
}

export { Header, Footer };