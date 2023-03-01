import React from "react";

const TopHcps = ({
  topHcps = [],
  setSelectedHcp,
  setShowTopHcps,
  selectedHcp,
}) => {
  return (
    topHcps?.length > 0 && (
      <div
        style={{
          position: "absolute",
          width: "200px",
          top: "50%",
          height: "fit-content",
          maxHeight: "75%",
          background: "white",
          transform: "translateY(-50%)",
          border: "1px solid black",
          boxShadow: "0 0 7px 0 rgba(0,0,0,0.5)",
          borderRadius: "3px",
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
        <b style={{ fontSize: "1.2rem" }}>TOP KOLs</b>
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
                checked={selectedHcp?.key === hcp?.key || false}
              />
              <div>
                {hcp.attributes.label + ", " + hcp.attributes.credentials}
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default TopHcps;
