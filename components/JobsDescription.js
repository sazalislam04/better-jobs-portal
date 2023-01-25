import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import { useQuery } from "react-query";
import experiences from "../datalayer/experienceLevel";
import locations from "../datalayer/locations";
import jobroles from "../datalayer/roles";
import employments from "../datalayer/workTypes";
import ApplyModal from "./ApplyModal";
import JobsCard from "./JobsCard";
import JobsDetails from "./JobsDetails";
import Loading from "./Loading/Loading";
import MobileJobDetails from "./MobileJobDetails";

import externallink from "../public/external-link.png";
import SmFooter from "./SmFooter";

// job type
const jobsType = ["Both", "On-site", "Remote"];

const JobsDescription = ({
  jobs,
  job,
  jobrole,
  dynamicOthersJobs,
  roleJob,
}) => {
  const [onLocation, setOnLocation] = useState(false);
  const [locationState, setLocationState] = useState("Location");
  const [locationData, setLocationData] = useState(locations);
  const [onExperience, setOnExperience] = useState(false);
  const [experienceState, setExperienceState] = useState("Experience");
  const [experienceData, setExperienceData] = useState(experiences);
  const [onEmployement, setOnEmployement] = useState(false);
  const [employementState, setEmployementState] = useState("Employment Type");
  const [employmentData, setEmploymentData] = useState(employments);
  const [searchJobs, setSearchJobs] = useState();
  const [searchResult, setSearchResult] = useState();
  const [searchBox, setSearchBox] = useState(false);
  // search jobs
  const [remote, setRemote] = useState(false);
  const [remoteResult, setRemoteResult] = useState("Job Type");
  const [remoteData, setRemoteData] = useState(jobsType);

  const [applyJob, setApplyJob] = useState(null);

  const [filterByData, setFilterByData] = useState();

  const [combineFilterJobs, setCombineFilterJobs] = useState();

  const [dynamicRemainingJobs, setDynamicRemainingJobs] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [counter, setCounter] = useState(0);
  const [openClearBtn, setOpenClearBtn] = useState(false);

  const [responsive, setResponsive] = useState(true);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  const BASE_URL = "https://better-jobs-portal.vercel.app";
  // const BASE_URL = "http://localhost:3000";

  let domain = "";
  if (jobs?.length > 0) {
    domain = jobs[0]?.domain;
  } else if (dynamicOthersJobs?.length > 0) {
    domain = dynamicOthersJobs[0]?.domain;
  } else {
    domain = job?.domain;
  }

  const { data: matchingJobs } = useQuery({
    queryKey: ["matchingJobs", domain],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/jobs/?domain=${domain}`);
      const data = await res.json();
      if (data) {
        const filterByDomain = data?.filter(
          (domainjobs) => domainjobs?.role !== jobrole
        );
        setFilterByData(filterByDomain);
      }
      return data;
    },
  });

  // filter dynamicdata
  useEffect(() => {
    if (roleJob) {
      const filterByDomain = matchingJobs?.filter(
        (domainjobs) => domainjobs?.role !== roleJob
      );
      setDynamicRemainingJobs(filterByDomain);
    }
  }, [matchingJobs, roleJob]);

  // all filter
  useEffect(() => {
    if (
      locationState === "Location" &&
      experienceState === "Experience" &&
      employementState === "Employment Type" &&
      remoteResult === "Job Type"
    ) {
      return setCombineFilterJobs();
    }
    // remote
    if (
      locationState === "Location" &&
      experienceState === "Experience" &&
      employementState === "Employment Type" &&
      remoteResult !== "Job Type"
    ) {
      const result = matchingJobs?.filter(
        (job) => job.allows_work_from_home === true
      );
      return setCombineFilterJobs(result);
    }
    if (
      locationState !== "Location" &&
      experienceState === "Experience" &&
      employementState === "Employment Type" &&
      remoteResult !== "Job Type"
    ) {
      const result = matchingJobs?.filter(
        (job) =>
          job.city === locationState && job.allows_work_from_home === true
      );
      return setCombineFilterJobs(result);
    }

    if (
      locationState === "Location" &&
      experienceState !== "Experience" &&
      employementState === "Employment Type" &&
      remoteResult !== "Job Type"
    ) {
      const result = matchingJobs?.filter(
        (job) =>
          job.experience_required === experienceState &&
          job.allows_work_from_home === true
      );
      return setCombineFilterJobs(result);
    }

    if (
      locationState === "Location" &&
      experienceState === "Experience" &&
      employementState !== "Employment Type" &&
      remoteResult !== "Job Type"
    ) {
      const result = matchingJobs?.filter(
        (job) =>
          job.type_of_job === employementState &&
          job.allows_work_from_home === true
      );
      return setCombineFilterJobs(result);
    }
    if (
      locationState !== "Location" &&
      experienceState !== "Experience" &&
      employementState !== "Employment Type" &&
      remoteResult !== "Job Type"
    ) {
      const result = matchingJobs?.filter(
        (job) =>
          job.allows_work_from_home === true &&
          job.city === locationState &&
          job.experience_required === experienceState &&
          job.type_of_job === employementState
      );
      return setCombineFilterJobs(result);
    }
    if (
      locationState !== "Location" &&
      experienceState !== "Experience" &&
      employementState === "Employment Type" &&
      remoteResult !== "Job Type"
    ) {
      const result = matchingJobs?.filter(
        (job) =>
          job.allows_work_from_home === true &&
          job.city === locationState &&
          job.experience_required === experienceState
      );
      return setCombineFilterJobs(result);
    }
    if (
      locationState !== "Location" &&
      experienceState === "Experience" &&
      employementState !== "Employment Type" &&
      remoteResult !== "Job Type"
    ) {
      const result = matchingJobs?.filter(
        (job) =>
          job.allows_work_from_home === true &&
          job.city === locationState &&
          job.type_of_job === employementState
      );
      return setCombineFilterJobs(result);
    }
    if (
      locationState === "Location" &&
      experienceState !== "Experience" &&
      employementState !== "Employment Type" &&
      remoteResult !== "Job Type"
    ) {
      const result = matchingJobs?.filter(
        (job) =>
          job.allows_work_from_home === true &&
          job.experience_required === experienceState &&
          job.type_of_job === employementState
      );
      return setCombineFilterJobs(result);
    }

    // ****

    if (
      locationState === "Location" &&
      experienceState === "Experience" &&
      employementState !== "Employment Type"
    ) {
      const result = matchingJobs?.filter(
        (job) => job.type_of_job === employementState
      );
      return setCombineFilterJobs(result);
    }

    if (
      experienceState === "Experience" &&
      employementState === "Employment Type"
    ) {
      const result = matchingJobs?.filter((job) => job.city === locationState);
      return setCombineFilterJobs(result);
    }
    if (
      locationState === "Location" &&
      experienceState !== "Experience" &&
      employementState !== "Employment Type"
    ) {
      const result = matchingJobs?.filter(
        (job) =>
          job.experience_required === experienceState &&
          job.type_of_job === employementState
      );
      return setCombineFilterJobs(result);
    }
    if (locationState && experienceState === "Experience" && employementState) {
      const result = matchingJobs?.filter(
        (job) =>
          job.city === locationState && job.type_of_job === employementState
      );
      return setCombineFilterJobs(result);
    }
    if (
      locationState !== "Location" &&
      experienceState !== "Experience" &&
      employementState !== "Employment Type"
    ) {
      const result = matchingJobs?.filter(
        (job) =>
          job.city === locationState &&
          job.experience_required === experienceState &&
          job.type_of_job === employementState
      );
      return setCombineFilterJobs(result);
    }
    if (
      locationState === "Location" &&
      experienceState !== "Experience" &&
      employementState === "Employment Type"
    ) {
      const result = matchingJobs?.filter(
        (job) => job.experience_required === experienceState
      );
      return setCombineFilterJobs(result);
    }

    if (
      locationState !== "Location" &&
      experienceState === "Experience" &&
      employementState === "Employment Type"
    ) {
      const result = matchingJobs?.filter((job) => job.city === locationState);
      return setCombineFilterJobs(result);
    }

    if (locationState && experienceState) {
      const result = matchingJobs?.filter(
        (job) =>
          job.city === locationState &&
          job.experience_required === experienceState
      );
      return setCombineFilterJobs(result);
    }
  }, [
    matchingJobs,
    locationState,
    experienceState,
    employementState,
    remoteResult,
  ]);

  const clearLocationBtn = () => {
    setLocationState("Location");
    setOnLocation(false);
    setCounter(counter - 1);
  };

  const handleLocation = (e) => {
    setOnLocation(!onLocation);
    setOnExperience(false);
    setOnEmployement(false);
    setRemote(false);
  };
  //   searrch location
  const handleSearchLocation = (e) => {
    if (e.target.value) {
      const searchLocation = locations.filter((location) =>
        location.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setLocationData(searchLocation);
    } else {
      const remaining = locations.filter(
        (location) => location !== e.target.value
      );
      setLocationData(remaining);
    }
  };

  // experience state
  const clearExperienceBtn = () => {
    setExperienceState("Experience");
    setOnExperience(false);
    setCounter(counter - 1);
  };

  const handleExperience = () => {
    setOnExperience(!onExperience);
    setOnLocation(false);
    setOnEmployement(false);
    setRemote(false);
  };
  //  search experience
  const handleSearchExperience = (e) => {
    if (e.target.value) {
      const searchExp = experiences.filter((exp) =>
        exp.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setExperienceData(searchExp);
    } else {
      const remaining = employments.filter((exp) => exp !== e.target.value);
      setExperienceData(remaining);
    }
  };

  //   Employment type state
  const clearEmploymentState = () => {
    setEmployementState("Employment Type");
    setOnEmployement(false);
    setCounter(counter - 1);
  };
  const handleEmployment = () => {
    setOnEmployement(!onEmployement);
    setOnLocation(false);
    setOnExperience(false);
    setRemote(false);
  };
  //   search employment
  const handleSearchEmployment = (e) => {
    if (e.target.value) {
      const searchEmp = employments.filter((employment) =>
        employment.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setEmploymentData(searchEmp);
    } else {
      const remaining = employments.filter(
        (employment) => employment !== e.target.value
      );
      setEmploymentData(remaining);
    }
  };

  //   muster handleSearch button
  const handleSearchJobs = (e) => {
    setSearchBox(!searchBox);
    setSearchResult(e.target.value);

    if (e.target.value) {
      const filterByJobs = jobroles.filter((role) =>
        role.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchJobs(filterByJobs);
    } else {
      const remaining = jobroles.filter((role) => role !== e.target.value);
      setSearchJobs(remaining);
    }
  };

  // job type
  const handleJobType = (e) => {
    setRemote(!remote);
    setOnEmployement(false);
    setOnLocation(false);
    setOnExperience(false);
  };
  const handleSearchType = (e) => {
    if (e.target.value) {
      const searchType = jobsType.filter((type) =>
        type.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setRemoteData(searchType);
    } else {
      const remaining = jobsType.filter((type) => type !== e.target.value);
      setRemoteData(remaining);
    }
  };

  const handleCloseRemote = () => {
    setRemoteResult("Job Type");
    setRemote(false);
    setCounter(counter - 1);
  };

  // close all btn
  const handleClose = () => {
    if (locationState) {
      setOnLocation(false);
    }
    if (remote) {
      setRemote(false);
    }
    if (onEmployement) {
      setOnEmployement(false);
    }

    if (onExperience) {
      setOnExperience(false);
    }
    if (searchBox) {
      setSearchBox(false);
    }
  };

  // get remote jobs
  const handleRemote = (type) => {
    setRemoteResult(type);
  };

  // search jobs
  const handleJobsSearch = async (e) => {
    e.preventDefault();
    if (searchResult) {
      const res = await fetch(`${BASE_URL}/api/jobs?role=${searchResult}`);
      const data = await res.json();
      if (data[0]?.role === searchResult) {
        router.push(`/jobs/search/${searchResult}`);
      } else {
        return alert(`Jobs not available for ${searchResult}`);
      }
    } else {
      const res = await fetch(`${BASE_URL}/api/alljobs`);
      const data = await res.json();
      if (data) {
        const alljobs = data.filter((job) => !filterByData.includes(job));
        setFilterByData(alljobs);
      }
    }
  };

  const handleClearAllFilter = () => {
    if (locationState) {
      setLocationState("Location");
      setOnLocation(false);
      setCounter(0);
      setOpenClearBtn(false);
    }
    if (experienceState) {
      setExperienceState("Experience");
      setOnExperience(false);
      setCounter(0);
      setOpenClearBtn(false);
    }
    if (employementState) {
      setEmployementState("Employment Type");
      setOnEmployement(false);
      setCounter(0);
      setOpenClearBtn(false);
    }
    if (remoteResult) {
      setRemoteResult("Job Type");
      setRemote(false);
      setCounter(0);
      setOpenClearBtn(false);
    }
  };

  // counter
  useEffect(() => {
    if (locationState !== "Location" && counter === 0) {
      setCounter(counter + 1);
      setOpenClearBtn(true);
    } else if (
      locationState !== "Location" &&
      experienceState !== "Experience" &&
      counter === 1
    ) {
      setCounter(counter + 1);
    } else if (
      locationState !== "Location" &&
      employementState !== "Employment Type" &&
      counter === 1
    ) {
      setCounter(counter + 1);
    } else if (
      locationState !== "Location" &&
      remoteResult !== "Job Type" &&
      counter === 1
    ) {
      setCounter(counter + 1);
    } else if (
      experienceState !== "Experience" &&
      employementState !== "Employment Type" &&
      counter === 1
    ) {
      setCounter(counter + 1);
    } else if (
      employementState !== "Employment Type" &&
      remoteResult !== "Job Type" &&
      counter === 1
    ) {
      setCounter(counter + 1);
    } else if (
      employementState !== "Employment Type" &&
      remoteResult !== "Job Type" &&
      experienceState !== "Experience" &&
      counter === 2
    ) {
      setCounter(counter + 1);
    } else if (
      employementState !== "Employment Type" &&
      remoteResult !== "Job Type" &&
      experienceState !== "Experience" &&
      locationState !== "Location" &&
      counter === 3
    ) {
      setCounter(counter + 1);
    } else if (
      employementState !== "Employment Type" &&
      experienceState !== "Experience" &&
      locationState !== "Location" &&
      counter === 2
    ) {
      setCounter(counter + 1);
    } else if (
      remoteResult !== "Job Type" &&
      experienceState !== "Experience" &&
      locationState !== "Location" &&
      counter === 2
    ) {
      setCounter(counter + 1);
    } else if (
      remoteResult !== "Job Type" &&
      employementState !== "Employment Type" &&
      locationState !== "Location" &&
      counter === 2
    ) {
      setCounter(counter + 1);
    } else if (
      remoteResult !== "Job Type" &&
      experienceState !== "Experience" &&
      counter === 1
    ) {
      setCounter(counter + 1);
    }
    // single add
    if (experienceState !== "Experience" && counter === 0) {
      setCounter(counter + 1);
      setOpenClearBtn(true);
    }
    if (employementState !== "Employment Type" && counter === 0) {
      setCounter(counter + 1);
      setOpenClearBtn(true);
    }
    if (remoteResult !== "Job Type" && counter === 0) {
      setCounter(counter + 1);
      setOpenClearBtn(true);
    }
  }, [locationState, experienceState, counter, employementState, remoteResult]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const handleTooltip = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let scrollTop = window.scrollY;
    window.addEventListener("scroll", () => {
      if (scrollTop < window.scrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);

  return (
    <>
      <div className={`lg:hidden w-full`}>
        {/* details */}
        <div
          className={`w-full absolute top-0 z-50 bg-white shadow rounded-md pt-5 ${
            responsive ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-between items-center px-4">
            <button
              onClick={() => setResponsive(false)}
              className="flex items-center font-medium"
            >
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>
              </span>{" "}
              Job details
            </button>
            <div>
              <button onClick={handleTooltip} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  />
                </svg>
              </button>
              {/* tooltip */}
              {open && (
                <div className="mx-auto z-10 absolute md:-bottom-5 shadow border right-0 container h-32 py-3 bg-white rounded ">
                  <div className="flex mt-8">
                    <p className="text-lg mx-auto font-semibold leading-none text-gray-800">
                      Share this job
                    </p>
                  </div>
                  <div className=" text-xs mx-auto flex justify-evenly leading-none text-gray-600 pt-3 pb-2">
                    <button className="text-2xl text-blue-500">
                      <FaFacebookSquare />
                    </button>
                    <button className="text-2xl text-indigo-500">
                      <FaLinkedin />
                    </button>
                    <button className="text-2xl text-green-500">
                      <FaWhatsappSquare />
                    </button>
                    <button className="text-2xl text-cyan-500">
                      <FaTwitterSquare />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <>
            {job && <MobileJobDetails job={job} setApplyJob={setApplyJob} />}

            {jobs?.length > 0 && (
              <MobileJobDetails job={jobs[0]} setApplyJob={setApplyJob} />
            )}
          </>
          <SmFooter />
          {visible && (
            <div className={`h-screen absolute top-[550px]`}>
              <div className="block fixed w-full bottom-0 z-50 shadow bg-white">
                <label
                  onClick={() => {
                    setApplyJob(job);
                  }}
                  htmlFor="apply-job"
                  className="flex justify-center cursor-pointer items-center transition duration-300 gap-2 px-4 py-2 bg-[#037b8e]  text-white"
                >
                  <span>Apply Now</span>
                  <Image src={externallink} width={18} height={18} alt="icon" />
                </label>
              </div>
            </div>
          )}
        </div>
        {/* card & form*/}
        <>
          <div className="top-0 -mb-8">
            <div
              className={`sticky px-4 top-0 py-6 z-10 bg-gray-50 ${
                responsive ? "hidden" : "block"
              }`}
            >
              <form
                onClick={handleClose}
                onSubmit={handleJobsSearch}
                className="custom-shadow container border w-full sm:w-[70%] md:w-[60%]  relative py-1 rounded-lg flex items-center justify-between mx-auto"
              >
                <div className="flex items-center sm:gap-1 relative">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="sm:w-5 sm:h-5 w-4 h-4 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </span>
                  <input
                    type="search"
                    onChange={(e) => handleSearchJobs(e)}
                    className={`focus:outline-none sm:w-80 bg-transparent text-gray-700 text-sm p-2 sm:p-3 ${
                      searchResult
                        ? "placeholder:text-gray-500"
                        : "placeholder:text-gray-500"
                    }`}
                    placeholder={
                      jobrole ? jobrole : roleJob ? roleJob : "Job role"
                    }
                    value={searchResult || ""}
                  />
                </div>

                <button className="px-2 md:px-4 absolute right-2 sm:right-4 sm:py-[6px] py-1 focus:ring-2 transition duration-300 rounded-lg text-white sm:text-md text-sm bg-[#037b8e]">
                  Search
                </button>
              </form>
              {/* search box */}
              {searchBox && (
                <div className="container">
                  <ul
                    onClick={() => setSearchBox(false)}
                    className="shadow transition duration-300 absolute mt-2 z-50 border w-full sm:w-[70%] md:w-[60%] h-72 overflow-y-scroll overflow-hidden py-4 px-8 rounded-lg bg-white left-1/2 translate-x-[-50%]"
                  >
                    <small className="text-xs px-4 text-gray-500">
                      jobs by designations
                    </small>
                    {searchJobs?.map((role, i) => (
                      <li
                        onClick={() => setSearchResult(role)}
                        className="py-2 hover:bg-gray-50 rounded-lg px-4 transition duration-300 flex cursor-pointer items-center gap-4 text-gray-700"
                        key={i}
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                            />
                          </svg>
                        </span>{" "}
                        <span className=""> {role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* filter button */}

              <div className="flex sm:justify-center pt-3 items-center gap-x-2  w-full mx-auto overflow-x-scroll scroll-smooth">
                <div className="flex text-sm text-gray-500 items-center">
                  <button className="border w-24 text-xs justify-between text-gray-600 hover:border-[#037b8e] hover:shadow-lg transition-all duration-300 my-2 px-2 py-2  rounded-lg custom-shadow flex items-center gap-1 ">
                    Filter jobs{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                      />
                    </svg>
                  </button>
                </div>

                {/*location  */}
                <div className="">
                  <button
                    onClick={handleLocation}
                    className={`border text-gray-600 hover:border-[#037b8e] hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
                      locationState !== "Location" &&
                      "bg-yellow-50 hover:border-yellow-100"
                    }`}
                  >
                    <span>{locationState}</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>
                  {onLocation && (
                    <div
                      className={`pt-4 absolute right-1 md:left-28 bg-gray-50 rounded overflow-hidden overflow-y-auto border h-72 w-64`}
                    >
                      <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                        <span>Select Location</span>
                        {locationState !== "Location" && (
                          <span
                            onClick={clearLocationBtn}
                            className="text-[#037b8e] cursor-pointer"
                          >
                            Clear
                          </span>
                        )}
                      </li>

                      <div className="my-2 w-48 mx-auto relative">
                        <span className="absolute py-2 px-2 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                          </svg>
                        </span>
                        <input
                          type="search"
                          onChange={(e) => handleSearchLocation(e)}
                          className="px-8 w-48 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
                          defaultValue={
                            locationState !== "Location" ? locationState : ""
                          }
                        />
                      </div>

                      <ul onClick={() => setOnLocation(!onLocation)}>
                        {locationData?.map((locationData, i) => (
                          <li
                            key={i}
                            onClick={() => setLocationState(locationData)}
                            className="text-gray-700 px-6 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                          >
                            {locationData}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* experience */}
                <div className="">
                  <button
                    onClick={handleExperience}
                    className={`border text-gray-600 hover:border-[#037b8e] hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
                      experienceState !== "Experience" &&
                      "bg-yellow-50 hover:border-yellow-100"
                    }`}
                  >
                    <span>{experienceState}</span>

                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>
                  {onExperience && (
                    <div
                      className={`absolute right-1 md:left-44 pt-4 z-10 bg-gray-50 rounded overflow-hidden overflow-y-auto border h-52 w-60`}
                    >
                      <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                        <span>Select Experience</span>
                        {experienceState !== "Experience" && (
                          <span
                            onClick={clearExperienceBtn}
                            className="text-[#037b8e] cursor-pointer"
                          >
                            Clear
                          </span>
                        )}
                      </li>
                      <div className="my-2 w-48 mx-auto relative">
                        <span className="absolute py-2 px-2 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                          </svg>
                        </span>
                        <input
                          type="search"
                          onChange={(e) => handleSearchExperience(e)}
                          className="px-8 w-48 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
                        />
                      </div>
                      <ul onClick={() => setOnExperience(!onExperience)}>
                        {experienceData?.map((experience, i) => (
                          <li
                            key={i}
                            onClick={() => setExperienceState(experience)}
                            className="text-gray-700 px-6 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                          >
                            {experience}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* employment */}
                <div className="">
                  <button
                    onClick={handleEmployment}
                    className={`border w-44 justify-between text-gray-600 hover:border-[#037b8e]  hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
                      employementState !== "Employment Type" &&
                      "bg-yellow-50 hover:border-yellow-100"
                    }`}
                  >
                    <span>{employementState}</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>

                  {onEmployement && (
                    <div
                      className={`absolute right-1 md:right-20 pt-4 z-1 bg-gray-50 rounded overflow-hidden overflow-y-auto  border h-52 w-52 text-sm`}
                    >
                      <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                        <span>Select Employment</span>
                        {employementState !== "Employment Type" && (
                          <span
                            onClick={clearEmploymentState}
                            className="text-[#037b8e] cursor-pointer"
                          >
                            Clear
                          </span>
                        )}
                      </li>
                      <div className="my-2 w-44 mx-auto relative">
                        <span className="absolute py-2 px-2 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                          </svg>
                        </span>
                        <input
                          type="search"
                          onChange={(e) => handleSearchEmployment(e)}
                          className="px-8 w-44 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
                        />
                      </div>
                      <ul onClick={() => setOnEmployement(!onEmployement)}>
                        {employmentData?.map((work, i) => (
                          <li
                            key={i}
                            onClick={() => setEmployementState(work)}
                            className="text-gray-700 px-6 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                          >
                            {work}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* job type */}
                <div className="">
                  <button
                    onClick={handleJobType}
                    className={`border w-28 justify-between text-gray-600 hover:border-[#037b8e] hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
                      remoteResult !== "Job Type" &&
                      "bg-yellow-50 hover:border-yellow-100"
                    }`}
                  >
                    <span>{remoteResult}</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>
                  {remote && (
                    <div
                      className={`absolute right-1 md:right-10 pt-4 z-10 bg-gray-50 rounded overflow-hidden overflow-y-auto border h-52 w-52 text-sm`}
                    >
                      <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                        <span>Select Job Type</span>

                        {remoteResult !== "Job Type" && (
                          <span
                            onClick={handleCloseRemote}
                            className="text-[#037b8e] cursor-pointer"
                          >
                            Clear
                          </span>
                        )}
                      </li>
                      <div className="my-2 w-40 mx-auto relative">
                        <span className="absolute py-2 px-2 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                          </svg>
                        </span>
                        <input
                          type="search"
                          onChange={(e) => handleSearchType(e)}
                          className="px-8 w-40 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
                        />
                      </div>
                      <ul onClick={() => setRemote(!remote)}>
                        {remoteData?.map((type, i) => (
                          <li
                            onClick={() => handleRemote(type)}
                            key={i}
                            className="text-gray-700 px-6 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* clear btn */}
                <div>
                  {openClearBtn && counter !== 0 && (
                    <button
                      onClick={handleClearAllFilter}
                      className={`text-[#037b8e] hover:shadow-md transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow  flex items-center gap-1 font-medium `}
                    >
                      Clear ({counter})
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* single card */}
            <div
              className={`w-full sm:w-9/12 mx-auto px-3 ${
                responsive ? "hidden" : "block"
              }`}
            >
              <div className="mt-2 lg:mt-0">
                {combineFilterJobs?.length > 0 ? (
                  <p className="text-gray-500">
                    {combineFilterJobs?.length} jobs found for {domain}.
                  </p>
                ) : (
                  <>
                    {matchingJobs?.length > 0 && (
                      <p className="text-gray-500">
                        {matchingJobs?.length} jobs found for {domain}.
                      </p>
                    )}
                  </>
                )}
              </div>
              {isLoading ? (
                <div className="mt-10 text-center">
                  <Loading />
                </div>
              ) : (
                <div
                  onClick={() => setResponsive(true)}
                  className="h-[80vh] mt-[19px] sticky top-44 overflow-hidden overflow-y-scroll"
                >
                  {combineFilterJobs?.length > 0 ? (
                    <>
                      {combineFilterJobs?.map((job) => (
                        <JobsCard
                          key={job._id}
                          job={job}
                          jobrole={jobrole}
                          roleJob={roleJob}
                        />
                      ))}
                    </>
                  ) : jobs?.length > 0 ? (
                    <>
                      {jobs?.map((job) => (
                        <JobsCard
                          key={job._id}
                          job={job}
                          jobrole={jobrole}
                          roleJob={roleJob}
                        />
                      ))}

                      {filterByData?.length > 0 && (
                        <>
                          {filterByData?.map((job) => (
                            <JobsCard
                              key={job._id}
                              job={job}
                              roleJob={roleJob}
                              jobrole={jobrole}
                            />
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {dynamicOthersJobs?.length > 0 && (
                        <>
                          {dynamicOthersJobs?.map((job) => (
                            <JobsCard
                              key={job._id}
                              job={job}
                              jobrole={jobrole}
                              roleJob={roleJob}
                            />
                          ))}
                        </>
                      )}
                      {dynamicRemainingJobs?.length > 0 && (
                        <>
                          {dynamicRemainingJobs?.map((job) => (
                            <JobsCard
                              key={job._id}
                              job={job}
                              roleJob={roleJob}
                              jobrole={jobrole}
                            />
                          ))}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      </div>
      {/* -- */}

      <div className="hidden lg:block">
        <div className="sticky px-4 top-0 py-6 z-10 bg-gray-50">
          <form
            onClick={handleClose}
            onSubmit={handleJobsSearch}
            className="custom-shadow container border w-full md:w-[60%] lg:w-[50%] relative py-1 rounded-lg flex items-center justify-between mx-auto"
          >
            <div className="flex items-center gap-1 relative">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
              <input
                type="search"
                onChange={(e) => handleSearchJobs(e)}
                className={`focus:outline-none sm:w-80 bg-transparent text-gray-700 text-sm p-3 py-4 ${
                  searchResult
                    ? "placeholder:text-gray-500"
                    : "placeholder:text-gray-500"
                }`}
                placeholder={
                  jobrole
                    ? jobrole
                    : roleJob
                    ? roleJob
                    : "Enter skills / designations / companies"
                }
                value={searchResult || ""}
              />
            </div>

            <button className="px-4 md:px-6 absolute right-2 sm:right-4 py-[6px] focus:ring-2 transition duration-300 rounded-lg text-white sm:text-lg text-sm bg-[#037b8e]">
              Search
            </button>
          </form>
          {/* search box */}
          {searchBox && (
            <div className="container">
              <ul
                onClick={() => setSearchBox(false)}
                className="shadow transition duration-300 absolute mt-2 z-50 border w-full md:w-[60%] h-72 overflow-y-scroll overflow-hidden py-4 px-8 rounded-lg bg-white left-1/2 translate-x-[-50%]"
              >
                <small className="text-xs px-4 text-gray-500">
                  jobs by designations
                </small>
                {searchJobs?.map((role, i) => (
                  <li
                    onClick={() => setSearchResult(role)}
                    className="py-2 hover:bg-gray-50 rounded-lg px-4 transition duration-300 flex cursor-pointer items-center gap-4 text-gray-700"
                    key={i}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                        />
                      </svg>
                    </span>{" "}
                    <span className=""> {role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* filter button */}

          <div className="flex mt-3 items-center justify-center gap-x-4   scroll-smooth z-auto">
            <div className="flex text-sm text-gray-500 items-center gap-1">
              <button className="border w-32 justify-between text-gray-600 hover:border-[#037b8e] hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ">
                Filter jobs{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
              </button>
            </div>

            {/*location  */}
            <div className="relative">
              <button
                onClick={handleLocation}
                className={`border text-gray-600 hover:border-[#037b8e] hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
                  locationState !== "Location" &&
                  "bg-yellow-50 hover:border-yellow-100"
                }`}
              >
                <span>{locationState}</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
              {onLocation && (
                <div
                  className={`pt-4 absolute right-0 md:left-0 bg-gray-50 rounded overflow-hidden overflow-y-auto border h-72 w-64`}
                >
                  <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                    <span>Select Location</span>
                    {locationState !== "Location" && (
                      <span
                        onClick={clearLocationBtn}
                        className="text-[#037b8e] cursor-pointer"
                      >
                        Clear
                      </span>
                    )}
                  </li>

                  <div className="my-2 w-48 mx-auto relative">
                    <span className="absolute py-2 px-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </span>
                    <input
                      type="search"
                      onChange={(e) => handleSearchLocation(e)}
                      className="px-8 w-48 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
                      defaultValue={
                        locationState !== "Location" ? locationState : ""
                      }
                    />
                  </div>

                  <ul onClick={() => setOnLocation(!onLocation)}>
                    {locationData?.map((locationData, i) => (
                      <li
                        key={i}
                        onClick={() => setLocationState(locationData)}
                        className="text-gray-700 px-6 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                      >
                        {locationData}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* experience */}
            <div className="relative">
              <button
                onClick={handleExperience}
                className={`border text-gray-600 hover:border-[#037b8e] hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
                  experienceState !== "Experience" &&
                  "bg-yellow-50 hover:border-yellow-100"
                }`}
              >
                <span>{experienceState}</span>

                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
              {onExperience && (
                <div
                  className={`absolute right-0 md:left-0 pt-4 z-10 bg-gray-50 rounded overflow-hidden overflow-y-auto border h-52 w-60`}
                >
                  <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                    <span>Select Experience</span>
                    {experienceState !== "Experience" && (
                      <span
                        onClick={clearExperienceBtn}
                        className="text-[#037b8e] cursor-pointer"
                      >
                        Clear
                      </span>
                    )}
                  </li>
                  <div className="my-2 w-48 mx-auto relative">
                    <span className="absolute py-2 px-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </span>
                    <input
                      type="search"
                      onChange={(e) => handleSearchExperience(e)}
                      className="px-8 w-48 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
                    />
                  </div>
                  <ul onClick={() => setOnExperience(!onExperience)}>
                    {experienceData?.map((experience, i) => (
                      <li
                        key={i}
                        onClick={() => setExperienceState(experience)}
                        className="text-gray-700 px-6 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                      >
                        {experience}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* employment */}
            <div className="relative">
              <button
                onClick={handleEmployment}
                className={`border w-44 justify-between text-gray-600 hover:border-[#037b8e]  hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
                  employementState !== "Employment Type" &&
                  "bg-yellow-50 hover:border-yellow-100"
                }`}
              >
                <span>{employementState}</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>

              {onEmployement && (
                <div
                  className={`absolute right-0 md:left-0 pt-4 z-1 bg-gray-50 rounded overflow-hidden overflow-y-auto  border h-52 w-52 text-sm`}
                >
                  <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                    <span>Select Employment</span>
                    {employementState !== "Employment Type" && (
                      <span
                        onClick={clearEmploymentState}
                        className="text-[#037b8e] cursor-pointer"
                      >
                        Clear
                      </span>
                    )}
                  </li>
                  <div className="my-2 w-44 mx-auto relative">
                    <span className="absolute py-2 px-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </span>
                    <input
                      type="search"
                      onChange={(e) => handleSearchEmployment(e)}
                      className="px-8 w-44 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
                    />
                  </div>
                  <ul onClick={() => setOnEmployement(!onEmployement)}>
                    {employmentData?.map((work, i) => (
                      <li
                        key={i}
                        onClick={() => setEmployementState(work)}
                        className="text-gray-700 px-6 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                      >
                        {work}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* job type */}
            <div className="relative">
              <button
                onClick={handleJobType}
                className={`border w-28 justify-between text-gray-600 hover:border-[#037b8e] hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
                  remoteResult !== "Job Type" &&
                  "bg-yellow-50 hover:border-yellow-100"
                }`}
              >
                <span>{remoteResult}</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
              {remote && (
                <div
                  className={`absolute right-0 md:left-0 pt-4 z-10 bg-gray-50 rounded overflow-hidden overflow-y-auto border h-52 w-52 text-sm`}
                >
                  <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                    <span>Select Job Type</span>

                    {remoteResult !== "Job Type" && (
                      <span
                        onClick={handleCloseRemote}
                        className="text-[#037b8e] cursor-pointer"
                      >
                        Clear
                      </span>
                    )}
                  </li>
                  <div className="my-2 w-40 mx-auto relative">
                    <span className="absolute py-2 px-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </span>
                    <input
                      type="search"
                      onChange={(e) => handleSearchType(e)}
                      className="px-8 w-40 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
                    />
                  </div>
                  <ul onClick={() => setRemote(!remote)}>
                    {remoteData?.map((type, i) => (
                      <li
                        onClick={() => handleRemote(type)}
                        key={i}
                        className="text-gray-700 px-6 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* clear btn */}
            <div>
              {openClearBtn && counter !== 0 && (
                <button
                  onClick={handleClearAllFilter}
                  className={`text-[#037b8e] hover:shadow-md transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow  flex items-center gap-1 font-medium `}
                >
                  Clear ({counter})
                </button>
              )}
            </div>
          </div>
        </div>
        {/* jobs card */}
        <div
          onClick={handleClose}
          className="lg:flex flex-row-reverse gap-6 container justify-between w-full lg:w-4/5 mx-auto pt-4"
        >
          {/* jobs card details */}
          <div className="lg:w-3/5 lg:mt-10 bg-white shadow rounded-md pt-5">
            <>
              {job && <JobsDetails job={job} setApplyJob={setApplyJob} />}

              {jobs?.length > 0 && (
                <JobsDetails job={jobs[0]} setApplyJob={setApplyJob} />
              )}
            </>
          </div>
          {/* single card */}
          <div className="lg:w-2/5 w-full">
            <div className="mt-2 lg:mt-0">
              {combineFilterJobs?.length > 0 ? (
                <p className="text-gray-500">
                  {combineFilterJobs?.length} jobs found for {domain}.
                </p>
              ) : (
                <>
                  {matchingJobs?.length > 0 && (
                    <p className="text-gray-500">
                      {matchingJobs?.length} jobs found for {domain}.
                    </p>
                  )}
                </>
              )}
            </div>
            {isLoading ? (
              <div className="mt-10 text-center">
                <Loading />
              </div>
            ) : (
              <div className="h-[80vh] mt-[19px] sticky top-44 overflow-hidden overflow-y-scroll">
                {combineFilterJobs?.length > 0 ? (
                  <>
                    {combineFilterJobs?.map((job) => (
                      <JobsCard
                        key={job._id}
                        job={job}
                        jobrole={jobrole}
                        roleJob={roleJob}
                      />
                    ))}
                  </>
                ) : jobs?.length > 0 ? (
                  <>
                    {jobs?.map((job) => (
                      <JobsCard
                        key={job._id}
                        job={job}
                        jobrole={jobrole}
                        roleJob={roleJob}
                      />
                    ))}

                    {filterByData?.length > 0 && (
                      <>
                        {filterByData?.map((job) => (
                          <JobsCard
                            key={job._id}
                            job={job}
                            roleJob={roleJob}
                            jobrole={jobrole}
                          />
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {dynamicOthersJobs?.length > 0 && (
                      <>
                        {dynamicOthersJobs?.map((job) => (
                          <JobsCard
                            key={job._id}
                            job={job}
                            jobrole={jobrole}
                            roleJob={roleJob}
                          />
                        ))}
                      </>
                    )}
                    {dynamicRemainingJobs?.length > 0 && (
                      <>
                        {dynamicRemainingJobs?.map((job) => (
                          <JobsCard
                            key={job._id}
                            job={job}
                            roleJob={roleJob}
                            jobrole={jobrole}
                          />
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {applyJob && <ApplyModal applyJob={applyJob} />}
    </>
  );
};

export default JobsDescription;
