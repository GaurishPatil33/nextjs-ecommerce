export interface ProductcardProps {
    product: {
      id: number;
      title: string;
      price: number;
      discountPercentage: number;
      thumbnail: string;
    }
  }

export interface Product {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    thumbnail: string;
}

export interface ProductList {
    product: Product;
}
  
export interface ProductimageProps {
    images: string[];
  }

export interface ProductInterface {
    id: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    discountPercentage: number;
    images: string[];
}