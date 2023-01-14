import React from "react";
import JobsDescription from "../../../components/JobsDescription";

const SearchJobs = ({ jobs, role }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <JobsDescription jobs={jobs} role={role} />
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
