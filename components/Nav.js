import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import play from "../public/play.png";

const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="z-50 px-4 sticky top-0 md:px-0 w-full">
      <div className="md:hidden flex justify-between">
        <div className="">
          <Link href="/">
            <h2 className="text-xl font-medium">
              Better<span className="text-[#037b8e]">Jobs</span>{" "}
            </h2>
          </Link>
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
        <nav className="absolute my-3 bg-white rounded-lg  right-0 h-40 container">
          <div className="mb-4 flex justify-center items-center flex-col">
            <Link
              href="https://play.google.com/store/apps/details?id=com.betterjobs.app"
              target="_blank"
            >
              <Image src={play} alt="playstore" width={130} height={130} />
            </Link>
            <Link href="https://employer.betterjobs.co/auth" target="_blank">
              <button className="px-[13px] py-[10px] transition mt-2 duration-300 rounded-lg border bg-[#037b8e] text-white hover:bg-[#036a7a]">
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
