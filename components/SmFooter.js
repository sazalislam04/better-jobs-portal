import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import play from "../public/play.png";

const SmFooter = () => {
  return (
    <footer className="bg-gray-100 pb-10 sm:hidden">
      <div className="container p-6 mx-auto">
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <p className="max-w-sm mt-2 text-gray-500">
                All rights reserved.
              </p>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="text-gray-800 font-medium text-lg">Links</h3>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.betterjobs.app"
                  className="block mt-2 text-sm text-gray-700 hover:text-gray-500 transition duration-300"
                >
                  download mobile app
                </Link>
                <Link
                  href="/career"
                  className="block mt-2 text-sm text-gray-700 hover:text-gray-500 transition duration-300"
                >
                  careers with us
                </Link>
                <Link
                  href="contact"
                  className="block mt-2 text-sm text-gray-700 hover:text-gray-500 transition duration-300"
                >
                  contact us
                </Link>
              </div>

              <div>
                <h3 className="text-gray-800 font-medium text-lg">Legal</h3>
                <Link
                  href="privacy"
                  className="block mt-2 text-sm text-gray-700 hover:text-gray-500 transition duration-300"
                >
                  privacy policy
                </Link>
                <Link
                  href="/userterms"
                  className="block mt-2 text-sm text-gray-700 hover:text-gray-500 transition duration-300"
                >
                  user terms & conditions
                </Link>
                <Link
                  href="employerterms"
                  className="block mt-2 text-sm text-gray-700 hover:text-gray-500 transition duration-300"
                >
                  employer terms of service
                </Link>
              </div>

              <div>
                <h3 className="text-gray-800 font-medium text-lg">Resources</h3>
                <Link
                  href="/blog"
                  className="block mt-2 text-sm text-gray-700 hover:text-gray-500 transition duration-300"
                >
                  blog
                </Link>
                <Link
                  href="sitemap"
                  className="block mt-2 text-sm text-gray-700 hover:text-gray-500 transition duration-300"
                >
                  sitemap
                </Link>
              </div>

              <div className="flex mt-2 gap-4">
                <Link href="https://twitter.com/">
                  <FaTwitter className="text-cyan-500 hover:text-cyan-600 transition duration-300 text-xl" />
                </Link>
                <Link href="https://www.linkedin.com/">
                  <FaLinkedinIn className="text-sky-500 hover:text-sky-600 transition duration-300 text-xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-gray-200 border-none" />

        <div className="flex justify-between">
          <div className="sm:flex gap-4 items-center">
            <Link
              href="https://play.google.com/store/apps/details?id=com.betterjobs.app"
              className="w-32 h-[50px]"
              target="_blank"
            >
              <Image src={play} alt="playstore" width={100} height={100} />
            </Link>
            <Link href="https://employer.betterjobs.co/auth" target="_blank">
              <button className="sm:mx-2 w-24 h-[36px] text-xs transition duration-300 rounded-lg border bg-[#037b8e] text-white hover:bg-[#036a7a]">
                For employers
              </button>
            </Link>
          </div>
          <div className="mt-6 flex ml-3 sm:ml-0 flex-wrap gap-3">
            <small className="text-gray-400">reach@betterjobs.co </small>
            <small className="text-gray-400">Privacy Policy</small>
            <small className="text-gray-400">Terms of Service</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SmFooter;
