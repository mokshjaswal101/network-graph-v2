import React from "react";

//components
import LegendsTop from "./legendsTop";
import LegendsBottom from "./legendsBottom";

const Legends = ({ isPrescriberShown }) => {
  return (
    <>
      <LegendsTop isPrescriberShown={isPrescriberShown} />
      <hr
        style={{
          height: "1px",
          backgroundColor: "var(--color-bg)",
          border: "none",
        }}
      />
      <LegendsBottom />
    </>
  );
};

export default Legends;
