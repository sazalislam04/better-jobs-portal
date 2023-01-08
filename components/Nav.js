import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="container mx-auto">
      <div className="md:hidden w-full flex items-center  justify-between">
        <div>
          <h2 className="text-2xl font-medium">
            Better.<span className="text-indigo-500">Jobs</span>{" "}
          </h2>
        </div>
        <button className={`md:hidden`} onClick={() => setOpen(!open)}>
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <nav className="absolute mt-1 w-full  left-1/2 translate-x-[-50%] container mx-auto bg-gray-50">
          <ul className="relative">
            <li className="text-lg bg-gray-100 p-4">
              <Link href="/">Jobs</Link>
            </li>
          </ul>
          <div className="mt-4 p-4">
            <button className="px-6 py-2 rounded-full border mr-5 focus:bg-indigo-50 transition duration-300 focus:ring-2 focus:ring-indigo-300 border-indigo-500">
              Login
            </button>
            <button className="px-6 py-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-indigo-50 focus:text-indigo-700 transition duration-300 rounded-full border bg-indigo-500 text-white ">
              Register
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Nav;
