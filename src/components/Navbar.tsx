"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Searchbar from "./Searchbar";
import { MdMenu } from "react-icons/md";
import Mobilemenu from "./Mobilemenu";
import { FaCartShopping } from "react-icons/fa6";
// import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import Cart from "./Cart";
import useOutSideClick from "@/hooks/useOutSideClick";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
// import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { cart } = useCartStore();

  const router = useRouter();

  const mobileRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);

  useOutSideClick(mobileRef, () => setIsMobileMenuOpen(false));
  useOutSideClick(cartRef, () => setIsCartOpen(false));
  useOutSideClick(wishlistRef, () => setIsWishlistOpen(false));

  return (
    <nav className=" top-0 w-full z-20  mb-5">
      <div className=" max-w-7xl mx-auto px-6 shadow-2xs mb-1 ">
        <div className=" flex justify-between items-center h-10">
          <div className="w-1/2 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href={"/"} className=" text-2xl font-bold text-red-400 ">
              Logo
            </Link>
            {/* category link */}
            {/* <div className=" hidden md:flex gap-2 text-xs">
              {['Men','Women','Kids','Electronics','Beuty'].map((a)=>(
                <Link key={a.id} href={`/searchResults?q=${a}` }
                className=" text-red-400 hover:text-red-600 active:bg-red-300 ">{a}</Link>

              ))}
            </div> */}
          </div>
          {/* desktop search */}
          <div className=" hidden md:flex mx-3">
            <Searchbar />
          </div>
          {/* wishlist , cart */}
          <div className=" right-0 flex justify-center items-center gap-3 font-bold text-gray-900 ">
            {/* <button
              className="cursor-pointer"
              onClick={() => setIsWishlistOpen((prev) => !prev)}
            >
              <FaRegHeart />
            </button> */}

            <button
              className="cursor-pointer relative"
              // onClick={() => setIsCartOpen((prev) => !prev)}
              onClick={() => router.push(`/cart`)}
            >
              <FaCartShopping />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>

            {/* <button
              className="cursor-pointer"
              onClick={() => setIsWishlistOpen((prev) => !prev)}
            >
              <FaRegUserCircle />
            </button> */}

            {/* mobile menu button  */}
            <div className=" md:hidden  flex items-center relative">
              <button
                className=" rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                {isMobileMenuOpen ? "X" : <MdMenu />}
              </button>
            </div>
          </div>
        </div>
        {/* if mobile menu open */}
        {isMobileMenuOpen && (
          <div ref={mobileRef} className=" flex justify-end absolute right-0">
            <Mobilemenu />
          </div>
        )}
        {/* if cart open */}
        {isCartOpen && (
          <div ref={cartRef} className=" flex justify-end absolute right-0">
            <Cart />
          </div>
        )}
        {/* if wishlist open */}
        {isWishlistOpen && (
          <div ref={wishlistRef} className=" flex justify-end absolute right-0">
            wishlist
          </div>
        )}
        {/* <ThemeToggle /> */}
      </div>
      <div className="md:hidden  flex justify-center items-center mt-2">
        <Searchbar />
      </div>
    </nav>
  );
};

export default Header;
