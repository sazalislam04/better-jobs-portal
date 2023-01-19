import React from "react";
import JobsDescription from "../../../components/JobsDescription";

const AllJobs = ({ jobs }) => {
  return (
    <div>
      <JobsDescription jobs={jobs} />
    </div>
  );
};

export async function getServerSideProps() {
  const BASE_URL = "https://better-jobs-portal.vercel.app";
  const LOCAL_URL = "http://localhost:3000";

  const res = await fetch(`${BASE_URL}/api/jobs/`);
  const jobs = await res.json();

  return {
    props: {
      jobs,
    },
  };
}

export default AllJobs;
