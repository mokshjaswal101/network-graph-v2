import React from "react";

//Legends data
import Specializations from "../../data/specializations";

const LegendsBottom = ({ specializationList }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: ".75rem",
      }}
    >
      {Object.entries(Specializations)
        .filter((el) => specializationList.includes(el[0]) || el[0] == "other")
        ?.map((el, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".3rem",
                wrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  background: `${el[1]}`,
                }}
              ></div>
              <div>
                {el[0]
                  .split(" ")
                  .map((el) => el[0].toUpperCase() + el.slice(1))
                  .join(" ")}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LegendsBottom;
