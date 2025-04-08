import Link from "next/link";
import React from "react";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";

const Footer = () => {
  return (
    <div className=" px-4 py-20 relative bg-gray-100 text-black text-sm mt-24">
      <div className=" flex  md:flex-row justify-between gap-24">
        <div className="w-1/2 md:w-1/4 flex flex-col gap-8">
          <Link href={"/"} className=" text-xl font-bold text-red-400">
            Logo
          </Link>
          <span className="font-bold border-b-1 w-max">Keep In Touch</span>
          <span className="font-semibold">abc@gmail.com</span>
          <span className="font-semibold">+91 999 999 9999</span>
          <div className="flex gap-6">
            <Link href={`/`}>
              <TiSocialLinkedin />
            </Link>
            <Link href={`/`}>
              <TiSocialTwitter />
            </Link>
            <Link href={`/`}>
              <TiSocialFacebook />
            </Link>
            <Link href={`/`}>
              <TiSocialInstagram />
            </Link>
            <Link href={`/`}>
              <TiSocialYoutube />
            </Link>
          </div>
        </div>
        <div className=" hidden md:flex justify-between  w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg border-b border-b-gray-700 w-max">
              Company
            </h1>
            <div className="flex flex-col gap-6"></div>
            <Link href={"/"}>About Us</Link>
            <Link href={"/"}>Carrers</Link>
            <Link href={"/"}>Blog</Link>
            <Link href={"/"}>Contact Us</Link>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg border-b border-b-gray-700 w-max">
              Company
            </h1>
            <div className="flex flex-col gap-6"></div>
            <Link href={"/"}>About Us</Link>
            <Link href={"/"}>Carrers</Link>
            <Link href={"/"}>Blog</Link>
            <Link href={"/"}>Contact Us</Link>
          </div>
        </div>
        <div className=" md:flex flex-col justify-between w-1/2 md:w-1/4 gap-6">
          <div className="flex flex-col justify-between gap-6">
            <h1 className="font-medium text-lg border-b border-b-gray-900 w-max">
              Shop For
            </h1>
            <div className="flex flex-col justify-between gap-4"></div>
            <Link href={`/searchResults?q=${'category/men'}`}>Men</Link>
            <Link href={"/"}>Women</Link>
            <Link href={"/"}>Kids</Link>
            <Link href={"/"}>Home and Living</Link>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Footer;
