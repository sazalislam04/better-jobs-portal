import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import experiences from "../datalayer/experienceLevel";
import locations from "../datalayer/locations";
import jobroles from "../datalayer/roles";
import employments from "../datalayer/workTypes";
import JobsCard from "./JobsCard";
import JobsDetails from "./JobsDetails";

const JobsDescription = ({ jobs, role, job }) => {
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
  const [domainData, setDomainData] = useState([]);
  const [searchResult, setSearchResult] = useState();
  const [searchBox, setSearchBox] = useState(false);
  // search jobs
  const [getSearchJobs, setGetSearchJobs] = useState();
  const [getDomain, setGetDomain] = useState([]);
  const [allDomainMatching, setAllDomainMatching] = useState([]);

  const [filterByData, setFilterByData] = useState([]);

  const [combineFilter, setCombineFilter] = useState(filterByData);

  const router = useRouter();

  // const BASE_URL = "https://better-jobs-portal.vercel.app";
  const BASE_URL = "http://localhost:3000";

  let domain = "";
  if (jobs?.length > 0) {
    domain = jobs[0]?.domain;
  } else {
    domain = job?.domain;
  }

  const { data: matchingJobs } = useQuery({
    queryKey: ["matchingJobs", domain],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/jobs/?domain=${domain}`);
      const data = await res.json();
      if (data) {
        const filterByDomain = data?.filter((job) => job?.role !== role);
        setDomainData(filterByDomain);
      }
      return data;
    },
  });

  useEffect(() => {
    if (
      locationState === "Location" &&
      experienceState === "Experience" &&
      employementState === "Employment Type"
    ) {
      return setCombineFilter(filterByData);
    }
    if (
      locationState === "Location" &&
      experienceState === "Experience" &&
      employementState !== "Employment Type"
    ) {
      const result = filterByData?.filter(
        (job) => job.type_of_job === employementState
      );

      return setCombineFilter(result);
    }

    if (
      experienceState === "Experience" &&
      employementState === "Employment Type"
    ) {
      const result = filterByData?.filter((job) => job.city === locationState);

      return setCombineFilter(result);
    }
    if (
      locationState === "Location" &&
      experienceState !== "Experience" &&
      employementState !== "Employment Type"
    ) {
      const result = filterByData?.filter(
        (job) =>
          job.experience_required === experienceState &&
          job.type_of_job === employementState
      );
      return setCombineFilter(result);
    }
    if (locationState && experienceState === "Experience" && employementState) {
      const result = filterByData?.filter(
        (job) =>
          job.city === locationState && job.type_of_job === employementState
      );
      return setCombineFilter(result);
    }
    if (
      locationState !== "Location" &&
      experienceState !== "Experience" &&
      employementState !== "Employment Type"
    ) {
      const result = filterByData?.filter(
        (job) =>
          job.city === locationState &&
          job.experience_required === experienceState &&
          job.type_of_job === employementState
      );
      return setCombineFilter(result);
    }
    if (
      locationState === "Location" &&
      experienceState !== "Experience" &&
      employementState === "Employment Type"
    ) {
      const result = filterByData?.filter(
        (job) => job.experience_required === experienceState
      );
      return setCombineFilter(result);
    }

    if (
      locationState !== "Location" &&
      experienceState === "Experience" &&
      employementState === "Employment Type"
    ) {
      const result = filterByData?.filter((job) => job.city === locationState);
      return setCombineFilter(result);
    }
    if (locationState && experienceState) {
      const result = filterByData?.filter(
        (job) =>
          job.city === locationState &&
          job.experience_required === experienceState
      );
      return setCombineFilter(result);
    }
  }, [filterByData, locationState, experienceState, employementState]);

  console.log(combineFilter);

  const clearLocationBtn = () => {
    setLocationState("Location");
    setOnLocation(false);
  };

  const handleLocation = () => {
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
  };

  const handleExperience = () => {
    setOnExperience(!onExperience);
    setOnLocation(false);
    setOnEmployement(false);
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
  };
  const handleEmployment = () => {
    setOnEmployement(!onEmployement);
    setOnLocation(false);
    setOnExperience(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/api/jobs?role=${searchResult}`);
    const data = await res.json();
    setGetSearchJobs(data);

    const response = await fetch(
      `${BASE_URL}/api/jobs/?domain=${data[0]?.domain}`
    );
    const domains = await response.json();
    setAllDomainMatching(domains);
    if (domains) {
      const filterByDomain = domains?.filter(
        (job) => job?.role !== data[0]?.role
      );
      setGetDomain(filterByDomain);
    }
  };

  // filter by location
  const { data: filterbylocations } = useQuery({
    queryKey: ["filterbylocations", locationState],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/jobs/?city=${locationState}`);
      const data = await res.json();
      if (data) {
        const filterData = data?.filter((job) => job?.domain === domain);
        setFilterByData(filterData);
      }
      return data;
    },
  });
  // filter by experience
  const { data: filterbyexperiences } = useQuery({
    queryKey: ["filterbyexperiences", experienceState],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/api/jobs/?experience_required=${experienceState}`
      );
      const data = await res.json();
      if (data) {
        const filterData = data?.filter((job) => job?.domain === domain);
        setFilterByData(filterData);
      }
      console.log(data);
      return data;
    },
  });
  // filter by employment
  const { data: filterbyemployment } = useQuery({
    queryKey: ["filterbyemployment", employementState],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/api/jobs/?type_of_job=${employementState}`
      );
      const data = await res.json();
      if (data) {
        const filterData = data?.filter((job) => job?.domain === domain);
        setFilterByData(filterData);
      }
      return data;
    },
  });

  return (
    <div className="">
      <div className="lg:sticky top-0 py-6 z-50 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="custom-shadow border w-[60%] relative py-1 px-4 rounded-full flex  items-center justify-between mx-auto"
        >
          <div className="flex items-center gap-1  relative">
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
              value={searchResult || ""}
              onChange={(e) => handleSearchJobs(e)}
              className="focus:outline-none w-80 bg-transparent text-gray-700 text-sm p-3"
              placeholder={
                role ? role : "Enter skills / designations / companies"
              }
            />
          </div>

          <button className="px-6 py-[6px] focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition duration-300 rounded-full text-white text-lg bg-indigo-500">
            Search
          </button>
        </form>
        {/* search box */}
        {searchBox && (
          <ul
            onClick={() => setSearchBox(false)}
            className="shadow transition duration-300 absolute mt-2 z-50 border w-[60%] h-72 overflow-y-scroll overflow-hidden py-4 px-8 rounded-lg bg-white left-1/2 translate-x-[-50%]"
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
            className={`border text-gray-600 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 my-2 px-6 py-2 text-sm rounded-full custom-shadow flex items-center gap-1 ${
              locationState !== "Location" &&
              "bg-yellow-100 hover:border-yellow-500"
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
              className={`absolute top-12 pt-4 bg-gray-50 rounded overflow-hidden overflow-y-auto -ml-32 mt-2 border h-72 w-72`}
            >
              <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                <span>Select Location</span>
                {locationState !== "Location" && (
                  <span
                    onClick={clearLocationBtn}
                    className="text-blue-800 cursor-pointer"
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
            className={`border text-gray-600 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 my-2 px-6 py-2 text-sm rounded-full custom-shadow flex items-center gap-1 ${
              experienceState !== "Experience" &&
              "bg-yellow-100 hover:border-yellow-500"
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
              className={`absolute top-12 pt-4 bg-gray-50 rounded overflow-hidden overflow-y-auto ml-20 mt-2 border h-52 w-64 `}
            >
              <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                <span>Select Experience</span>
                {experienceState !== "Experience" && (
                  <span
                    onClick={clearExperienceBtn}
                    className="text-blue-800 cursor-pointer"
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
            className={`border text-gray-600 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 my-2 px-6 py-2 text-sm rounded-full custom-shadow flex items-center gap-1 ${
              employementState !== "Employment Type" &&
              "bg-yellow-100 hover:border-yellow-500"
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
              className={`absolute top-12 pt-4 bg-gray-50 rounded overflow-hidden overflow-y-auto right-72 mt-2 border h-52 w-64 text-sm`}
            >
              <li className="text-gray-700 mb-1 px-6 font-medium w-full flex items-center justify-between">
                <span>Select Employment Types</span>
                {employementState !== "Employment Type" && (
                  <span
                    onClick={clearEmploymentState}
                    className="text-blue-800 cursor-pointer"
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
        </div>
      </div>

      {/* jobs card */}
      <div className="lg:flex gap-6 justify-between lg:w-9/12 mx-auto mt-4">
        <div className="lg:w-2/5">
          <div className="py-2">
            {getSearchJobs?.length > 0 ? (
              <>
                {allDomainMatching?.length} Jobs found for{" "}
                {getSearchJobs[0]?.domain}
              </>
            ) : (
              <>
                {jobs?.length > 0 ? (
                  <>
                    {matchingJobs?.length} Jobs found for {jobs[0]?.domain}
                  </>
                ) : (
                  <>
                    {matchingJobs?.length} Jobs found for {job?.domain}
                  </>
                )}
              </>
            )}
          </div>

          <div className="h-[80vh] sticky top-44 overflow-hidden overflow-y-scroll">
            {combineFilter?.length > 0 && (
              <>
                {combineFilter?.map((job) => {
                  return <JobsCard key={job._id} job={job} />;
                })}
              </>
            )}
            {!combineFilter?.length && (
              <>
                {getSearchJobs?.length > 0 ? (
                  <>
                    {getSearchJobs?.map((job) => (
                      <JobsCard key={job._id} job={job} />
                    ))}
                    {getDomain?.map((job) => (
                      <JobsCard key={job._id} job={job} />
                    ))}
                  </>
                ) : (
                  <>
                    {jobs?.length > 0 && (
                      <>
                        {jobs?.map((job) => (
                          <JobsCard key={job._id} job={job} />
                        ))}
                      </>
                    )}
                    {domainData?.length > 0 && (
                      <>
                        {domainData?.map((job) => (
                          <JobsCard key={job._id} job={job} />
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {/* jobs card details */}
        <>
          {getSearchJobs?.length > 0 ? (
            <>
              {getSearchJobs?.length > 0 && (
                <div className="lg:w-3/5 bg-white shadow rounded-md mt-10 mb-4">
                  <JobsDetails job={job || getSearchJobs[0]} />
                </div>
              )}
            </>
          ) : (
            <>
              {jobs?.length > 0 && (
                <div className="lg:w-3/5 bg-white shadow rounded-md mt-10 mb-4">
                  <JobsDetails job={jobs[0]} />
                </div>
              )}
              {job && (
                <div className="lg:w-3/5 bg-white shadow rounded-md mt-10 mb-4">
                  <JobsDetails job={job} />
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default JobsDescription;
