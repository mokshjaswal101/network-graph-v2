import React, { useState } from "react";
import styled from "styled-components";
import starred from "../assets/starred.png";
import diamondBlue from "../assets/diamondblue.png";
import starBlue from "../assets/bluestar.png";

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

const typeFilters = [
  { value: "coauthorship", label: "Co-Authorship" },
  { value: "coaffiliation", label: "Co-Affiliation" },
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
  rankRange,
  selectedHcp,
  stateList,
  setInfluenceLevel,
  influenceTypes,
  setInfluenceTypes,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedRank, setSelectedRank] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleResetFilters = () => {
    setSelectedHcp(null);
    setSelectedSpecialization("");
    setSelectedRank("");
    setSelectedState("");
    setData(totalData);
  };

  const handleFilters = () => {
    setSelectedHcp("");
    let displayData = structuredClone(totalData);

    // filtering based on specialization
    if (selectedSpecialization) {
      let filteredData = { nodes: [], edges: [] };
      if (selectedSpecialization == "others") {
        totalData.nodes.forEach((node) =>
          !node.attributes.specialization
            ? filteredData.nodes.push(structuredClone(node))
            : null
        );
      } else {
        totalData.nodes.forEach((node) =>
          node.attributes.specialization === selectedSpecialization
            ? filteredData.nodes.push(structuredClone(node))
            : null
        );
      }

      let extraNodes = [];

      totalData.edges.forEach((edge) => {
        let source = filteredData.nodes.find(
          (node) => node.key === edge.source
        );
        let target = filteredData.nodes.find(
          (node) => node.key === edge.target
        );

        if (source && target) {
          filteredData.edges.push(edge);
        } else if (source || target) {
          if (source) {
            extraNodes.push(
              totalData.nodes.find((node) => node.key === edge.target)
            );
          }
          if (target) {
            extraNodes.push(
              totalData.nodes.find((node) => node.key === edge.source)
            );
          }

          filteredData.edges.push(edge);
        }
        return false;
      });

      {
        !selectedRank &&
          !selectedState &&
          filteredData.nodes.forEach((node) => {
            if (node?.attributes?.icon == starred)
              node.attributes.icon = starBlue;
            else node.attributes.icon = diamondBlue;
          });
      }

      extraNodes.forEach((node) => {
        if (!filteredData.nodes.some((el) => el.key == node.key))
          filteredData.nodes.push(node);
      });

      displayData = filteredData;
    }

    //filtering based on rank
    if (selectedRank) {
      let filteredData = { nodes: [], edges: [] };

      displayData.nodes.forEach((node) =>
        node.attributes.rank >= parseInt(selectedRank) &&
        node.attributes.rank < parseInt(selectedRank) + 500
          ? filteredData.nodes.push(structuredClone(node))
          : null
      );

      let extraNodes = [];

      displayData.edges.forEach((edge) => {
        let source = filteredData.nodes.find(
          (node) => node.key === edge.source
        );
        let target = filteredData.nodes.find(
          (node) => node.key === edge.target
        );

        if (source && target) {
          filteredData.edges.push(edge);
        } else if (source || target) {
          if (source) {
            extraNodes.push(
              totalData.nodes.find((node) => node.key === edge.target)
            );
          }
          if (target) {
            extraNodes.push(
              totalData.nodes.find((node) => node.key === edge.source)
            );
          }

          filteredData.edges.push(edge);
        }
        return false;
      });

      {
        !selectedState &&
          filteredData.nodes.forEach((node) => {
            if (node?.attributes?.icon == starred)
              node.attributes.icon = starBlue;
            else node.attributes.icon = diamondBlue;
          });
      }

      extraNodes.forEach((node) => {
        if (!filteredData.nodes.some((el) => el.key == node.key))
          filteredData.nodes.push(node);
      });

      displayData = filteredData;
    }

    //filtering based on state
    if (selectedState) {
      let filteredData = { nodes: [], edges: [] };

      displayData.nodes.forEach((node) =>
        node.attributes.state === selectedState
          ? filteredData.nodes.push(structuredClone(node))
          : null
      );

      let extraNodes = [];

      displayData.edges.forEach((edge) => {
        let source = filteredData.nodes.find(
          (node) => node.key === edge.source
        );
        let target = filteredData.nodes.find(
          (node) => node.key === edge.target
        );

        if (source && target) {
          filteredData.edges.push(edge);
        } else if (source || target) {
          if (source) {
            extraNodes.push(
              totalData.nodes.find((node) => node.key === edge.target)
            );
          }
          if (target) {
            extraNodes.push(
              totalData.nodes.find((node) => node.key === edge.source)
            );
          }

          filteredData.edges.push(edge);
        }
        return false;
      });

      {
        filteredData.nodes.forEach((node) => {
          if (node?.attributes?.icon == starred)
            node.attributes.icon = starBlue;
          else node.attributes.icon = diamondBlue;
        });
      }

      extraNodes.forEach((node) => {
        if (!filteredData.nodes.some((el) => el.key == node.key))
          filteredData.nodes.push(node);
      });

      setData(filteredData);
    } else {
      setData(displayData);
    }
  };

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
        {/* <StyledSelect>
          <option value="">Influence Type</option>
          <option value="coauthorship">Co-Authorship</option>
          <option value="coaffiliation">Co-Affiliations</option>
          <option value="citation">Citations</option>
        </StyledSelect> */}

        {/* <div
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
        </div> */}

        {/* <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            INFLUENCE TYPE
          </span>
          <StyledSelect onChange={(e) => setInfluenceLevel(e.target.value)}>
            <option defaultChecked value="1">
              Co-Authorship
            </option>
            <option value="2">Co-Affiliation</option>
          </StyledSelect>
        </div> */}

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
            <option defaultChecked value="1">
              First Level
            </option>
            <option value="2">Second Level</option>
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
              <option value={"others"}>Others</option>
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
              RANK
            </span>
            <StyledSelect
              onChange={(e) => setSelectedRank(e.target.value)}
              value={selectedRank}
            >
              <option value="">All</option>
              {rankRange?.length > 0 &&
                rankRange.map((el, index) => {
                  return (
                    <option key={index} value={el}>
                      {`${el + 1} - ${el + 500}`}
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
              handleFilters();
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
