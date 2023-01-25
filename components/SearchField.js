import Link from "next/link";
import React from "react";
import Spinner from "./Loading/Spinner";

const SearchField = ({
  handleSearchRoles,
  search,
  handleGetRole,
  roleValue,
  close,
  setClose,
  handleCloseSearchField,
  isLoading,
  hanldeSubmit,
}) => {
  return (
    <div
      onClick={handleCloseSearchField}
      className="custom-shadow border w-full lg:w-[70%] mt-10 py-2 px-4 rounded-lg flex divide-x divide-gray-100 items-center justify-between mx-auto relative"
    >
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
          className="focus:outline-none md:w-80 text-gray-700 text-sm p-1 md:p-3"
          placeholder="Search by role"
        />
        {close && (
          <>
            <ul
              onClick={() => setClose(!close)}
              className={`absolute overflow-y-scroll overflow-hidden top-12 pt-4 bg-white rounded-tl-xl rounded-bl-xl border w-full h-64 md:w-80 ml-6`}
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
      <div className="">
        <Link
          href={`/jobs/search/${roleValue ? roleValue : "Android developer"}`}
        >
          <button
            onClick={hanldeSubmit}
            className={`w-20 md:w-32 h-[40px] md:h-[46px] transition duration-300 rounded-lg border bg-[#037b8e] text-white hover:bg-[#036a7a]`}
          >
            {isLoading ? <Spinner /> : "Search"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchField;
