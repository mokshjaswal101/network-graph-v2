import React from "react";

const TopHcps = ({
  topHcps = [],
  setSelectedHcp,
  setShowTopHcps,
  selectedHcp,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "15%",
        top: "50%",
        height: "fit-content",
        maxHeight: "80%",
        background: "white",
        transform: "translateY(-50%)",
        border: "1px solid black",
        boxShadow: "0 0 7px 0 black",
        borderRadius: "5px",
        padding: "1rem",
        color: "black",
        zIndex: 1000,
        left: "1rem",
        overflowY: "scroll",
      }}
    >
      <button
        onClick={() => {
          setShowTopHcps(false);
        }}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          cursor: "pointer",
        }}
      >
        X
      </button>
      <b style={{ fontSize: "1.5rem" }}>Top KOLs</b>
      {topHcps.map((hcp, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              fontSize: "1rem",
              margin: ".5rem 0",
            }}
          >
            <input
              type="radio"
              name="tophcp"
              value={hcp}
              onChange={() => setSelectedHcp(hcp)}
            />
            <div>{hcp.attributes.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TopHcps;
