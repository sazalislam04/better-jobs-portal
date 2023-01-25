import Image from "next/image";
import { FaAngleDoubleUp } from "react-icons/fa";
import capture from "../public/Capture.png";
import user from "../public/natural.png";

const Features = () => {
  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-[34px] text-gray-700 text-center font-medium">
          Features made for job seekers
        </h2>
        <div className="mt-12 lg:flex items-center justify-between">
          <div className="lg:w-2/5 mx-auto flex justify-center">
            <Image src={capture} alt="feature" width={260} height={260} />
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="flex relative items-center gap-10">
              <span className="absolute w-10 h-10 rounded-full flex justify-center items-center bg-indigo-100">
                <Image src={user} alt="icon" width={20} height={20} />
              </span>
              <p className="mx-14 text-sm font-medium">ONE CLICK APPLY</p>
            </div>
            <p className="mt-6 text-gray-600 lg:w-9/12">
              Our brand new search algorithms analyse your preferences and help
              you find your perfect artists.
            </p>
            <div className="mt-14 flex items-center gap-10">
              <span className="absolute w-10 h-10 rounded-full flex justify-center items-center bg-indigo-100">
                <FaAngleDoubleUp className="text-[#037b8e]" />
              </span>
              <p className="mx-14 text-sm font-medium">
                DIRECT CHAT WITH RECRUITERS
              </p>
            </div>
            <p className="mt-6 text-gray-600 lg:w-9/12">
              Save tracks and albums on your phone and listen to them offline.
            </p>
            <div className="mt-14 flex items-center gap-10">
              <span className="absolute w-10 h-10 rounded-full flex justify-center items-center bg-indigo-100">
                <Image src={user} alt="icon" width={20} height={20} />
              </span>
              <p className="mx-14 text-sm font-medium">
                ONLY VERIFIED RECRUITERS
              </p>
            </div>
            <p className="mt-6 text-gray-600 lg:w-9/12">
              Our brand new search algorithms analyse your preferences and help
              you find your perfect artists.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
