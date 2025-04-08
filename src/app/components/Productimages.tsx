import React, { useState } from "react";
import Image from "next/image";
import { ProductimageProps } from "../lib/types";


const Productimages:React.FC<ProductimageProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0] || "");

 
  return (
    <div>
      <Image
        src={selectedImage}
        alt="img"
        layout="responsive"
        width={400}
        height={160}
        className="w-full h-auto object-cover rounded-md shadow-md "
      />
      <div className="flex gap-2 mt-4">
        {images?.map((image, index) => (
          <Image
            src={image}
            alt="img"
            key={index}
            layout="responsive"
            width={64}
            height={64}
            className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
              selectedImage === image ? " border-blue-500":"border-gray-300"
            } `}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Productimages;
