import React, { useState } from "react";
import Image from "next/image";
import { CartItemProps } from "@/lib/types";
import Link from "next/link";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";

const CartItem:React.FC<CartItemProps> = ({ item,toggleSelect,removeFromCart,updateQuantity }) => {
  const [qtyDropdownId, setqtyDropdownId] = useState<null | number>(null);

  return (
    <div className="">
      {" "}
      <div key={item.id} className="flex py-5 gap-3 md:gap-5 border-b pb-4 ">
        <div className="">
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => toggleSelect(item.id)}
            className="accent-blue-500"
          />
        </div>
        <div className="shrink-0 aspect-square w-14 md:w-32 ">
          <Image
            src={item.thumbnail || item.images[0]}
            alt={item.title}
            width={120}
            height={120}
            className="object-cover rounded"
          />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="flex flex-col w-full">
            <Link href={`/product/${item.id}`}>
              <div className="text-lg md:text-2xl font-semibold text-black/[0.8] line-clamp-2">
                {item.title}
              </div>
            </Link>
            <div className="text-sm md:text-lg font-medium text-black/[0.5] ">
              {item.brand}
            </div>

            <div className="flex flex-wrap gap-2  md:gap-3 items-center ">
              <p className="text-sm md:text-lg font-normal md:font-medium line-through text-gray-500">
                ₹{" "}
                {(
                  item.price *
                  (1 + item.discountPercentage / 100) *
                  item.quantity
                ).toFixed(2)}
              </p>
              <p className="text-sm font-medium  md:font-semibold">
                ₹ {(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-green-600 font-light md:font-normal">
                {item.discountPercentage}% OFF
              </p>
            </div>
            <div className="flex items-center  justify-between mt-1 pr-4">
              <div className="flex items-center gap-1 border rounded relative">
                <div className="text-sm  ">
                  <button
                    onClick={() =>
                      setqtyDropdownId(
                        qtyDropdownId === item.id ? null : item.id
                      )
                    }
                    className="flex items-center px-2 py-1"
                  >
                    Qty : {item.quantity}{" "}
                    <IoMdArrowDropdown className="text-xl ml-1" />
                  </button>
                </div>

                {qtyDropdownId === item.id && (
                  <div className="absolute top-full  mt-2 w-56 bg-white border shadow rounded-lg p-4 z-10">
                    <div className="flex justify-between mb-4">
                      <h2 className="text-xl mb-1 text-gray-500">
                        Select Quantity
                      </h2>
                      <button
                        className="text-gray-500 hover:text-black"
                        onClick={() => setqtyDropdownId(null)}
                      >
                        <IoMdClose />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4 justify-items-center">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="">
                          <button
                            className={`size-7 flex items-center justify-center rounded-full border text-sm font-medium transition  ${
                              i + 1 === item.quantity
                                ? "border-red-600 text-red-500"
                                : "border-gray-300 hover:bg-gray-100"
                            }`}
                            onClick={() => {
                              updateQuantity(item.id, i + 1);
                              setqtyDropdownId(null);
                            }}
                          >
                            {i + 1}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className=" items-center">
                {" "}
                <button className="" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
