import Link from "next/link";
import React from "react";
import Nav from "../components/Nav";

const Header = () => {
  return (
    <>
      <header className="py-4 custom-shadow flex justify-between">
        <nav className="hidden md:flex sticky top-0 items-center justify-between container mx-auto px-4">
          <div className="md:flex items-center gap-10 w-full">
            <h2 className="text-2xl font-medium">
              Better.<span className="text-indigo-500">Jobs</span>{" "}
            </h2>
            <ul className="flex my-4 md:my-0 gap-5">
              <li className="text-lg">
                <Link href="/">Jobs</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <button className="px-6 py-2 rounded-full border mr-5 focus:bg-indigo-50 transition duration-300 focus:ring-2 focus:ring-indigo-300 border-indigo-500">
              Login
            </button>
            <button className="px-6 py-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-indigo-50 focus:text-indigo-700 transition duration-300 rounded-full border bg-indigo-500 text-white ">
              Register
            </button>
          </div>
        </nav>
        <div className="md:hidden mx-2 sm:mx-4 md:mx-0 flex justify-end w-full">
          <Nav />
        </div>
      </header>
    </>
  );
};

export default Header;
