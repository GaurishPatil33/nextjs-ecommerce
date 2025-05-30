import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  // const params = useSearchParams();
  // useEffect(() => {
  //   const a = new URLSearchParams(params.toString());
  //   console.log(params, a);
  // }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded shadow">Total Orders: 124</div>
      <div className="bg-white p-6 rounded shadow">
        Total Revenue: ₹2,45,000
      </div>
      <div className="bg-white p-6 rounded shadow">Products: 34</div>
    </div>
  );
};

export default page;


