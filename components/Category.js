import React from "react";
import data from "./data/category.json";

const Category = () => {
  return (
    <div className="text-center">
      {data.map((job, i) => (
        <button
          className="border mx-3 hover:border-indigo-500 hover:shadow-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 my-3 px-6 py-3 rounded-full custom-shadow"
          key={i}
        >
          <span className="flex items-center gap-4">
            {job.title}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </button>
      ))}
    </div>
  );
};

export default Category;
