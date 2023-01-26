import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import rupee from "../public/rupee.png";
import whatsapp from "../public/whatsapp.png";

const JobsCard = ({ job, jobrole, roleJob }) => {
  const [dateDays, setDateDays] = useState();
  const [minSalaryRange, setMinSalaryRange] = useState();
  const [maxSalaryRange, setMaxSalaryRange] = useState();
  const {
    company_name,
    city,
    experience_required,
    domain,
    active,
    type_of_job,
    createdAt,
    _id,
    role,
    min_monthly_salary,
    max_monthly_salary,
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
      <Link
        href={`/jobs/search/${
          jobrole ? jobrole : roleJob ? roleJob : role
        }/${_id}`}
      >
        <div className="px-6 py-4 h-52 relative bg-white rounded-md shadow mb-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-light text-gray-800 dark:text-gray-400">
              {createdAt?.slice(0, 10)}
            </p>
            <span className="px-3 flex items-center gap-1 py-1 text-xs text-indigo-900 uppercase bg-indigo-100 rounded-full">
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {type_of_job}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <Image
                className="w-8 h-8"
                src={`https://logo.clearbit.com/${company_name}.com`}
                alt="logo"
                height={40}
                width={40}
              />
              <div>
                <h3 className="mt-2 text-[14px] font-semibold text-gray-800">
                  {role}
                </h3>
                <p className="text-sm font-medium">{company_name} </p>
              </div>
            </div>

            <div className="flex items-center flex-wrap sm:grid sm:grid-cols-3 mt-2 text-[12px] font-medium text-gray-700 gap-3">
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
          <div className="flex gap-2 sm:gap-4 items-center mt-4 text-gray-700 ">
            <p className="text-xs font-medium text-gray-600">{dateDays}d ago</p>
            <p className="text-xs font-medium text-gray-600">
              via. betterjobs.com
            </p>
          </div>
        </div>
      </Link>
      <div className="absolute z-10 px-6">
        <div className="-mt-[75px] flex gap-2">
          <Link
            href="https://play.google.com/store/apps/details?id=com.betterjobs.app"
            target="_blank"
          >
            <button className="px-2 py-1 text-sm bg-[#037b8e] rounded text-white mt-3">
              Apply Now
            </button>
          </Link>
          <Link
            href={`https://api.whatsapp.com/send?text=https://better-jobs-portal.vercel.app/jobs/search/${
              jobrole ? jobrole : roleJob ? roleJob : role
            }/${_id}`}
            target="_blank"
          >
            <button className="px-2 flex items-center py-1 text-sm transition duration-300 gap-1 text-[#037b8e] hover:bg-[#037b8e] rounded hover:text-white mt-3">
              <Image src={whatsapp} alt="whatsapp" width={20} height={20} />
              Share
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default JobsCard;
