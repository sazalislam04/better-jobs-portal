import React, { useState } from "react";
import Category from "./Category";
import SearchField from "./SearchField";

const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const [inputExp, setInputExp] = useState("");
  const handleGetExp = (exp) => {
    if (exp) {
      setInputExp(exp);
    }
  };

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
        <SearchField
          handleGetExp={handleGetExp}
          inputExp={inputExp}
          setVisible={setVisible}
          visible={visible}
        />
        {/* jobs category */}
        <div className="w-[85%] mx-auto mt-16">
          <Category />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
