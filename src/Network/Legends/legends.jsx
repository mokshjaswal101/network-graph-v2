import React from "react";

//components
import LegendsTop from "./legendsTop";
import LegendsBottom from "./legendsBottom";

const Legends = ({ legends = {} }) => {
  return (
    <>
      <LegendsTop />
      <hr style={{ height: ".5px", backgroundColor: "black" }} />
      <LegendsBottom />
    </>
  );
};

export default Legends;
