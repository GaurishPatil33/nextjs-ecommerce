export interface ProductcardProps {
    product: {
      id: number;
      title: string;
      price: number;
      discountPercentage: number;
      thumbnail: string;
    }
  }
  
export interface ProductimageProps {
    images: string[];
  }