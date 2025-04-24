

export interface ProductcardProps {
    product: ProductInterface
    //      {
    //         id: number;
    //         title: string;
    //         price: number;
    //         discountPercentage: number;
    //         thumbnail: string
    //     }
}
export interface Product extends ProductInterface {
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
    thumbnail: string
    images: string[];
    category: string;
    description: string;
    reviews: Review[];
    brand: string
}
export interface Review {
    reviewerName: string;
    date: string;
    rating: number;
    comment: string
}
export interface CartItem extends ProductInterface {
    quantity: number;
    selected?: boolean
}

export interface CartStore {
    cart: CartItem[];
    addToCart: (product: ProductInterface, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    toggleSelect: (id: number) => void;
    updateQuantity:(id:number,quantity:number )=>void;
    removeSelected:()=>void
}