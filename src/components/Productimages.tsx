import { useState } from "react";
import Image from "next/image";
import { ProductimageProps } from "@/lib/types";

const Productimages: React.FC<ProductimageProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0] || "");

  return (
    <div>
      <div className="relative w-full h-[400px] rounded-md  shadow-md overflow-hidden">
        <Image
          src={selectedImage}
          alt="img"
          fill
          priority
          className="object-contain rounded-md"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>

      <div className="flex gap-2 mt-4">
        {images?.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`w-16 h-16 relative cursor-pointer border-2  rounded-md ${
              selectedImage === image ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Image
              src={image}
              alt={`img-${index}`}
              fill
              className={`object-contain rounded-md `}
              sizes="64px"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productimages;
