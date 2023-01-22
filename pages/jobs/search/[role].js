import Link from "next/link";
import React from "react";
import JobsDescription from "../../../components/JobsDescription";

const SearchJobs = ({ jobs, role }) => {
  if (!jobs?.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="border h-72 w-1/2 rounded-lg custom-shadow">
          <div className="flex items-center justify-center flex-col mt-10">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-14 h-14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </span>
            <div className="flex items-center justify-center flex-col mt-2">
              <h2 className="text-xl">
                Job Not Found For <span className="text-2xl">{role}</span>
              </h2>
              <p className="mt-1 text-lg">Please Search Another</p>
              <Link href="/">
                <button className="px-4 py-2 text-white mt-4 bg-[#037b8e] rounded-md">
                  Got to home page
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {jobs?.length > 0 && <JobsDescription jobs={jobs} role={role} />}
    </div>
  );
};

export default SearchJobs;

export async function getServerSideProps(context) {
  const BASE_URL = "https://better-jobs-portal.vercel.app";

  const { params } = context;
  const { role } = params;

  const res = await fetch(`${BASE_URL}/api/jobs?role=${role}`);
  const data = await res.json();
  return {
    props: {
      jobs: data,
      role,
    },
  };
}
