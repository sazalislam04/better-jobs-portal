const HomePage = () => {
  return (
    <section className="mt-16 flex justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl text-gray-800 capitalize font-medium">
            Find your dream job now
          </h2>
          <p className="text-gray-400 text-lg mt-1">
            5 lakh+ jobs for you to explore
          </p>
        </div>
        {/* search bar */}
        <div className="custom-shadow border w-[80%] mt-10 py-2 px-4 rounded-full flex items-center justify-between mx-auto">
          <div className="flex items-center gap-1 w-3/4 ">
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

            <div className="divide-x divide-gray-100">
              <input
                type="search"
                className="focus:outline-none w-72 mr-4 text-sm p-3"
                placeholder="Enter skills / designations / companies"
              />
              <input
                type="search"
                placeholder="Select experience"
                className="focus:outline-none mr-6 text-sm p-3"
              />

              <input
                type="search"
                placeholder="Enter location"
                className="focus:outline-none text-sm p-3"
              />
            </div>
          </div>
          <div>
            <button className="px-7 py-[10px] focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition duration-300 rounded-full text-white text-lg bg-indigo-500">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// export async function getStaticProps() {
//   const res = await fetch("experience.json");
//   const experiences = await res.json();
//   console.log(data);

//   return {
//     props: {
//       experiences,
//     },
//   };
// }

export default HomePage;
