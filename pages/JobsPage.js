import React, { useState } from "react";
import SearchField from "../components/SearchField";
import experiences from "../datalayer/experienceLevel";
import locations from "../datalayer/locations";
import roles from "../datalayer/roles";

const JobsPage = () => {
  const [visible, setVisible] = useState(false);
  const [inputExp, setInputExp] = useState("");
  const [search, setSearch] = useState("");
  const [roleValue, setRoleValue] = useState();
  const [close, setClose] = useState(false);
  const [locationState, setLocationState] = useState("");
  const [closeLocationState, setCloseLocationState] = useState(false);
  const [locationResult, setLocationResult] = useState();

  const handleCloseSearchField = () => {
    if (closeLocationState) {
      setCloseLocationState(false);
    }
    if (close) {
      setClose(false);
    }
  };

  const handleGetExp = (exp) => {
    if (exp) {
      setInputExp(exp);
    }
  };

  const handleGetRole = (role) => {
    setRoleValue(role);
  };
  const handleGetLocation = (location) => {
    setLocationResult(location);
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
  // search by location
  const handleSearchLocation = (e) => {
    setCloseLocationState(locations);
    setLocationResult(e.target.value);
    if (e.target.value) {
      const filterByLocation = locations.filter((role) =>
        role.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setLocationState(filterByLocation);
    } else {
      const remaining = locations.filter((role) => role !== e.target.value);
      setLocationState(remaining);
    }
  };

  return (
    <section className="py-10 flex justify-center items-center">
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
          setInputExp={setInputExp}
          setVisible={setVisible}
          visible={visible}
          handleSearchRoles={handleSearchRoles}
          search={search}
          handleGetRole={handleGetRole}
          roleValue={roleValue}
          setClose={setClose}
          close={close}
          experiences={experiences}
          locations={locations}
          handleSearchLocation={handleSearchLocation}
          locationState={locationState}
          closeLocationState={closeLocationState}
          setCloseLocationState={setCloseLocationState}
          handleGetLocation={handleGetLocation}
          locationResult={locationResult}
          handleCloseSearchField={handleCloseSearchField}
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
