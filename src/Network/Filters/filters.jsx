import React, { useState, useEffect } from "react";

//components
import AdvancedFilters from "./advancedFilters";
import Dropdown from "../../components/dropdown/dropdown";

import filterData from "../../utils/filterData";

//data for influence type dropdown
const typeFilters = [
  { value: "coauthorship", label: "Co-Authorship" },
  { value: "coaffiliation", label: "Co-Affiliation" },
  { value: "citation", label: "Citation" },
];

const Filters = ({
  setIsGraph,
  isGraph,
  setSelectedHcp,
  isTopHcpsShown,
  setIsTopHcpsShown,
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
  setIsPrescriberShown,
  isPrescriberShown,
  setKolsOffset,
}) => {
  const handleResetFilters = () => {
    if (!isPrescriberShown) {
      setInfluenceTypes(["coauthorship"]);
    } else {
      setInfluenceTypes(["referral"]);
    }
    setSelectedHcp(topKols[0]);
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
        {/* type of KOLs */}
        <Dropdown label={isPrescriberShown ? "Prescribers" : "KOLs"}>
          <li>
            <label
              style={{
                background: !isPrescriberShown ? "var(--color-primary)" : "",
                color: !isPrescriberShown ? "white" : "",
              }}
              onClick={() => {
                if (isTopHcpsShown) {
                  if (!isPrescriberShown);
                  else {
                    setIsPrescriberShown(false);
                    setKolsOffset(0);
                    setSelectedHcp();
                  }
                } else {
                  setIsPrescriberShown(false);
                  setIsTopHcpsShown(true);
                }
              }}
            >
              KOLs
            </label>
          </li>
          <li>
            <label
              style={{
                background: isPrescriberShown ? "var(--color-primary)" : "",
                color: isPrescriberShown ? "white" : "",
              }}
              onClick={() => {
                if (isTopHcpsShown) {
                  if (isPrescriberShown);
                  else {
                    setKolsOffset(0);
                    setIsPrescriberShown(true);
                  }
                } else {
                  setIsPrescriberShown(true);
                  setIsTopHcpsShown(true);
                }
              }}
            >
              Prescribers
            </label>
          </li>
        </Dropdown>

        {/* Influence type filter */}
        <Dropdown label={"Influence Types"}>
          {!isPrescriberShown ? (
            typeFilters.map((filter, index) => (
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
            ))
          ) : (
            <li>
              <label>
                <input
                  style={{ marginRight: ".5rem" }}
                  onChange={(e) => {
                    handleTypeFilterChange("referral");
                  }}
                  checked={influenceTypes.includes("referral")}
                  type="checkbox"
                  value={"referral"}
                  name={"referral"}
                />
                Referral
              </label>
            </li>
          )}
        </Dropdown>

        {/* Influence Level Filter */}
        {/* <div style={{ display: "flex", flexDirection: "column" }}>
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
                  Second Level
                </label>
              </li>
            </ul>
          </div>
        </div> */}
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
          style={{ background: isGraph ? "red" : "var(--color-green)" }}
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
