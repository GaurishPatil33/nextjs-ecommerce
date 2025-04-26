"use client";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CartItem from "@/components/CartItem";

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
            {/* cart items section */}
            <div className="flex-2 p-5 w-full  ">
              <div className="flex justify-between items-center ">
                <div className="hidden md:block text-lg font-bold">Cart items</div>
                <div className=" flex items-center justify-between gap-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox accent-blue-500"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                    <span className="ml-2 text-sm">Select All</span>
                  </label>
                  <div className=" flex  gap-1 items-center justify-between">
                    {selectedItems.length > 0 && (
                      // <div className=" border-r px-1.5">
                      <button
                        className="text-red-500 hover:text-red-700 text-xs md:text-sm font-medium  border-r-black"
                        onClick={handleRemoveSelected}
                      >
                        Remove Selected
                      </button>

                      // </div>
                    )}
                    <button
                      className="text-red-500 hover:text-red-700 text-xs md:text-sm font-medium"
                      onClick={() => clearCart()}
                    >
                      Remove All
                    </button>
                  </div>
                </div>
              </div>

              {/* cart items */}
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  toggleSelect={toggleSelect}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
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
