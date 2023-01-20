import React from "react";
import JobsDescription from "../../../../components/JobsDescription";

const Job = ({ dynamicjob }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <JobsDescription dynamicjob={dynamicjob} />
    </div>
  );
};

export default Job;

export async function getServerSideProps(context) {
  const BASE_URL = "https://better-jobs-portal.vercel.app";
  // const BASE_URL = "http://localhost:3000";

  const { params } = context;

  const res = await fetch(`${BASE_URL}/api/jobs/${params.jobId}`);
  const data = await res.json();

  return {
    props: {
      dynamicjob: data,
    },
  };
}
