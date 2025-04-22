"use client";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { CartItem } from "@/lib/types";

const CartPage = () => {
  const { cart, clearCart, addToCart, removeFromCart, toggleSelect } =
    useCartStore();
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
    <div>
      <div className="p-6 md:p-10">
        <h1 className=" text-3xl font-semibold mb-5">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center text-gray-400">
            Your cart is empty
            <br />
            <button
              className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              onClick={() => router.push(`/`)}
            >
              Go shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6">
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex items-center justify-between">
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
                  className="bg-white border p-4 rounded-md shadow-sm mb-3"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      className="mt-2"
                      onChange={() => toggleSelect(item.id)}
                    />
                    <div className="flex flex-col">
                      <div className="flex gap-6">
                        <Image
                          src={item.thumbnail || item.images[0]}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-md"
                        />

                        <div className="flex-1 w-full">
                          <h2 className="font-semibold">{item.title}</h2>
                          <p className="text-gray-500 text-sm">{item.brand}</p>

                          <div className="flex flex-wrap gap-2 items-center mt-1">
                            <p className="font-normal md:font-medium line-through text-gray-500">
                              ₹ {(
                                item.price *
                                (1 + item.discountPercentage / 100) *
                                item.quantity
                              ).toFixed(2)}
                            </p>
                            <p className="font-medium  md:font-semibold">
                              ₹ {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-green-600 font-light md:font-normal">
                              {item.discountPercentage}% OFF
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            className="px-2 py-1 border rounded"
                            onClick={() => decreaseQuantity(item)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="px-2 py-1 border rounded"
                            onClick={() => increaseQuantity(item)}
                          >
                            +
                          </button>
                        </div>
                        <button className="text-gray-600">
                          Save for Later
                        </button>

                        <button
                          className="text-red-500 hover:underline text-sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Price details */}
            <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg flex flex-col gap-6">
              <h2 className="text-xl font-semibold">Price Details</h2>
              <div className="flex justify-between ">
                <p>Price ({selectedItems.length} items)</p>
                <p>₹ {(totalPrice+discount).toFixed(2)}</p>
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
                <span>
                  ₹ {(totalPrice + deliveryCharges).toFixed(2)}
                </span>
              </div>
              <button
                className="mt-4 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
