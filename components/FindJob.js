import Image from "next/image";
import React from "react";
import chat from "../public/2.JPG";
import hired from "../public/hired.jpeg";
import profile from "../public/profile.jpeg";

const FindJob = () => {
  const findjob = [
    {
      id: 1,
      step: "step 1",
      title: "Build your profile",
      img: profile,
    },
    {
      id: 2,
      step: "step 2",
      title: "Chat with recruiters",
      img: chat,
    },
    {
      id: 3,
      step: "step 3",
      title: "Get hired",
      img: hired,
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center font-medium">
          How to find perfect job ?
        </h2>
        <div className="flex justify-evenly mt-12 py-6">
          {findjob.map((job) => {
            return (
              <div className="" key={job.id}>
                <Image src={job.img} alt="" width={170} height={170} />
                <h3 className="text-center mt-2">{job.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FindJob;
