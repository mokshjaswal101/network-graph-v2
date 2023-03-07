import React, { useState, useEffect } from "react";
import styled from "styled-components";

//components
import AdvancedFilters from "./advancedFilters";

import filterData from "../../utils/filterData";

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
  KolsOffset,
  topKols,
}) => {
  const handleResetFilters = () => {
    if (!selectedHcp || selectedHcp == "") {
      filterData(
        totalData,
        setData,
        influenceTypes,
        influenceLevel,
        "",
        "",
        "",
        setStateList,
        setSpecializationList,
        setSelectedState,
        setSelectedSpecialization,
        KolsOffset,
        topKols
      );
    } else setSelectedHcp(null);
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
          fontSize: "var(--heading)",
        }}
      >
        <button
          className="btn"
          style={{
            background: "var(--color-green)",
          }}
          onClick={() => {
            setShowTopHcps(!showTopHcps);
          }}
        >
          Top KOLs
        </button>

        {/* Influence type filter */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "var(--normal)",
              fontWeight: "bold",
              marginBottom: "5px",
              height: "fit-content",
            }}
          >
            INFLUENCE TYPES
          </span>
          <div
            className="dropdown dropdown-type"
            style={{ zIndex: "2000" }}
            onClick={() =>
              document
                .querySelector(".dropdown.dropdown-type")
                .classList.toggle("is-active")
            }
          >
            Influence Types
            <ul className="dropdown-list" onClick={(e) => e.stopPropagation()}>
              {typeFilters.map((filter, index) => (
                <li key={index}>
                  <label>
                    <input
                      style={{ marginRight: ".5rem" }}
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

        {/* Influence Level Filter */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "var(--normal)",
              fontWeight: "bold",
              marginBottom: "5px",
              height: "fit-content",
            }}
          >
            INFLUENCE LEVEL
          </span>
          <div
            className="dropdown dropdown-level"
            style={{ zIndex: "2000" }}
            onClick={() =>
              document
                .querySelector(".dropdown.dropdown-level")
                .classList.toggle("is-active")
            }
          >
            Influence Level
            <ul className="dropdown-list" onClick={(e) => e.stopPropagation()}>
              <li>
                <label
                  style={{
                    background:
                      influenceLevel == 1 ? "var(--color-primary)" : "",
                    color: influenceLevel == 1 ? "white" : "",
                  }}
                  onClick={() => setInfluenceLevel(1)}
                >
                  First Level
                </label>
              </li>
              <li>
                <label
                  style={{
                    background:
                      influenceLevel == 2 ? "var(--color-primary)" : "",
                    color: influenceLevel == 2 ? "white" : "",
                  }}
                  onClick={() => setInfluenceLevel(2)}
                >
                  second Level
                </label>
              </li>
            </ul>
          </div>
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
        <AdvancedFilters
          totalData={totalData}
          setData={setData}
          specializationList={specializationList}
          stateList={stateList}
          influenceTypes={influenceTypes}
          selectedHcp={selectedHcp}
          selectedSpecialization={selectedSpecialization}
          setSelectedSpecialization={setSelectedSpecialization}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          setSpecializationList={setSpecializationList}
          setStateList={setStateList}
          influenceLevel={influenceLevel}
          KolsOffset={KolsOffset}
          topKols={topKols}
        />
        <button
          className="btn"
          style={{
            background: "#0079fb",
          }}
          onClick={() => {
            handleResetFilters();
          }}
        >
          Reset Filters
        </button>
        <button
          className="btn"
          style={{ background: isGraph ? "red" : "green" }}
          onClick={() => {
            setIsGraph(!isGraph);
          }}
        >
          {isGraph ? "Show Map" : "Show Graph"}
        </button>
      </div>
    </div>
  );
};

export default Filters;
