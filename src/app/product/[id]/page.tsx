"use client";
import React, { useEffect, useState } from "react";
import Productimages from "../../components/Productimages";
import { fetchProductByID } from "@/app/lib/productfetchingAPI";
import { useParams } from "next/navigation";
import { ProductInterface } from "@/app/lib/types";

const Product = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (a: string) => {
    if (a === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (a === "i" && product?.stock && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      if (id) { // Ensure id is a valid string before fetching the product
        try {
          const data = await fetchProductByID(id);
          setProduct(data);
          console.log(data);
          console.log(data.images);
        } catch (error) {
          console.error("Error fetching product", error);
        }
      } else {
        console.error("No product ID provided");
      }
    };
    getProduct();
  }, [id]);

  if (!product)
    return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="px-4 md:px-8 lg:px-16 relative flex flex-col md:flex-row gap-10 mt-2">
      {/* images */}
      <div className="w-full md:w-1/2 lg:sticky top-16 h-max">
        <Productimages images={product.images} />
      </div>
      {/* description */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl lg:mt6 font font-medium">{product.title}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-0.5 bg-gray-100" />
        <div className=" flex items-center gap-4">
          <h3 className="font-medium text-2xl md:text-xl">
            ₹ {Math.round(product.price)}
          </h3>
          <h3 className="text-xl md:text-xs  text-gray-500 ">
            MRP
            <span className="ml-2 line-through">
              ₹{Math.round(product.price)}
            </span>
          </h3>
          <h3 className="text-orange-500">
            ( {product.discountPercentage} % Off )
          </h3>
        </div>
        <p className="text-green-500">inclusive of all taxes</p>
        <div className="h-0.5 bg-gray-100" />
        <div className="flex flex-col gap-4">
          <h4 className="font-medium">Choose a Quantity</h4>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className=" bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32 ">
                <button
                  className="cursor-pointer text-xl"
                  onClick={() => handleQuantity("d")}
                >
                  -
                </button>
                {quantity}
                <button
                  className="cursor-pointer text-xl"
                  onClick={() => handleQuantity("i")}
                >
                  +
                </button>
              </div>
              {product.stock < 10 && (
                <div className="text-xs">
                  Only <span className="text-orange-500">{product.stock}</span>
                  left! dont miss it
                </div>
              )}
            </div>
            <button className=" w-30 text-sm rounded-3xl ring-1 ring-red-500 text-red-400 hover:bg-red-400 hover:text-white disabled:cursor-not-allowed disabled:bg-red-200 disabled:text-white disabled:ring-none">
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
