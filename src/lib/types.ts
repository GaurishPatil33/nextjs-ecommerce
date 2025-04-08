import exp from "constants";

export interface ProductcardProps {
    product: {
        id: number;
        title: string;
        price: number;
        discountPercentage: number;
        thumbnail: string
    }
}
export interface Product {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    thumbnail: string

}
export interface Productlist {
    product: Product
}
export interface ProductimageProps {
    images: string[]
}
export interface ProductInterface {

    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    stock: number;
    images: string[];
    category: string;
    description: string;
    reviews:Review
}
export interface Review{
    reviewerName:string;
    date:string;
    rating:number;
    comment:string
}