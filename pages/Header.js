import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";
import play from "../public/play.png";

const Header = () => {
  return (
    <>
      <header className="py-4 custom-shadow flex justify-between">
        <nav className="hidden md:flex items-center justify-between container mx-auto px-4">
          <div className="md:flex items-center gap-10 w-full">
            <h2 className="text-2xl font-medium">
              Better<span className="text-[#037b8e]">jobs</span>{" "}
            </h2>
            <ul className="flex my-4 md:my-0 gap-5">
              <li className="text-lg">
                <Link href="/">Jobs</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <Link
              href="https://play.google.com/store/apps"
              className="w-32 h-[50px]"
              target="_blank"
            >
              <Image src={play} alt="" width={150} height={130} />
            </Link>
            <Link href="https://employer.betterjobs.co/auth" target="_blank">
              <button className="mx-2 w-32 h-[46px] transition duration-300 rounded-lg border bg-[#037b8e] text-white hover:bg-[#036a7a]">
                For employers
              </button>
            </Link>
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
