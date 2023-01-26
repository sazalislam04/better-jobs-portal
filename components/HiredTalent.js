import Image from "next/image";
import Link from "next/link";
import job from "../public/post-job.png";

const HiredTalent = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="lg:flex justify-between gap-4">
          <div className="lg:w-2/5">
            <h2 className="text-[34px] text-gray-700 mb-8 font-medium">
              Looking to hire talents <br className="hidden sm:flex" /> instead
              ?
            </h2>
            <li className="my-2">Post unlimited jobs for free</li>
            <li>Find candidates within 48 hours</li>
            <div className="mt-6">
              <Link href="https://uphire-webapp.web.app/login" target="_blank">
                <button className="mx-2 w-32 h-[46px] transition duration-300 rounded-lg border bg-[#037b8e] text-white hover:bg-[#036a7a]">
                  Post free job
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <Image src={job} alt="snap" width={"100%"} height={"100%"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiredTalent;
