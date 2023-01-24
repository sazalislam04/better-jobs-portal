import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaRupeeSign,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import externallink from "../public/external-link.png";

const JobsDetails = ({ job, setApplyJob }) => {
  const [dateDays, setDateDays] = useState();
  const [open, setOpen] = useState(false);
  const {
    active,
    company_name,
    domain,
    role,
    city,
    type_of_job,
    allows_work_from_home,
    is_night_shift,
    experience_required,
    min_monthly_salary,
    max_monthly_salary,
    number_of_openings,
    includes_incentives,
    minimum_education,
    assets_or_documents_required,
    preferred_skills,
    desc,
    approved,
    posted_by,
    interviewer_details,
    applicants,
    shortlisted,
    views,
    createdAt,
    updatedAt,
  } = job;

  let date_1 = new Date(createdAt);
  let date_2 = new Date();

  useEffect(() => {
    let difference = date_2.getTime() - date_1.getTime();
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    setDateDays(totalDays);
  }, []);

  const handleTooltip = () => {
    setOpen(!open);
  };

  return (
    <>
      <section className="py-4 px-4 md:px-6">
        <div className="">
          <div className="flex w-full gap-2">
            <div className="w-16 h-16 md:w-28 md:h-20 flex items-center justify-center rounded-md">
              <Image
                className="w-10 md:w-16 h-10 md:h-16 object-cover"
                src={`https://logo.clearbit.com/${company_name}.com`}
                alt="logo"
                height={120}
                width={120}
              />
            </div>
            <div className="w-full relative">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{role}</h2>
                  <p className="font-medium">{company_name}</p>
                </div>
                <button onClick={handleTooltip} className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>
                </button>
              </div>
              {/* tooltip */}
              {open && (
                <div className="mx-auto absolute md:-bottom-5 shadow border right-0 container w-48 px-3 py-3 bg-white rounded ">
                  <div className="flex gap-2">
                    <p className="text-sm mx-auto font-semibold leading-none text-gray-800">
                      Share this job
                    </p>
                  </div>
                  <div className=" text-xs mx-auto flex justify-evenly leading-none text-gray-600 pt-3 pb-2">
                    <button className="text-2xl text-blue-500">
                      <FaFacebookSquare />
                    </button>
                    <button className="text-2xl text-indigo-500">
                      <FaLinkedin />
                    </button>
                    <button className="text-2xl text-green-500">
                      <FaWhatsappSquare />
                    </button>
                    <button className="text-2xl text-cyan-500">
                      <FaTwitterSquare />
                    </button>
                  </div>
                </div>
              )}

              <div className="text-xs font-medium grid grid-cols-2 sm:grid-cols-3 md:gap-2 gap-4 lg:grid-cols-4 mt-4 text-gray-600 ">
                <p className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                    />
                  </svg>
                  {experience_required}
                </p>
                <p className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                    />
                  </svg>
                  {active && "Not Disclosed"}
                </p>
                <p className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                  {number_of_openings} vacancy
                </p>
                <p className="flex gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {city}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center  gap-5 mt-6">
            <p className="text-sm text-gray-400">posted {dateDays}d ago</p>
            <label
              onClick={() => {
                setApplyJob(job);
              }}
              htmlFor="apply-job"
              className="flex cursor-pointer items-center transition duration-300 gap-2 px-4 py-2 bg-[#037b8e] rounded-lg text-white"
            >
              <span>Apply Now</span>
              <Image src={externallink} width={18} height={18} alt="icon" />
            </label>
          </div>
        </div>
        <hr className="my-4" />
        {/* jobs role */}
        <div className="mt-3 bg-indigo-50 rounded p-4">
          <span className="font-semibold text-sm">Job Role Insights</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 text-sm text-gray-700 my-2">
            <li className="mr-4">Flexible Timing</li>
            <li>{is_night_shift ? "Night Shift" : "Day Shift"}</li>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                <FaRupeeSign />
              </span>
              <p>
                {min_monthly_salary} - {max_monthly_salary}
              </p>
            </div>
          </div>
          <div>
            <span className="text-gray-500 text-sm font-medium">
              Key skills for the job
            </span>
            <div className="grid grid-cols-3 mt-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {preferred_skills?.map((skill, i) => (
                <button
                  className="text-gray-700 py-1 rounded-full border bg-white text-sm"
                  key={i}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* jobs description */}
        <div className="my-6">
          <p className="font-medium">Job Description</p>
          <div className="border p-4 rounded my-3">
            <p className="text-sm font-medium text-gray-800">
              Roles and Responsibilities
            </p>
            <div>
              {/* {desc.length > 0 && (
          <>
            {desc?.map((details, i) => (
              <li key={i}>{details?.insert}</li>
            ))}
          </>
        )} */}
              ---------
            </div>
            <div>
              <p className="text-sm">Employment Type:</p> {type_of_job}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobsDetails;
