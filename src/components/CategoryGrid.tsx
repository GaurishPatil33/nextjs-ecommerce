import React from "react";
import Image from "next/image";

const categories = [
  {
    name: "men",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className=" cursor-pointer hover:scale-105 transition-transform text-center"
        >
          <Image
            src={cat.img}
            alt={cat.name}
            width={300}
            height={300}
            className=" rounded-lg object-cover w-full"
          />
          <span className="mt-2 text-lg font-semibold">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
