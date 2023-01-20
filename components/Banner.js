import Image from "next/image";
import Link from "next/link";
import mobile from "../public/mobile-show.png";
import play from "../public/play.png";

const Banner = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 lg:flex justify-between gap-10 items-center">
        <div className="lg:w-3/5">
          <div>
            <h1 className="text-6xl font-medium leading-[1.1]">
              BetterJobs - #1 professional job search platform
            </h1>
            <p className="text-lg py-4">
              We make it easy to find your dream job. Search and apply for jobs
              from 100+ cities and 1000+ companies.
            </p>
            <Link href="https://play.google.com/store/apps" target="_blank">
              <Image src={play} alt="" width={140} height={150} />
            </Link>
          </div>
        </div>
        <div className="lg:w-2/5">
          <div className="flex justify-center">
            <Image src={mobile} width={350} height={350} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;