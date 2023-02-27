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
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);

  const handleResetFilters = () => {
    setSelectedHcp(null);
    setSelectedSpecialization(null);
    setData(totalData);
  };

  const handleFilters = () => {
    let displayData = { nodes: [], edges: [] };

    //plan1
    //plan2

    if (selectedRank != "") {
      let extraNodes = [];
      console.log("in");

      totalData.nodes.forEach((node) => {
        if (
          node.attributes.rank >= parseInt(selectedRank) &&
          node.attributes.rank < parseInt(selectedRank) + 500
        ) {
          console.log(selectedRank, selectedRank + 500);
          let newNode = structuredClone(node);
          if (!newNode.attributes.icon) newNode.attributes.icon = diamondBlue;
          else if (newNode.attributes.icon == starred)
            newNode.attributes.icon = starBlue;
          if (!displayData.nodes.includes(node))
            displayData.nodes.push(newNode);
        }
      });

      displayData.nodes.forEach((node) => {
        if (
          node.attributes.rank < selectedRank ||
          node.attributes.rank >= selectedRank + 500
        )
          node.attributes.icon = null;
      });

      displayData.nodes.forEach((node) => {
        totalData.edges.forEach((edge) => {
          if (edge.source == node.key || edge.target == node.key) {
            if (edge.source == node.key) extraNodes.push(edge.target);
            if (edge.target == node.key) extraNodes.push(edge.source);
            if (!displayData.edges.includes(edge)) displayData.edges.push(edge);
          }
        });
      });

      console.log(selectedRank, displayData);

      totalData.nodes.forEach((node) => {
        if (
          node.attributes.rank < selectedRank ||
          node.attributes.rank >= selectedRank + 500
        )
          if (
            extraNodes.includes(node.key) &&
            !displayData.nodes.includes(node)
          ) {
            displayData.nodes.push(node);
          }
      });
    } else {
      displayData.nodes = totalData.nodes;
      displayData.edges = totalData.edges;
    }

    if (selectedSpecialization && selectedSpecialization != "") {
      let newData = { nodes: [], edges: [] };

      console.log("on");
      if (selectedSpecialization == "others") {
        newData.nodes = displayData.nodes.filter((el) => {
          return !specializationList.includes(el.attributes.specialization);
        });
      } else {
        newData.nodes = displayData.nodes.filter((el) => {
          return el.attributes.specialization == selectedSpecialization;
        });
      }
      newData.edges = displayData.edges.filter((el) => {
        return (
          newData.nodes.some((node) => node.key == el.source) &&
          newData.nodes.some((node) => node.key == el.target)
        );
      });

      setData(newData);
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
            background: "#0079fb",
          }}
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        >
          Show Filters
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
          style={{
            background: "green",
          }}
          onClick={() => {
            setShowTopHcps(!showTopHcps);
          }}
        >
          Top KOLs
        </StyledButton>

        {showFilters && (
          <div
            style={{
              height: "75px",
              border: "1px solid black",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
              backgroundColor: "white",
              position: "absolute",
              top: "110%",
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

      {/* button to toggle between graph and map */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginRight: "5px",
        }}
      >
        <StyledButton
          style={{ background: isGraph ? "red" : "green" }}
          onClick={() => {
            setIsGraph(!isGraph);
          }}
        >
          {isGraph ? "Show Map" : "Show Graph"}
        </StyledButton>
      </div>
    </div>
  );
};

export default Filters;
