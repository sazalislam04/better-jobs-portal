import Link from "next/link";
import React, { useEffect, useState } from "react";

const SearchJobsCard = ({ job }) => {
  const [dateDays, setDateDays] = useState();
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
  } = job;

  let date_1 = new Date(createdAt);
  let date_2 = new Date();

  useEffect(() => {
    let difference = date_2.getTime() - date_1.getTime();
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    setDateDays(totalDays);
  }, []);

  return (
    <>
      <Link href={`/jobs/search/${role}/${_id}`}>
        <div className="px-6 py-4 bg-white rounded-md shadow mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-800 dark:text-gray-400">
              {createdAt.slice(0, 10)}
            </span>
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
            <h1 className="mt-2 text-lg font-semibold text-gray-800">
              {company_name}
            </h1>
            <span className="text-sm">{role}</span>
            <div className="mt-2 text-xs flex justify-between text-gray-600 ">
              <span className="flex gap-1 bg-gray-100 p-1 px-2 rounded-full items-center">
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
              </span>
              <span className="flex gap-1 bg-gray-100 p-1 px-2 rounded-full items-center">
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
              </span>
              <span className="flex gap-1 bg-gray-100 p-1 px-2 rounded-full items-center">
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
              </span>
            </div>
          </div>
          <div className="flex gap-4 items-center mt-4 text-gray-700 ">
            <span className="text-xs text-gray-400">{dateDays}d ago</span>
            <span className="text-xs text-gray-400">via. betterjobs.com</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchJobsCard;