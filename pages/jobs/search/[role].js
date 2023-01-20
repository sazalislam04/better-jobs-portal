import React from "react";
import JobsDescription from "../../../components/JobsDescription";

const SearchJobs = ({ jobs, role }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {jobs?.length > 0 && (
        <>
          {jobs?.map((job) => (
            <JobsDescription key={job._id} job={job} />
          ))}
        </>
      )}
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
