import React from "react";

const SearchField = ({
  handleGetExp,
  inputExp,
  setVisible,
  visible,
  handleSearchRoles,
  setInputExp,
  search,
  handleGetRole,
  roleValue,
  close,
  setClose,
  experiences,
  locations,
  locationState,
  handleSearchLocation,
  closeLocationState,
  setCloseLocationState,
  handleGetLocation,
}) => {
  return (
    <div className="custom-shadow border w-[80%] mt-10 py-2 px-4 rounded-full flex divide-x divide-gray-100 items-center justify-between mx-auto">
      <div className="flex items-center gap-1 relative">
        <span>
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
        <input
          type="search"
          onChange={(e) => handleSearchRoles(e)}
          value={roleValue || ""}
          className="focus:outline-none w-72 text-gray-700 text-sm p-3"
          placeholder="Enter skills / designations / companies"
        />
        {close && (
          <>
            <ul
              onClick={() => setClose(!close)}
              className={`absolute overflow-y-scroll overflow-hidden top-12 pt-4 bg-white rounded-tl-xl rounded-bl-xl border h-64 w-80 ml-6`}
            >
              {search?.map((role, i) => (
                <li
                  onClick={() => handleGetRole(role)}
                  className="text-gray-700 px-5 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                  key={i}
                >
                  {role}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="flex items-center relative">
        <input
          placeholder="Select experience"
          className="focus:outline-none text-gray-700 text-sm p-3"
          value={inputExp}
          onChange={(e) => setInputExp(e.target.value)}
        />
        <button onClick={() => setVisible(!visible)} className="mr-6">
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
        </button>
        {visible && (
          <ul
            onClick={() => setVisible(!visible)}
            className="absolute top-12 pt-4 bg-white rounded-tl-xl rounded-bl-xl border h-auto w-48 overflow-x-hidden overflow-y-scroll"
          >
            {experiences?.map((exp, i) => (
              <li
                onClick={() => handleGetExp(exp)}
                className="text-gray-700 px-5 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                key={i}
              >
                {exp}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <input
          type="search"
          placeholder="Enter location"
          className="focus:outline-none text-gray-700 text-sm p-3"
          onChange={(e) => handleSearchLocation(e)}
          value={locationState || ""}
        />
        {closeLocationState && (
          <ul
            onClick={() => setCloseLocationState(!closeLocationState)}
            className={`absolute overflow-y-scroll overflow-hidden  pt-4 bg-white rounded-tl-xl rounded-bl-xl border h-64 w-52`}
          >
            {locations?.map((location, i) => (
              <li
                onClick={() => handleGetLocation(location)}
                className="text-gray-700 px-5 py-2 cursor-pointer hover:bg-gray-100 w-full text-sm"
                key={i}
              >
                {location}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <button className="px-7 py-[10px] focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition duration-300 rounded-full text-white text-lg bg-indigo-500">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchField;
