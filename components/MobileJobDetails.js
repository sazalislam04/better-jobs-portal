import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import externallink from "../public/external-link.png";
import rupee from "../public/rupee.png";

const MobileJobDetails = ({ job, setApplyJob }) => {
  const [dateDays, setDateDays] = useState();
  const [minSalaryRange, setMinSalaryRange] = useState();
  const [maxSalaryRange, setMaxSalaryRange] = useState();
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
  useEffect(() => {
    if (min_monthly_salary) {
      const slaryRange =
        Math.abs(min_monthly_salary) > 999
          ? Math.sign(min_monthly_salary) *
              (Math.abs(min_monthly_salary) / 1000).toFixed(1) +
            "k"
          : Math.sign(min_monthly_salary) * Math.abs(min_monthly_salary);
      setMinSalaryRange(slaryRange);
    }
    if (max_monthly_salary) {
      const slaryRange =
        Math.abs(max_monthly_salary) > 999
          ? Math.sign(max_monthly_salary) *
              (Math.abs(max_monthly_salary) / 1000).toFixed(1) +
            "k"
          : Math.sign(max_monthly_salary) * Math.abs(max_monthly_salary);
      setMaxSalaryRange(slaryRange);
    }
  }, [min_monthly_salary, max_monthly_salary]);

  return (
    <>
      <section className="py-4 px-4">
        <div className="">
          <div className="mx-auto w-full gap-2">
            <div className="w-28 h-20 mb-6 -mt-10 rounded-lg flex items-center justify-center mx-auto shadow">
              <Image
                className="w-16 h-16 mx-auto object-cover"
                src={`https://logo.clearbit.com/${company_name}.com`}
                alt="logo"
                height={120}
                width={120}
              />
            </div>
            <div className="w-full relative">
              <div className="flex justify-center text-center text-2xl">
                <div>
                  <h2 className="text-3xl font-semibold">{role}</h2>
                  <p className="font-medium">{company_name}</p>
                </div>
              </div>

              <div className="text-xs sm:text-md font-medium flex flex-wrap justify-center gap-3 mt-4 text-gray-700 ">
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
                <p className="flex items-center">
                  <Image src={rupee} alt="currency" width={14} height={14} />
                  {minSalaryRange} - {maxSalaryRange}
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

          <div className="flex justify-end items-center gap-5 mt-6">
            <p className="text-sm text-gray-600">posted {dateDays}d ago</p>
            <label
              onClick={() => {
                setApplyJob(job);
              }}
              htmlFor="apply-job"
              className="flex cursor-pointer items-center transition duration-300 gap-2 px-2 md:px-4 py-2 bg-[#037b8e] rounded-lg text-white"
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
          <div className="sm:text-md flex gap-1 flex-wrap gap-y-1 text-sm text-gray-800 my-2">
            <ul className="flex gap-8 mx-4 items-center list-disc">
              <li className="">Flexible Timing</li>
              <li>{is_night_shift ? "Night Shift" : "Day Shift"}</li>
            </ul>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">
                <FaRupeeSign />
              </span>
              <p>
                {min_monthly_salary} - {max_monthly_salary}
              </p>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">
              Key skills for the job
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {preferred_skills?.map((skill, i) => (
                <button
                  className="text-gray-800 py-1 px-3 rounded-full border bg-white text-sm"
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

export default MobileJobDetails;
