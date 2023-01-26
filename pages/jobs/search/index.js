import { NextSeo } from "next-seo";
import React from "react";
import JobsDescription from "../../../components/JobsDescription";

const AllJobs = ({ jobs }) => {
  return (
    <>
      {/* seo */}

      <NextSeo
        title={`BetterJobs | Apply for your dream jobs`}
        description={`Apply for jobs on Betterjobs app.`}
        canonical={`https://better-jobs-portal.vercel.app/jobs/search`}
        openGraph={{
          type: "job",
          url: `https://better-jobs-portal.vercel.app/jobs/search`,
          images: [
            {
              url: "https://i.ibb.co/B4GcqFV/meta-image.png",
              width: 900,
              height: 800,
              alt: "logo",
            },
          ],
          site_name: "Betterjobs",
        }}
        twitter={{
          handle: `https://better-jobs-portal.vercel.app/jobs/search`,
          site: `https://better-jobs-portal.vercel.app/jobs/search`,
          cardType: "summary_large_image",
          title: `Apply for job on Betterjobs app.`,
        }}
      />

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
