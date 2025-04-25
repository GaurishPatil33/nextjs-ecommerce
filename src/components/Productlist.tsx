"use client";
import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../lib/productfetchingAPI";
import Productcard from "./Productcard";
import { Product } from "@/lib/types";


const Productlist = ({title}:{title:string}) => {
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    async function fetchproducts() {
      const res = await fetchAllProducts()||""
      console.log(res);
      setProducts(res)
    }
    fetchproducts();
  }, []);




  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((item)=>(
          <Productcard key={item.id} product={item}/>
        ))}
      </div>
      
   
    </div>
  );
};

export default Productlist;
