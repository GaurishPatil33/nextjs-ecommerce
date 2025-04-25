"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-red-50 text-black/70 pt-14 pb-3 px-4">
      <div className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Find a store
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              become a partner
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              sign up for email
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              send us feedback
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              student discount
            </div>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                get help
              </div>
              <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
                Order Status
              </div>
              <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
                Delivery
              </div>
              <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
                Returns
              </div>
              <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
                Payment Options
              </div>
              <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
                Contact Us
              </div>
            </div>
            {/* MENU END */}

            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                About
              </div>
              <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
                News
              </div>
              <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
                Careers
              </div>
              <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
                Investors
              </div>
              <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
                Sustainability
              </div>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-4 justify-center md:justify-start">
          <Link
            href="https://facebook.com"
            className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
          >
            <FaFacebookF size={20} />
          </Link>
          <Link
            href="https://twitter.com"
            className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
          >
            <FaTwitter size={20} />
          </Link>
          <Link
            href="https://youtube.com"
            className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
          >
            <FaYoutube size={20} />
          </Link>
          <Link
            href="https://instagram.com"
            className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
          >
            <FaInstagram size={20} />
          </Link>
        </div>
        {/* RIGHT END */}
      </div>
      <div className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
        {/* LEFT START */}
        <div className="text-[12px] text-black/75 hover:text-black cursor-pointer text-center md:text-left">
          © 2023 (company name), Inc. All Rights Reserved
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
            Guides
          </div>
          <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
            Terms of Sale
          </div>
          <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
            Terms of Use
          </div>
          <div className="text-[12px] text-black/75 hover:text-black cursor-pointer">
            Privacy Policy
          </div>
        </div>
        {/* RIGHT END */}
      </div>
    </footer>
  );
};

export default Footer;
