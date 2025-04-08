"use client";
import React, { useEffect, useState } from "react";
import Productimages from "../../../components/Productimages";
import {
  fetchProductByCategory,
  fetchProductByID,
} from "@/lib/productfetchingAPI";
import { useParams } from "next/navigation";
import Productcard from "@/components/Productcard";
import { ProductInterface } from "@/lib/types";



const Product = () => {
  const params = useParams();
  const id = Array.isArray(params?.id)?params.id[0]:params.id;
  const [product, setproduct] = useState<ProductInterface | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const handleQuantity = (a: string) => {
    if (a === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    // if (!product || typeof product.stock !== "number") return;
    if (a === "i" && quantity < (product?.stock ?? 0)) {
      setQuantity((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      if(id){try {
        const data = await fetchProductByID(id);
        const related = await fetchProductByCategory(data.category);

        setproduct(data);
        setRelatedProducts(related);
        console.log(data);
      } catch (error) {
        console.error("eroor", error);
      }}else{
        console.log("No product id provided")
      }
    };
    getProduct();
  }, [id]);

  if (!product)
    return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className=" flex gap-2 flex-col px-4 md:px-8 lg:px-16">
      <div className=" relative flex flex-col md:flex-row gap-10 mt-5">
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
                    Only{" "}
                    <span className="text-orange-500">{product.stock}</span>
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
      {/* Customer reviews */}
      <div className="mt-10 ">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        <div className="h-0.5 bg-gray-100 my-2" />
        {product?.reviews?.length > 0 ? (
          product?.reviews?.map((review, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{review.reviewerName}</h3>
                <span className="text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p className="text-gray-600 ">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Related Products</h2>
        <div className="h-0.5 bg-gray-100 my-2" />
        <div className="flex gap-4 overflow-x-auto">
          {relatedProducts
            .filter((p) => p.id !== product.id)
            .slice(0, 7)
            .map((product, index) => (
              <div className="    min-w-44 w-60" key={index}>
                <Productcard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Product;
