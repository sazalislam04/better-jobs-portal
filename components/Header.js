import Image from "next/image";
import Link from "next/link";
import play from "../public/play.png";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      <header className="py-4 sticky top-0 bg-white z-50 shadow flex justify-between">
        <nav className="hidden md:flex items-center justify-between container">
          <div className="md:flex items-center gap-10 w-full">
            <Link href="/">
              <h2 className="text-xl font-medium">
                Better<span className="text-[#037b8e]">Jobs</span>{" "}
              </h2>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="https://play.google.com/store/apps/details?id=com.betterjobs.app"
              className="w-32 h-[50px]"
              target="_blank"
            >
              <Image src={play} alt="playstore" width={120} height={120} />
            </Link>
            <Link href="https://employer.betterjobs.co/auth" target="_blank">
              <button className="mx-2 w-32 h-[44px] transition duration-300 rounded-lg border bg-[#037b8e] text-white hover:bg-[#036a7a]">
                For employers
              </button>
            </Link>
          </div>
        </nav>
        <div className="md:hidden sticky  sm:mx-4 md:mx-0 flex justify-end w-full">
          <Nav />
        </div>
      </header>
    </>
  );
};

export default Header;
