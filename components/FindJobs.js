/* eslint-disable @next/next/no-img-element */
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
              <img src={job.img_url} alt="" width={170} height={170} />
              <h3 className="text-center mt-2">{job.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindJobs;
