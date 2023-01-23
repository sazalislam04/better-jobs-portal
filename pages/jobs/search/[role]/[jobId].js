import { NextSeo } from "next-seo";
import React from "react";
import { useQuery } from "react-query";
import JobsDescription from "../../../../components/JobsDescription";

const Job = ({ job, role }) => {
  // const DEFAULT_URL = "http://localhost:3000";
  const DEFAULT_URL = "https://better-jobs-portal.vercel.app";

  const { createdAt, updatedAt, company_name, _id } = job;

  const { data: dynamicOthersJobs } = useQuery({
    queryKey: ["dynamicOthersJobs", role],
    queryFn: async () => {
      const res = await fetch(`${DEFAULT_URL}/api/jobs/?role=${role}`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <>
      {/* seo */}
      <NextSeo
        title={`Better jobs | Apply for ${job?.role} in ${company_name}`}
        description={`Apply for ${job.role} Job in ${company_name} at ${job.city} on Betterjobs app. ✔️ Salary: ${job.min_monthly_salary} - ${job.max_monthly_salary} ₹`}
        canonical={`https://better-jobs-portal.vercel.app/jobs/search/${role}/${job._id}`}
        openGraph={{
          type: "job",
          job: {
            publishedTime: { createdAt },
            modifiedTime: { updatedAt },
          },
          url: `https://better-jobs-portal.vercel.app/jobs/search/${role}/${_id}`,
          images: {
            url: "https://i.ibb.co/B4GcqFV/meta-image.png",
            width: 900,
            height: 800,
            alt: "logo",
            type: "image/png",
          },
          site_name: "Better jobs",
        }}
        twitter={{
          handle: `https://better-jobs-portal.vercel.app/jobs/search/${role}/${job._id}`,
          site: `https://better-jobs-portal.vercel.app/jobs/search/${role}/${job._id}`,
          cardType: "summary_large_image",
          title: `Apply for ${job?.role} Job  in ${company_name} at ${job.city}, on Betterjobs app. ✔️ Salary: ${job.min_monthly_salary} - ${job.max_monthly_salary} ₹`,
        }}
      />
      <div className="bg-gray-100 min-h-screen">
        {job && (
          <JobsDescription
            job={job}
            dynamicOthersJobs={dynamicOthersJobs}
            roleJob={role}
          />
        )}
      </div>
    </>
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
