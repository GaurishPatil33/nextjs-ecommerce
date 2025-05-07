"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCategories } from "@/lib/productfetchingAPI";
import { category } from "@/lib/types";

const CategoryGrid = () => {
  // const [categories, setcategories] = useState([]);
  const [categories, setcategories] = useState<category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetchCategories();
        console.log(res)
        setcategories(res);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {categories.slice(0,20).map((cat,i) => (
        <Link
          href={`/listingPage?cat=${cat.slug}`}
          key={i}
          className=" cursor-pointer hover:scale-105 transition-transform text-center"
        >
          {/* {cat?.img && (

            <Image
            src={cat.img}
            alt={cat.name}
            width={300}
            height={300}
            className=" rounded-lg object-cover w-full"
            />
          ) 
        } */}
          <span className="mt-2 text-lg font-semibold">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
