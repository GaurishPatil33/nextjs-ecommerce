"use client";
import { useCartStore } from "@/lib/store/cartStore";
import {
  Button,
  Container,
  Title,
  Notification,
  Stack,
  Paper,
  TextInput,
  Group,
  Text,
  Divider,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CheckoutPage = () => {
  const { cart } = useCartStore();
  const router = useRouter();

  const selectedItems = cart.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = selectedItems.reduce(
    (sum, item) =>
      sum + item.price * (item.discountPercentage / 100) * item.quantity,
    0
  );
  const deliveryCharges =
    selectedItems.length === 0 ? 0 : totalPrice > 200 ? 0 : 50;
  const totalAmount = totalPrice - discount + deliveryCharges;
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const handlePlaceOrder = () => {
    const { name, address, city, phone } = shippingInfo;
    if (!name || !address || !city || !phone) {
      alert("Please fill in all shipping details.");
      return;
    }
    setIsOrderPlaced(true);

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  // if (selectedItems.length === 0 && !isOrdePlaced) {
  //   return (
  //     <Container px={"xl" } className="py-10 items-center">
  //       <Title order={2} mb={"sm"}>
  //         No items selected for checkout
  //       </Title>
  //       <Button color="blue" onClick={() => router.push("/")}>
  //         Continue Shopping
  //       </Button>
  //     </Container>
  //   );
  // }

  if (selectedItems.length === 0 && !isOrderPlaced) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h1 className=" text-xl md:text-2xl font-semibold mb-4">
          No items selected for checkout.
        </h1>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 md:px-8 ">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center">
          {isOrderPlaced ? "Order Confirmed!" : "Checkout"}
        </h1>

        {isOrderPlaced ? (
          <div className="text-green-600  text-lg md:text-xl font-medium">
            Thank you for your order! 🎉
            <br /> Redirecting to home...
          </div>
        ) : (
          <div className="flex flex-col md:flex-row w-full justify-center gap-2 md:gap-8">
            <div className="bg-white shadow p-4 rounded-lg mb-6 text-sm md:text-base gap-3">
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
              <div className="gap-3 flex flex-col">
                <div className=" gap-2 justify-between flex">
                  <label>Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Your Name..."
                    required
                    className="border w-full rounded px-2"
                    value={shippingInfo.name}
                    onChange={(val) =>
                      setShippingInfo({
                        ...shippingInfo,
                        name: val.target.value,
                      })
                    }
                  />
                </div>
                <div className=" gap-2 justify-between flex">
                  <label>Address:</label>
                  <input
                    type="text"
                    placeholder="Enter Your Address..."
                    required
                    className="border w-full rounded px-2"
                    value={shippingInfo.address}
                    onChange={(val) =>
                      setShippingInfo({
                        ...shippingInfo,
                        address: val.target.value,
                      })
                    }
                  />
                </div>
                <div className=" gap-2 justify-between flex">
                  <label>City: </label>
                  <input
                    type="text"
                    placeholder="Enter Your City..."
                    required
                    className="border w-full rounded px-2"
                    value={shippingInfo.city}
                    onChange={(val) =>
                      setShippingInfo({
                        ...shippingInfo,
                        city: val.target.value,
                      })
                    }
                  />
                </div>
                <div className=" gap-2 justify-between flex">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    placeholder="Enter Your Mobile Number..."
                    required
                    className="border w-full rounded px-2"
                    value={shippingInfo.phone}
                    onChange={(val) =>
                      setShippingInfo({
                        ...shippingInfo,
                        phone: val.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-white shadow p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span>₹ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between">
                <span>Total Price</span>
                <span>₹ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹ {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {deliveryCharges === 0
                    ? "FREE"
                    : `₹ ${deliveryCharges.toFixed(2)}`}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>₹ {totalAmount.toFixed(2)}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
