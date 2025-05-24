import ProductForm from "@/components/admin components/ProductForm";
import React from "react";

const NewProduct = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <ProductForm />
    </div>
  );
};

export default NewProduct;
