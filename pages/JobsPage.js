import React, { useState } from "react";
import SearchField from "../components/SearchField";
import roles from "../datalayer/roles";

const JobsPage = () => {
  const [search, setSearch] = useState("");
  const [roleValue, setRoleValue] = useState();
  const [close, setClose] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRole = (role) => {
    setRoleValue(role);
  };

  const handleCloseSearchField = () => {
    if (close) {
      setClose(false);
    }
  };

  // search by role
  const handleSearchRoles = (e) => {
    setRoleValue(e.target.value);
    setClose(roles);
    if (e.target.value) {
      const filterByRoles = roles.filter((role) =>
        role.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearch(filterByRoles);
    } else {
      const remaining = roles.filter((role) => role !== e.target.value);
      setSearch(remaining);
    }
  };
  // loading
  const hanldeSubmit = () => {
    setIsLoading(true);
  };

  return (
    <section
      onClick={handleCloseSearchField}
      className="py-10 flex justify-center items-center"
    >
      <div className="container">
        <div className="text-center">
          <h2 className="text-[34px] text-gray-700 capitalize font-medium">
            Find your dream job now
          </h2>
          <p className="text-gray-400 text-lg mt-1">
            5 lakh+ jobs for you to explore
          </p>
        </div>
        {/* search bar */}
        <SearchField
          handleSearchRoles={handleSearchRoles}
          search={search}
          handleGetRole={handleGetRole}
          roleValue={roleValue}
          setClose={setClose}
          close={close}
          handleCloseSearchField={handleCloseSearchField}
          isLoading={isLoading}
          hanldeSubmit={hanldeSubmit}
        />
        {/* jobs category */}
        {/* <div className="w-[85%] mx-auto mt-16">
          <Category />
        </div> */}
      </div>
    </section>
  );
};

export default JobsPage;
