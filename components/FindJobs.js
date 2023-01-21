import Image from "next/image";
import Link from "next/link";
import data from "../datalayer/findjobs";

const FindJobs = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center font-medium">
          How to find perfect job ?
        </h2>
        <div className="flex justify-evenly mt-12 py-6">
          {data.map((job) => (
            <div className="" key={job.id}>
              <Image src={job.img_url} alt="" width={170} height={170} />
              <h3 className="text-center mt-2">{job.title}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="https://play.google.com/store/apps" target="_blank">
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
