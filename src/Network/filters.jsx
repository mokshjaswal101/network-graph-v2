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
  width: 150px;
  border: 1px solid black;
  background: white;
  color: black;
  padding: 4px 5px;
  font-size: 14px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 4px 4px 2px;
  }
`;

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
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedRank, setSelectedRank] = useState("");

  const handleResetFilters = () => {
    setSelectedHcp("");
    setSelectedSpecialization("");
    setData(totalData);
  };

  const handleFilters = () => {
    let displayData = { nodes: [], edges: [] };

    //filtering based on specialization
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

      console.log("filteredData", filteredData);

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
        }

        if (source || target) {
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
          filteredData.nodes.forEach((node) => {
            if (node?.attributes?.icon == starred)
              node.attributes.icon = starBlue;
            else node.attributes.icon = diamondBlue;
          });
      }

      extraNodes.forEach((node) => filteredData.nodes.push(node));

      displayData = filteredData;
    } else {
      displayData = structuredClone(totalData);
    }

    //filtering based on rank
    if (selectedRank) {
      let filteredData = { nodes: [], edges: [] };

      displayData.nodes.forEach((node) =>
        node.attributes.rank >= selectedRank &&
        node.attributes.rank < selectedRank + 500
          ? filteredData.nodes.push(structuredClone(node))
          : null
      );

      console.log("filteredData", filteredData);

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
        }

        if (source || target) {
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

      filteredData.nodes.forEach((node) => {
        if (node?.attributes?.icon == starred) node.attributes.icon = starBlue;
        else node.attributes.icon = diamondBlue;
      });

      extraNodes.forEach((node) => filteredData.nodes.push(node));

      setData(filteredData);
    } else {
      setData(displayData);
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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
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

        {/* <text style={{ fontSize: "24px" }}>Influence Level</text>
        <select>
          <option value="coauthorship">First Level</option>
          <option value="coaffiliation">Second Level</option>
        </select> */}
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
            height: "75px",
            border: "1px solid black",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
            position: "absolute",
            top: "110%",
            right: "0",
            zIndex: 100000,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            fontSize: "2rem",
            padding: "0 1rem",
          }}
        >
          <h1 style={{ fontSize: "1.2rem" }}>Specialization</h1>
          <select
            style={{
              padding: ".5rem 1rem",
              width: "150px",
            }}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            value={selectedSpecialization}
          >
            <option value="">All</option>
            {specializationList.map((el, index) => {
              return (
                <option key={index} value={el}>
                  {el}
                </option>
              );
            })}
            <option value={"others"}>Others</option>
          </select>

          <h1 style={{ fontSize: "1.2rem" }}>Rank</h1>
          <select
            style={{
              padding: ".5rem 1rem",
              width: "150px",
            }}
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
          </select>

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
