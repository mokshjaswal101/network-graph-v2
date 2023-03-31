import React from "react";

//icons
import starred from "../../assets/starred.png";
import prescriber from "../../assets/prescriber.png";
import diamondblue from "../../assets/diamondblue.png";
// import bluestar from "../../assets/bluestar.png";

const LegendsTop = ({ isPrescriberShown }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: ".75rem",
        marginTop: ".5rem",
      }}
    >
      {/* Icon Legends */}
      <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
        <img src={diamondblue} style={{ height: "16px" }} />
        <div>Filtered Hcps</div>
      </div>
      {!isPrescriberShown ? (
        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
          <img src={starred} style={{ height: "16px" }} />
          <div>Top KOLs</div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
          <img src={prescriber} style={{ height: "16px" }} />
          <div>Prescribers</div>
        </div>
      )}

      {/* Level of influence */}
      {!isPrescriberShown ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
            <div
              style={{
                width: "16px",
                height: "5px",
                background: "orange",
              }}
            ></div>
            <div>Affiliations</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
            <div
              style={{
                width: "16px",
                height: "5px",
                background: "#00008B",
              }}
            ></div>
            <div>Co-Authorship</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
            <div
              style={{
                width: "16px",
                height: "5px",
                background: "purple",
              }}
            ></div>
            <div>Citations</div>
          </div>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
          <div
            style={{
              width: "16px",
              height: "5px",
              background: "#008080",
            }}
          ></div>
          <div>Referral</div>
        </div>
      )}

      {/* Level of Influeunces */}
      <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
        <div
          style={{
            width: "16px",
            height: "5px",
            background: "black",
          }}
        ></div>
        <div>First Level Influence</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justContent: "center",
            gap: ".2rem",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "5px",
              background: "black",
            }}
          ></div>
          <div
            style={{
              width: "8px",
              height: "5px",
              background: "black",
            }}
          ></div>
          <div
            style={{
              width: "8px",
              height: "5px",
              background: "black",
            }}
          ></div>
        </div>
        <div>Second Level Influence</div>
      </div>
    </div>
  );
};

export default LegendsTop;
