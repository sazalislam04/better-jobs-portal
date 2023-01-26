import Image from "next/image";
import Link from "next/link";
import mobile from "../public/mobile-show.png";
import play from "../public/play.png";

const Banner = () => {
  return (
    <section className="py-10">
      <div className="container lg:flex justify-between gap-10 items-center">
        <div className="lg:w-3/5">
          <div>
            <h1 className="md:text-left text-center text-4xl md:text-[58px] font-medium text-gray-700 leading-tight">
              BetterJobs - #1 professional job search platform
            </h1>
            <p className="text-lg lg:w-3/4 leading-relaxed mt-2 text-center md:text-left py-4">
              We make it easy to find your dream job. Search and apply for jobs
              from 100+ cities and 1000+ companies.
            </p>
            <div className="flex lg:justify-start justify-center my-4 md:my-0">
              <Link
                href="https://play.google.com/store/apps/details?id=com.betterjobs.app"
                target="_blank"
              >
                <Image src={play} alt="betterjobs" width={120} height={120} />
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:w-2/5">
          <div className="flex justify-center">
            <Image src={mobile} width={350} height={350} alt="mobile" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
