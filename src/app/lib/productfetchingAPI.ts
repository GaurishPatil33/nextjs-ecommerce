import { ProductcardProps } from "./types"

export async function fetchAllProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        return data.products

    } catch (err) {
        console.error("error fetching ", err)
        return []
    }

}
export async function fetchProductByID(id:string) {
    try {
        console.log(id)
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await res.json()
        console.log(data.products)
        return data

    } catch (err) {
        console.error("error", err)
        return []
    }

}

export async function searchProduct(id: string): Promise<ProductcardProps[]> {
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${id}`);
  
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await res.json();
  
      // Assuming `data.products` is an array of product objects
      return data.products as ProductcardProps[];  // Type the response as Product[]
    } catch (err) {
      console.error("Error fetching products:", err);
      return [];
    }
  }

export async function fetchProductByCategory(id:string) {
    try {
        const res = await fetch(`https://dummyjson.com/products/category/${id}`)
        const data = await res.json()
        return data.products

    } catch (err) {
        console.error("error", err)
        return []
    }

}