import React, { useState } from "react";
import styled from "styled-components";

//utils function
import filterData from "../../utils/filterData";
import capitalizeWords from "../../utils/capitalizeWords";

const StyledSelect = styled.select`
  height: 35px;
  width: 175px;
  border: 1px solid var(--color-bg);
  background: white;
  color: black;
  padding: 4px 5px;
  font-size: 14px;
`;

const AdvancedFilters = ({
  totalData,
  setData,
  specializationList = [],
  stateList,
  countryList,
  influenceTypes,
  selectedHcp,
  selectedSpecialization,
  setSelectedSpecialization,
  selectedState,
  setSelectedState,
  selectedCountry,
  setSelectedCountry,
  setCountryList,
  setSpecializationList,
  setStateList,
  config,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <button
        className="btn"
        style={{
          background: "#0079fb",
        }}
        onClick={() => {
          setShowFilters(!showFilters);
        }}
      >
        Advanced Filters
      </button>
      {showFilters && (
        <div
          style={{
            border: "1px solid var(--color-bg)",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            backgroundColor: "white",
            position: "absolute",
            top: "110%",
            right: "0",
            zIndex: 100000,
            display: "flex",
            alignItems: "flex-end",
            gap: "1rem",
            fontSize: "2rem",
            padding: "1rem ",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              SPECIALIZATION
            </span>
            <StyledSelect
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              value={selectedSpecialization}
            >
              <option value="">All</option>
              {specializationList
                .filter((el) => el)
                .map((el, index) => {
                  return (
                    <option key={index} value={el}>
                      {capitalizeWords(el)}
                    </option>
                  );
                })}
            </StyledSelect>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              STATE
            </span>
            <StyledSelect
              onChange={(e) => setSelectedState(e.target.value)}
              value={selectedState}
            >
              <option value="">All</option>
              {stateList?.length > 0 &&
                stateList
                  .filter((el) => el)
                  .map((el, index) => {
                    return (
                      <option key={index} value={el}>
                        {el}
                      </option>
                    );
                  })}
            </StyledSelect>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              COUNTRY
            </span>
            <StyledSelect
              onChange={(e) => setSelectedCountry(e.target.value)}
              value={selectedCountry}
            >
              <option value="">All</option>
              {countryList?.length > 0 &&
                countryList
                  .filter((el) => el)
                  .map((el, index) => {
                    return (
                      <option key={index} value={el}>
                        {el.toUpperCase()}
                      </option>
                    );
                  })}
            </StyledSelect>
          </div>

          <button
            className="btn"
            style={{
              background: "#0079fb",
            }}
            onClick={() => {
              filterData(
                totalData,
                setData,
                influenceTypes,
                selectedHcp,
                selectedSpecialization,
                selectedState,
                selectedCountry,
                setStateList,
                setSpecializationList,
                setCountryList,
                setSelectedState,
                setSelectedSpecialization,
                setSelectedCountry,
                config?.unlockedNodes
              );
            }}
          >
            Submit
          </button>
          <button
            className="btn"
            style={{
              background: "red",
            }}
            onClick={() => {
              setShowFilters(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default AdvancedFilters;
