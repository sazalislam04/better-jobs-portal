import React from "react";
import JobsDescription from "../../../components/JobsDescription";

const SearchJobs = ({ jobs, role }) => {
  return (
    <div className="bg-gray-50 h-screen">
      <JobsDescription jobs={jobs} role={role} />
    </div>
  );
};

export default SearchJobs;

export async function getServerSideProps(context) {
  const BASE_URL = "http://localhost:3000";

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
