import React from "react";

//components
import AdvancedFilters from "./advancedFilters";
import Dropdown from "../../components/dropdown/dropdown";

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
  influenceTypes,
  setInfluenceTypes,
  selectedHcp,
  selectedSpecialization,
  setSelectedSpecialization,
  selectedState,
  setSelectedState,
  setSpecializationList,
  setStateList,
  setIsPrescriberShown,
  isPrescriberShown,
  kolData,
  prescriberData,
  config,
  topHcps,
  setKolsOffset,
}) => {
  // function to reset all the filters
  const handleResetFilters = () => {
    if (!isPrescriberShown) {
      setInfluenceTypes(["coauthorship"]);
    } else {
      setInfluenceTypes(["referral"]);
    }
    setSelectedHcp(topHcps[0]);
    setSelectedSpecialization("");
    setSelectedState("");
  };

  //add or remove influence type based based on checkbox and state variable
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
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          fontSize: "var(--heading)",
        }}
      >
        {/* type of KOLs */}
        <Dropdown label={isPrescriberShown ? "Prescribers" : "KOLs"}>
          {kolData?.nodes?.length > 0 && (
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
          )}
          {prescriberData?.nodes?.length > 0 && (
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
          )}
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
          config={config}
        />
        <button
          className="btn"
          style={{
            background: "var(--color-primary)",
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
