import React from "react";
import { useQuery } from "react-query";
import JobsDescription from "../../../../components/JobsDescription";

const Job = ({ job, role }) => {
  // const DEFAULT_URL = "http://localhost:3000";
  const DEFAULT_URL = "https://better-jobs-portal.vercel.app";

  const { data: dynamicOthersJobs } = useQuery({
    queryKey: ["dynamicOthersJobs", role],
    queryFn: async () => {
      const res = await fetch(`${DEFAULT_URL}/api/jobs/?role=${role}`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      {job && (
        <JobsDescription
          job={job}
          dynamicOthersJobs={dynamicOthersJobs}
          roleJob={role}
        />
      )}
    </div>
  );
};

export default Job;

export async function getServerSideProps(context) {
  const BASE_URL = "https://better-jobs-portal.vercel.app";
  // const BASE_URL = "http://localhost:3000";
  const { params } = context;
  const { role } = params;

  const res = await fetch(`${BASE_URL}/api/jobs/${params.jobId}`);
  const data = await res.json();

  return {
    props: {
      job: data,
      role,
    },
  };
}
