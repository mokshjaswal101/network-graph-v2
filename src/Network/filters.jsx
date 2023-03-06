import React, { useState, useEffect } from "react";
import styled from "styled-components";

import filterData from "../utils/filterData";

const StyledButton = styled.button`
  font-size: 1rem;
  color: white;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const StyledSelect = styled.select`
  height: 35px;
  width: 175px;
  border: 1px solid black;
  background: white;
  color: black;
  padding: 4px 5px;
  font-size: 14px;
`;

//data for influence type dropdown
const typeFilters = [
  { value: "coauthorship", label: "Co-Authorship" },
  { value: "coaffiliation", label: "Co-Affiliation" },
  { value: "citation", label: "Citation" },
  { value: "referral", label: "Referral" },
];

const Filters = ({
  setIsGraph,
  isGraph,
  setSelectedHcp,
  showTopHcps,
  setShowTopHcps,
  totalData,
  setData,
  specializationList = [],
  stateList,
  setInfluenceLevel,
  influenceTypes,
  setInfluenceTypes,
  selectedHcp,
  selectedSpecialization,
  setSelectedSpecialization,
  selectedState,
  setSelectedState,
  setSpecializationList,
  setStateList,
  influenceLevel,
  shownKols,
  topHcps,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleResetFilters = () => {
    setSelectedHcp(null);
    setSelectedSpecialization("");
    setSelectedState("");
  };

  //change influence type state based on options selected
  const handleTypeFilterChange = (type) => {
    if (influenceTypes.includes(type)) {
      setInfluenceTypes(influenceTypes.filter((item) => item !== type));
    } else {
      setInfluenceTypes([...influenceTypes, type]);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: ".5rem",
        position: "relative",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "1rem",
          fontSize: "2rem",
        }}
      >
        <StyledButton
          style={{
            background: "green",
          }}
          onClick={() => {
            setShowTopHcps(!showTopHcps);
          }}
        >
          Top KOLs
        </StyledButton>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
              height: "fit-content",
            }}
          >
            INFLUENCE TYPES
          </span>
          <div
            className="checkbox-dropdown"
            style={{ zIndex: "2000" }}
            onClick={() =>
              document
                .querySelector(".checkbox-dropdown")
                .classList.toggle("is-active")
            }
          >
            Influence Types
            <ul
              className="checkbox-dropdown-list"
              onClick={(e) => e.stopPropagation()}
            >
              {typeFilters.map((filter, index) => (
                <li key={index}>
                  <label>
                    <input
                      onChange={(e) => {
                        handleTypeFilterChange(e.target.value);
                      }}
                      checked={influenceTypes.includes(filter.value)}
                      type="checkbox"
                      value={filter.value}
                      name={filter.value}
                    />
                    {filter.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            INFLUENCE LEVEL
          </span>
          <StyledSelect onChange={(e) => setInfluenceLevel(e.target.value)}>
            <option defaultChecked value={1}>
              First Level
            </option>
            <option value={2}>Second Level</option>
          </StyledSelect>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginRight: "5px",
        }}
      >
        <StyledButton
          style={{
            background: "#0079fb",
          }}
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        >
          Advanced Filters
        </StyledButton>

        <StyledButton
          style={{
            background: "#0079fb",
          }}
          onClick={() => {
            handleResetFilters();
          }}
        >
          Reset Filters
        </StyledButton>
        <StyledButton
          style={{ background: isGraph ? "red" : "green" }}
          onClick={() => {
            setIsGraph(!isGraph);
          }}
        >
          {isGraph ? "Show Map" : "Show Graph"}
        </StyledButton>
      </div>

      {showFilters && (
        <div
          style={{
            border: "1px solid black",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
            position: "absolute",
            top: "110%",
            right: "0",
            zIndex: 100000,
            display: "flex",
            alignItems: "flex-end",
            gap: "1rem",
            fontSize: "2rem",
            padding: "0 1rem",
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
              {specializationList.map((el, index) => {
                return (
                  <option key={index} value={el}>
                    {el
                      .split(" ")
                      .map((el) => el[0].toUpperCase() + el.slice(1))
                      .join(" ")}
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
                stateList.map((el, index) => {
                  return (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  );
                })}
            </StyledSelect>
          </div>

          <StyledButton
            style={{
              background: "#0079fb",
            }}
            onClick={() => {
              filterData(
                totalData,
                setData,
                influenceTypes,
                influenceLevel,
                selectedHcp,
                selectedSpecialization,
                selectedState,
                setStateList,
                setSpecializationList,
                setSelectedState,
                setSelectedSpecialization,
                shownKols,
                topHcps
              );
            }}
          >
            Submit
          </StyledButton>
          <StyledButton
            style={{
              background: "red",
            }}
            onClick={() => {
              setShowFilters(false);
            }}
          >
            Cancel
          </StyledButton>
        </div>
      )}
    </div>
  );
};

export default Filters;
