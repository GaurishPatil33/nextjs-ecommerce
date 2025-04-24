"use client";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { useState } from "react";

const CartPage = () => {
  const { cart, clearCart, removeFromCart, toggleSelect, updateQuantity } =
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
  const [qtyDropdownId, setqtyDropdownId] = useState<null | number>(null);
  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert("Proceeding to Checkout!");
    // clearCart();
    router.push(`/checkout`);
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
  const handleRemoveSelected = () => {
    cart.forEach((item) => {
      if (item.selected) removeFromCart(item.id);
    });
  };

  return (
    <div className="w-full md:py-8 px-3 py-4">
      {cart.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mt-3">
            <div className="text-3xl md:text-4xl mb-5 font-semibold leading-tight">
              Shopping cart
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 md:gap-10 py-8">
            {/* cart items */}
            <div className="flex-2 p-5 w-full overflow-x-auto ">
              <div className="flex justify-between pr-4 ">
                {/* <div className="text-lg font-bold">Cart items</div> */}
                <div className=" flex items-center gap-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox accent-blue-500"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                    <span className="ml-2 text-sm">Select All</span>
                  </label>
                  {selectedItems.length > 0 && (
                    <button
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                      onClick={handleRemoveSelected}
                    >
                      Remove Selected
                    </button>
                  )}
                  <button
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                    onClick={()=>clearCart()}
                  >
                    Remove All
                  </button>
                </div>
              </div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex py-5 gap-3 md:gap-5 border-b pb-4 "
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
                          {/* <select
                            className=" border-none active:border-none py-1 rounded hover:text-black "
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                          >
                            {[...Array(10)].map((_, i) => (
                              <option
                                key={i}
                                value={i + 1}
                                className="hover:accent-blue-400"
                              >
                                {i + 1}
                              </option>
                            ))}
                          </select> */}
                        </div>
                        <div className=" items-center">
                          {" "}
                          <button
                            className=""
                            onClick={() => removeFromCart(item.id)}
                          >
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
            <div className="flex-1 flex flex-col gap-6 bg-gray-50 p-5 rounded-lg">
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
        <div className="flex flex-col items-center text-center px-4 mt-10 pb-10 space-y-4">
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
