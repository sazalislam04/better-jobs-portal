import React from "react";
import JobsDescription from "../../../components/JobsDescription";

const AllJobs = ({ jobs }) => {
  return (
    <>
      {/* seo */}

      <div className="bg-gray-100 min-h-screen">
        {jobs?.length > 0 && <JobsDescription jobs={jobs} />}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const BASE_URL = "https://better-jobs-portal.vercel.app";
  //   const BASE_URL = "http://localhost:3000";
  const res = await fetch(`${BASE_URL}/api/alljobs`);
  const data = await res.json();

  return {
    props: {
      jobs: data,
    },
  };
}

export default AllJobs;
