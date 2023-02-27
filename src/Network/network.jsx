import React, { useEffect, useState } from "react";

//components
import Graph from "../graph/graph";
import Map from "../map/map";
import Filters from "./filters";
import HcpDetails from "./hcpDetails";
import Legends from "./legends";
import TopHcps from "./topHcps";

//apis to fetch data
import { fetchAllData } from "../api";

//utils
import formatResponse from "../utils/formatResponse";
import handleSelectedHcp from "../utils/handleSelectedHcp";

const Network = () => {
  const [isGraph, setIsGraph] = useState(false);

  const [totalData, setTotalData] = useState({ nodes: [], edges: [] });
  const [data, setData] = useState({ nodes: [], edges: [] });

  const [selectedHcp, setSelectedHcp] = useState(null);
  const [showHcpDetails, setShowHcpDetails] = useState(false);

  const [legends, setLegends] = useState({
    "internal medicine pediatrics": "#827ad5",
    Neurology: "#63af34",
    "Vascular Neurology": "#af2cb3",
    "Neuromuscular Medicine": "#bfd247",
    "Hematology & Oncology": "#27360b",
    Psychiatry: "#60b6e2",
  });

  const [rankRange, setRankRange] = useState(null);

  const [showTopHcps, setShowTopHcps] = useState(false);
  const [topHcps, setTopHcps] = useState([]);

  const specializationList = [
    "internal medicine pediatrics",
    "Neurology",
    "Vascular Neurology",
    "Neuromuscular Medicine",
    "Hematology & Oncology",
    "Psychiatry",
  ];

  useEffect(() => {
    if (selectedHcp) setShowHcpDetails(true);
  }, [selectedHcp]);

  useEffect(() => {
    fetchAllData().then((res) => {
      let formattedResponse = formatResponse(res);
      setTotalData(formattedResponse.formattedData);
      setData(formattedResponse.formattedData);
      setTopHcps(formattedResponse.topHcps);
      setRankRange(formattedResponse.rankRange);
      console.log(formattedResponse);
    });
  }, []);

  useEffect(() => {
    if (selectedHcp?.key) handleSelectedHcp(selectedHcp, totalData, setData);
    else setData(totalData);
  }, [selectedHcp]);

  return (
    <div style={{ padding: "1rem", position: "relative" }}>
      <Filters
        setIsGraph={setIsGraph}
        isGraph={isGraph}
        setSelectedHcp={setSelectedHcp}
        showTopHcps={showTopHcps}
        setShowTopHcps={setShowTopHcps}
        totalData={totalData}
        setData={setData}
        specializationList={specializationList}
        rankRange={rankRange}
      />
      <div>
        {isGraph ? (
          <Graph data={data} />
        ) : (
          <Map data={data} setSelectedHcp={setSelectedHcp} />
        )}
      </div>
      {showHcpDetails && selectedHcp?.key && (
        <HcpDetails
          selectedHcp={selectedHcp}
          setSelectedHcp={setSelectedHcp}
          setShowHcpDetails={setShowHcpDetails}
        />
      )}
      <Legends legends={legends} selectedHcp={selectedHcp} />

      {showTopHcps && (
        <TopHcps
          topHcps={topHcps}
          setSelectedHcp={setSelectedHcp}
          setShowTopHcps={setShowTopHcps}
          selectedHcp={selectedHcp}
        />
      )}
    </div>
  );
};

export default Network;
