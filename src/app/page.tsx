"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

 const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/main");
  }, [router]);
  return <div className=""></div>;
};

export default Home