import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import experiences from "../datalayer/experienceLevel";
import locations from "../datalayer/locations";
import jobroles from "../datalayer/roles";
import employments from "../datalayer/workTypes";
import ApplyModal from "./ApplyModal";
import JobsCard from "./JobsCard";
import JobsDetails from "./JobsDetails";
import Loading from "./Loading/Loading";

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

  const router = useRouter();

  const BASE_URL = "https://better-jobs-portal.vercel.app";
  // const BASE_URL = "http://localhost:3000";

  let domain = "";
  if (jobs?.length > 0) {
    domain = jobs[0]?.domain;
  } else if (dynamicOthersJobs?.length > 0) {
    domain = dynamicOthersJobs[0]?.domain;
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

  return (
    <>
      <div className="">
        <div className="lg:sticky top-0 py-6 z-50 bg-gray-50">
          <form
            onClick={handleClose}
            onSubmit={handleJobsSearch}
            className="custom-shadow border w-[50%] z-50 relative py-1 px-4 rounded-lg flex  items-center justify-between mx-auto"
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
                className={`focus:outline-none  w-80 bg-transparent text-gray-700 text-sm p-3 ${
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

            <button className="px-6 py-[6px] focus:ring-2 transition duration-300 rounded-lg text-white text-lg bg-[#037b8e]">
              Search
            </button>
          </form>
          {/* search box */}
          {searchBox && (
            <ul
              onClick={() => setSearchBox(false)}
              className="shadow transition duration-300 absolute mt-2 z-50 border w-[50%] h-72 overflow-y-scroll overflow-hidden py-4 px-8 rounded-lg bg-white left-1/2 translate-x-[-50%]"
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
          )}

          {/* filter button */}
          <div className="flex relative items-center gap-6 mt-5 justify-center">
            <span className="flex text-sm text-gray-500 items-center gap-1">
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
              Filter jobs by
            </span>

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
                className={`absolute top-12 pt-4 left-80 bg-gray-50 rounded overflow-hidden overflow-y-auto  mt-2 border h-72 w-72`}
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

                <div className="my-2 w-56 mx-auto relative">
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
                    className="px-8 w-56 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
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

            <button
              onClick={handleExperience}
              className={`border text-gray-600 hover:border-[#037b8e]hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
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
                className={`absolute top-12 pt-4 bg-gray-50 rounded overflow-hidden overflow-y-auto -ml-40 mt-2 border h-52 w-64 `}
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
            <button
              onClick={handleEmployment}
              className={`border text-gray-600 hover:[#037b8e] hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
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
                className={`absolute top-12 pt-4 bg-gray-50 rounded overflow-hidden overflow-y-auto ml-44 mt-2 border h-52 w-64 text-sm`}
              >
                <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                  <span>Select Employment Type</span>
                  {employementState !== "Employment Type" && (
                    <span
                      onClick={clearEmploymentState}
                      className="text-[#037b8e] cursor-pointer"
                    >
                      Clear
                    </span>
                  )}
                </li>
                <div className="my-2 w-52 mx-auto relative">
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
                    className="px-8 w-52 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
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
            <button
              onClick={handleJobType}
              className={`border text-gray-600 hover:border-[#037b8e] hover:shadow-lg transition-all duration-300 my-2 px-4 py-2 text-sm rounded-lg custom-shadow flex items-center gap-1 ${
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
                className={`absolute top-12 pt-4 bg-gray-50 rounded overflow-hidden overflow-y-auto right-64 mt-2 border h-52 w-64 text-sm`}
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
                <div className="my-2 w-52 mx-auto relative">
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
                    className="px-8 w-52 focus:outline-none border-gray-400 border focus:ring-2 focus:ring-gray-400 transition duration-300 rounded py-1"
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

            {openClearBtn && counter !== 0 && (
              <button
                onClick={handleClearAllFilter}
                className={`text-[#037b8e] hover:shadow-md transition-all duration-300 my-2 px-4 py-2 text-sm rounded-full custom-shadow  flex items-center gap-1 font-medium `}
              >
                Clear ({counter})
              </button>
            )}
          </div>
        </div>

        {/* jobs card */}
        <div
          onClick={handleClose}
          className="lg:flex gap-6 justify-between lg:w-4/5 mx-auto mt-4"
        >
          <div className="lg:w-2/5">
            <div className="">
              {combineFilterJobs?.length > 0 ? (
                <p className="text-gray-500">
                  {combineFilterJobs?.length} jobs found for {domain}.
                </p>
              ) : (
                matchingJobs?.length > 0 && (
                  <p className="text-gray-500">
                    {matchingJobs?.length} jobs found for {domain}.
                  </p>
                )
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
          {/* jobs card details */}
          <div className="lg:w-3/5 bg-white shadow rounded-md mt-10 mb-4">
            <>
              {job && <JobsDetails job={job} setApplyJob={setApplyJob} />}

              {jobs?.length > 0 && (
                <JobsDetails job={jobs[0]} setApplyJob={setApplyJob} />
              )}
            </>
          </div>
        </div>
      </div>
      {applyJob && <ApplyModal applyJob={applyJob} />}
    </>
  );
};

export default JobsDescription;
