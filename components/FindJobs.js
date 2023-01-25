import Image from "next/image";
import Link from "next/link";
import data from "../datalayer/findjobs";

const FindJobs = () => {
  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-[34px] text-gray-700 text-center font-medium">
          How to find perfect job ?
        </h2>
        <div className="flex flex-wrap justify-evenly mt-12 gap-4 py-6">
          {data.map((job) => (
            <div className="" key={job.id}>
              <Image src={job.img_url} alt="step" width={170} height={170} />
              <h3 className="text-center mt-2">{job.title}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link
            href="https://play.google.com/store/apps/details?id=com.betterjobs.app"
            target="_blank"
          >
            <button className="mx-2 w-32 h-[46px] transition duration-300 rounded-lg border bg-[#037b8e] text-white hover:bg-[#036a7a]">
              Download app
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FindJobs;
