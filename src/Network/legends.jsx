import React from "react";
import starred from "../assets/starred.png";
import diamondblue from "../assets/diamondblue.png";
import bluestar from "../assets/bluestar.png";

const Legends = ({ legends = {}, selectedHcp }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".3rem",
          marginTop: ".5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
          <img src={diamondblue} style={{ height: "16px" }} />
          <div style={{ color: "black" }}>Filtered Hcps</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
          <img src={starred} style={{ height: "16px" }} />
          <div style={{ color: "black" }}>Top KOLs</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
          <div
            style={{
              width: "16px",
              height: "5px",
              background: "rgba(251, 192, 147, 0.7)",
            }}
          ></div>
          <div style={{ color: "black" }}>Affiliations</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
          <div
            style={{
              width: "16px",
              height: "5px",
              background: "rgba(3,169,244,0.3)",
            }}
          ></div>
          <div style={{ color: "black" }}>Co-Authorship</div>
        </div>

        {selectedHcp?.key && (
          <>
            <div
              style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
            >
              <div
                style={{
                  width: "16px",
                  height: "5px",
                  background: "rgba(255, 99, 71, 1)",
                }}
              ></div>
              <div style={{ color: "black" }}>First Level Influence</div>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
            >
              <div
                style={{
                  width: "16px",
                  height: "5px",
                  background: "rgba(255,255,0, 0.7)",
                }}
              ></div>
              <div style={{ color: "black" }}>Second Level Influence</div>
            </div>
          </>
        )}
      </div>
      <hr style={{ height: ".5px", width: "100%", backgroundColor: "black" }} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".5rem",
        }}
      >
        {Object.entries(legends)?.map((el, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  background: `${el[1]}`,
                }}
              ></div>
              <div style={{ color: "black" }}>
                {el[0]
                  .split(" ")
                  .map((el) => el[0].toUpperCase() + el.slice(1))
                  .join(" ")}
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              background: `#275E40`,
            }}
          ></div>
          <div style={{ color: "black" }}>Others</div>
        </div>
      </div>
    </>
  );
};

export default Legends;
