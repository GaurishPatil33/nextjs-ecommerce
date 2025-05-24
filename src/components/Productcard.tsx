"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { ProductcardProps } from "@/lib/types";
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";
import { useCartStore } from "@/lib/store/cartStore";

const Productcard: React.FC<ProductcardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
    }
  };
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow duration-300">
      <div
        onClick={() => setWishlisted(!wishlisted)}
        className={` absolute top-4 right-4 p-2 rounded-full opacity-70 md:opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition z-10 ${
          wishlisted ? "bg-red-100 text-red-500" : "bg-white hover:bg-gray-100"
        }`}
      >
        <FaRegHeart />
      </div>
      <Link href={`/main/product/${product.id}`} className=" block group ">
        <div className="m-1 p-4 h-full ">
          <div className="relative w-full h-40">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              priority
              className=" object-contain rounded-md"
              sizes="(max-width: 768px) 100vw, 300px"
            />
            <div className="absolte left-4 bottom-4 text-xs flex gap-1">
              {product.rating} <div className="text-yellow-200">★</div>{" "}
            </div>
          </div>

          <h2 className="text-lg font-medium truncate ">{product.title}</h2>

          <div className="flex items-center gap-2 mt-1">
            <p className="text-[13px] font-semibold">
              {Math.round(product.price)} ₹
            </p>
            <p className=" text-[10px]  text-green-500">
              {product.discountPercentage} % Off
            </p>
          </div>
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center  opacity-0 group-hover:opacity-75 transition-opacity duration-300 z-10">
            <div className="   hover:bg-gray-400 text-black   px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-lg">
              Out Of Stock
            </div>
          </div>
        )}
      </Link>

      {product.stock > 0 && (
        <div className="absolute bottom-0 left-0  w-full bg-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 shadow-md ">
          <button
            onClick={handleAddToCart}
            className="bg-red-500  hover:bg-red-500 text-white w-full px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-md"
          >
            Add To Cart
            <FaCartShopping className=" text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Productcard;
