import { Inter } from "@next/font/google";
import { NextSeo } from "next-seo";
import Banner from "../components/Banner";
import Features from "../components/Features";
import FindJobs from "../components/FindJobs";
import HiredTalent from "../components/HiredTalent";
import JobsPage from "./JobsPage";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="/logo"></meta>
      </Head> */}
      <NextSeo
        title="BetterJobs | Your future starts here"
        description="Search Your Dream Jobs"
        keywords={["nextjs", "betterjobs", "jobs", "boilerplate"]}
        icon="/favicon.ico"
      />
      <div>
        <Banner />
        <FindJobs />
        <JobsPage />
        <Features />
        <HiredTalent />
      </div>
    </>
  );
}
