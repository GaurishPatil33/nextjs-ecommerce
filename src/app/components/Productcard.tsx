import Link from "next/link";
import Image from "next/image";
import React from "react";

const Productcard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className=" block group ">

      <div className="m-1 p-4 h-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <Image
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <h2 className="text-lg font-medium truncate">{product.title}</h2>
        <div className="flex items-center justify-between text-black">
          <p>{product.price} ₹</p>
          <p className=" text-sm text-green-500">{product.discountPercentage} % Off</p>
        </div>
      </div>
    </Link>
  );
};

export default Productcard;
