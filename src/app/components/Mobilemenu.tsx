import Link from "next/link";
import React from "react";
// import { FaUser } from "react-icons/fa";

const Mobilemenu = () => {

  
  const categories = [
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Kids", href: "/kids" },
    { name: "Home & Living", href: "/home-living" },
    { name: "Beauty", href: "/beauty" },
    {name:"laptop"}
    
  ];

  return (
    <div className="md:hidden bg-red-50 rounded-md ">
      <div className="px-4 py-2 space-y-1 ">
        {/* user account
        <div className="py3 border-b">
          <Link
            href="/"
            className=" flex items-center space-x-1 p-2 rounded-md hover:bg-gray-200"
          >
            <FaUser /> <span>Username</span>
          </Link>
        </div> */}

        {/* categoreies */}
        <div className="py-2 border-b flex flex-col text-[15px]">
          {categories.map((category) => (
            <Link
              href={`/searchResults?q=${category.name}`}
              key={category.name}
              className=" block p-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              {category.name}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Mobilemenu;
