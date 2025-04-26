"use client";
import { useRouter } from "next/navigation"
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";


const Searchbar = () => {
  const [searchterm, setSearchterm] = useState("");
  const router = useRouter();
  
  
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if(!searchterm.trim())return;
    router.push(`/listingPage?search=${encodeURIComponent(searchterm)}`);
  };

  return (
    <div>
      <form
        action=""
        className=" flex w-full justify-between items-center  md:w-max shadow-md md:shadow-none rounded-xl px-4"
        onSubmit={handleSubmit}
      >
        <input className=" outline-none flex-1"
          type="text"
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">
          <IoSearch />
          </button>
      </form>
    </div>
  );
};

export default Searchbar;
