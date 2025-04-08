"use client";
import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../lib/productfetchingAPI";
import Productcard from "./Productcard";
import { Product } from "@/lib/types";


const Productlist = () => {
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
    <div>
      
      <ul>
        {products.slice(0,7).map((product) => (
       <Productcard key={product.id} product={product}/>
        ))}
      </ul>
    </div>
  );
};

export default Productlist;
