import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import play from "../public/play.png";

const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="z-50 px-4 md:px-0 w-full">
      <div className="md:hidden flex justify-between">
        <div className="">
          <h2 className="text-xl font-medium">
            Better<span className="text-[#037b8e]">jobs</span>{" "}
          </h2>
        </div>
        <div>
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
      </div>
      {open && (
        <nav className="absolute my-2 bg-white rounded-lg  right-0 h-auto container">
          <ul className="relative">
            <li onClick={() => setOpen(false)} className="text-lg py-4">
              <Link
                className="px-2 py-1.5 transition mt-2 duration-300 rounded-lg border bg-[#037b8e] text-white hover:bg-[#036a7a]"
                href="/"
              >
                Jobs
              </Link>
            </li>
          </ul>
          <div className="mb-4">
            <Link
              href="https://play.google.com/store/apps/details?id=com.betterjobs.app"
              className="w-32"
              target="_blank"
            >
              <Image src={play} alt="playstore" width={100} height={100} />
            </Link>
            <Link href="https://employer.betterjobs.co/auth" target="_blank">
              <button className="px-2 py-1.5 transition mt-2 duration-300 rounded-lg border bg-[#037b8e] text-white hover:bg-[#036a7a]">
                For employers
              </button>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Nav;
