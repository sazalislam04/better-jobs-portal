import React, { useState } from "react";
import experiences from "../datalayer/experienceLevel";
import locations from "../datalayer/locations";
import employments from "../datalayer/workTypes";
import JobsCard from "./JobsCard";
import JobsDetails from "./JobsDetails";

const JobsDescription = ({ jobs }) => {
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
  const [allJobs, setAllJobs] = useState([]);

  //  location state
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
    e.preventDefault();
    console.log(searchJobs);
  };

  return (
    <div className="">
      <div className="lg:sticky top-0 py-6 z-50 bg-gray-50">
        <form
          onSubmit={handleSearchJobs}
          className="custom-shadow border w-[60%] py-1 px-4 rounded-full flex  items-center justify-between mx-auto"
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
              onChange={(e) => setSearchJobs(e.target.value)}
              className="focus:outline-none w-80 bg-transparent text-gray-700 text-sm p-3"
              placeholder="Enter skills / designations / companies"
            />
          </div>
          <button className="px-6 py-[6px] focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition duration-300 rounded-full text-white text-lg bg-indigo-500">
            Search
          </button>
        </form>
        {/* filter button */}
        <div className="flex relative items-center gap-6 mt-8 justify-center">
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
                    onClick={() =>
                      setLocationState(locationData.slice(0, 8) + "...")
                    }
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
                    onClick={() =>
                      setExperienceState(experience.slice(0, 8) + "...")
                    }
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
            className="border text-gray-600 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 my-2 px-6 py-2 text-sm rounded-full custom-shadow flex items-center gap-1"
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
                    onClick={() =>
                      setEmployementState(work.slice(0, 8) + "...")
                    }
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
            {allJobs?.length} Jobs found for {allJobs[0]?.domain}
          </div>

          <div className="h-[100vh]  overflow-hidden overflow-y-scroll">
            {jobs?.length > 0 && (
              <>
                {jobs?.map((job) => (
                  <JobsCard
                    key={job._id}
                    job={job}
                    setDomainData={setDomainData}
                    setAllJobs={setAllJobs}
                  />
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
          </div>
        </div>
        {/* jobs card details */}
        <div className="lg:w-3/5 bg-white shadow rounded-md mt-10 mb-4">
          {jobs?.length > 0 && (
            <>
              <JobsDetails job={jobs[0]} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsDescription;
