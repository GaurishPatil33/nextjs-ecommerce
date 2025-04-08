import  { useState } from "react";
import Image from "next/image";

const Productimages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0] || "");

  return (
    <div>
      <div className="relative w-full h-[400px] rounded-md shadow-md overflow-hidden">
        <Image
          src={selectedImage}
          alt="img"
          fill
          priority
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>

      <div className="flex gap-2 mt-4">
        {images?.map((image, index) => (
          <div key={index} className="w-16 h-16 relative">
            <Image
              src={image}
              alt={`img-${index}`}
              fill
              className={`object-cover rounded-md cursor-pointer border-2 ${
                selectedImage === image ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(image)}
              sizes="64px"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productimages;
