import React, {  useEffect, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "@/components/Productcard"; // This is where you'll display individual products
import Skeleton from "@/components/Skeleton";

interface ProductlistProps {
  product: Product[];
  search?: string;
  category?: string;
  sort?: string;
  filters?: {
    brand?: string;
    price?: number;
    rating?: number;
    discount?: number;
  };
}

const Productlist: React.FC<ProductlistProps> = ({ product }) => {
  const [products, setproducts] = useState<Product[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (product) {
      console.log(product);
      setproducts(product);
      setloading(false);
    }
  }, [product]);

  if (loading) return <Skeleton />;
  return (
    <div>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-3">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Productlist;
