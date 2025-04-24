"use client";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { CartItem } from "@/lib/types";

const CartPage = () => {
  const {
    cart,
    clearCart,
    addToCart,
    removeFromCart,
    toggleSelect,
    updateQuantity,
  } = useCartStore();
  const router = useRouter();
  const selectedItems = cart.filter((item) => item.selected);
  const allSelected = cart.every((item) => item.selected);
  const totalPrice = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = selectedItems.reduce(
    (sum, i) =>
      sum + Math.round(i.price * (i.discountPercentage / 100)) * i.quantity,
    0
  );
  const deliveryCharges =
    selectedItems.length === 0 ? 0 : totalPrice > 200 ? 0 : 50;

  const decreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      addToCart(item, -1);
    } else {
      removeFromCart(item.id);
    }
  };

  const increaseQuantity = (item: CartItem) => {
    addToCart(item, 1);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert("Proceeding to Checkout!");
    clearCart();
  };

  const handleSelectAll = () => {
    if (allSelected) {
      cart.forEach((item) => {
        if (item.selected) toggleSelect(item.id);
      });
    } else {
      cart.forEach((item) => {
        if (!item.selected) toggleSelect(item.id);
      });
    }
  };

  return (
    // <div>
    //   <div className="p-6 md:p-10">
    //     <h1 className=" text-3xl font-semibold mb-5">Your Cart</h1>
    //     {cart.length === 0 ? (
    //       <div className="text-center text-gray-400">
    //         Your cart is empty
    //         <br />
    //         <button
    //           className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
    //           onClick={() => router.push(`/`)}
    //         >
    //           Go shopping
    //         </button>
    //       </div>
    // ) : (
    // <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6">
    //   <div className="flex flex-1 flex-col gap-6">
    //     <div className="flex items-center justify-between">
    //       <label className="inline-flex items-center cursor-pointer">
    //         <input
    //           type="checkbox"
    //           className="form-checkbox accent-blue-500"
    //           checked={allSelected}
    //           onChange={handleSelectAll}
    //         />
    //         <span className="ml-2 text-sm">Select All</span>
    //       </label>
    //     </div>
    //     {cart.map((item) => (
    //       <div
    //         key={item.id}
    //         className="bg-white border p-4 rounded-md shadow-sm mb-1"
    //       >
    //         <div className="flex items-start gap-4">
    //           <input
    //             type="checkbox"
    //             checked={item.selected}
    //             className="mt-2 accent-blue-500"
    //             onChange={() => toggleSelect(item.id)}
    //           />
    //           <div className="flex flex-col">
    //             <div className="flex gap-6">
    //               <Image
    //                 src={item.thumbnail || item.images[0]}
    //                 alt={item.title}
    //                 width={80}
    //                 height={80}
    //                 className="w-20 h-20 object-cover rounded-md"
    //               />

    //               <div className="flex-1 w-full">
    //                 <h2 className="font-semibold">{item.title}</h2>
    //                 <p className="text-gray-500 text-sm">{item.brand}</p>

    //                 <div className="flex flex-wrap gap-2 items-center mt-1">
    //                   <p className="font-normal md:font-medium line-through text-gray-500">
    //                     ₹ {(
    //                       item.price *
    //                       (1 + item.discountPercentage / 100) *
    //                       item.quantity
    //                     ).toFixed(2)}
    //                   </p>
    //                   <p className="font-medium  md:font-semibold">
    //                     ₹ {(item.price * item.quantity).toFixed(2)}
    //                   </p>
    //                   <p className="text-green-600 font-light md:font-normal">
    //                     {item.discountPercentage}% OFF
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="flex justify-between items-center mt-3">
    //               <div className="flex items-center gap-2">
    //                 <button
    //                   className="px-2  border rounded-full"
    //                   onClick={() => decreaseQuantity(item)}
    //                 >
    //                   -
    //                 </button>
    //                 <span>{item.quantity}</span>
    //                 <button
    //                   className="px-1.5 border rounded-full"
    //                   onClick={() => increaseQuantity(item)}
    //                 >
    //                   +
    //                 </button>
    //               </div>
    //               <button className="text-gray-600">
    //                 Save for Later
    //               </button>

    //               <button
    //                 className="text-red-500 hover:underline text-sm"
    //                 onClick={() => removeFromCart(item.id)}
    //               >
    //                 Remove
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   {/* Price details */}
    //   <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg flex flex-col gap-6">
    //     <h2 className="text-xl font-semibold">Price Details</h2>
    //     <div className="flex justify-between ">
    //       <p>Price ({selectedItems.length} items)</p>
    //       <p>₹ {(totalPrice+discount).toFixed(2)}</p>
    //     </div>
    //     <div className="flex justify-between ">
    //       <p>Discount</p>
    //       <p className="text-green-600">- ₹{discount.toFixed(2)}</p>
    //     </div>
    //     <div className="flex justify-between ">
    //       <p>Delivery Charges</p>
    //       {deliveryCharges === 0 ? (
    //         <span className="ml-1 text-green-600">FREE</span>
    //       ) : (
    //         <p>₹ {deliveryCharges.toFixed(2)}</p>
    //       )}
    //     </div>
    //     <div className="border-t my-2"></div>
    //     <div className="flex justify-between font-bold text-lg">
    //       <span>Total Amount</span>
    //       <span>
    //         ₹ {(totalPrice + deliveryCharges).toFixed(2)}
    //       </span>
    //     </div>
    //     <button
    //       className="mt-4 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg"
    //       onClick={handleCheckout}
    //     >
    //       Checkout
    //     </button>
    //   </div>
    // </div>

    //     )}
    //   </div>
    // </div>

    <div className="w-full md:py-8 px-3 py-4">
      {cart.length > 0 && (
        <div className="">
          <div className="text-center max-w-3xl mx-auto mt-3">
            <div className="text-3xl md:text-4xl mb-5 font-semibold leading-tight">
              Shopping cart
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            {/* cart items */}
            <div className="flex-2 p-5 ">
              <div className="flex justify-between pr-4">
                <div className="text-lg font-bold">Cart items</div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-500"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                  <span className="ml-2 text-sm">Select All</span>
                </label>
              </div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex py-5 gap-3 md:gap-5 border-b "
                >
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
                    />
                  </div>
                  <div className="w-full flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col w-full">
                      <div className="text-lg md:text-2xl font-semibold text-black/[0.8] truncate">
                        {item.title}
                      </div>
                      <div className="text-sm md:text-lg font-medium text-black/[0.5] ">
                        {item.brand}
                      </div>

                      <div className="flex gap-3 items-center ">
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
                      <div className="flex flex-col md:flex-row md:items-center  justify-between mt-1 pr-4">
                        <div className="flex items-center gap-1">
                          <div className="text-sm font-semibold">Quantity :</div>
                          <select
                            className=" border  py-1 rounded hover:text-black "
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
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
              ))}
            </div>

            {/* price details */}
            <div className="flex-1 flex flex-col gap-6 bg-gray-50 p-5">
              <h2 className="text-xl font-bold">Price Details</h2>
              <div className="flex justify-between ">
                <p>Price ({selectedItems.length} items)</p>
                <p>₹ {(totalPrice + discount).toFixed(2)}</p>
              </div>
              <div className="flex justify-between ">
                <p>Discount</p>
                <p className="text-green-600">- ₹{discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between ">
                <p>Delivery Charges</p>
                {deliveryCharges === 0 ? (
                  <span className="ml-1 text-green-600">FREE</span>
                ) : (
                  <p>₹ {deliveryCharges.toFixed(2)}</p>
                )}
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>₹ {(totalPrice + deliveryCharges).toFixed(2)}</span>
              </div>
              <button
                className="mt-4 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* if cart is empty */}
      {cart.length === 0 && (
        <div className="flex flex-col items-center md:mt-10 pb-10">
          <Image
            src="/empty-cart.jpg"
            alt={"Empty cart"}
            width={300}
            height={300}
            className="w-[300px] md:w-[400px]"
          />
          <span className="text-xl font-bold">Your cart is empty</span>
          <span className="text-center mt-4">
            Looks like you have not added anything in cart
            <br />
            Go ahead and explore top categories.
          </span>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={() => router.push(`/`)}
          >
            Continue shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
