import React, { useEffect, useState } from "react";

//components
import Graph from "../graph/graph";
import Map from "../map/map";
import Filters from "./filters";
import HcpDetails from "./hcpDetails";
import Legends from "./legends";
import TopHcps from "./topHcps";
import Loader from "./loader";

//apis to fetch data
import { fetchAllData, fetchAffiliations } from "../api";

//utils
import formatResponse from "../utils/formatResponse";
import handleSelectedHcp from "../utils/handleSelectedHcp";
import filterDataBasedOnInfluenceTypes from "../utils/filterDataBasedOnInfluenceTypes";

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

  const [showTopHcps, setShowTopHcps] = useState(true);
  const [topHcps, setTopHcps] = useState([]);

  const specializationList = [
    "internal medicine pediatrics",
    "Neurology",
    "Vascular Neurology",
    "Neuromuscular Medicine",
    "Hematology & Oncology",
    "Psychiatry",
  ];

  const [influenceLevel, setInfluenceLevel] = useState(1);

  const [stateList, setStateList] = useState([]);

  const [influenceTypes, setInfluenceTypes] = useState(["coauthorship"]);

  useEffect(() => {
    if (selectedHcp) setShowHcpDetails(true);
  }, [selectedHcp]);

  useEffect(() => {
    fetchAllData().then((authorship) => {
      fetchAffiliations().then((affiliations) => {
        let formattedResponse = formatResponse(authorship, affiliations);
        setTotalData(formattedResponse.formattedData);
        setData(formattedResponse.formattedData);
        setTopHcps(formattedResponse.topHcps);
        setRankRange(formattedResponse.rankRange);
        setStateList(formattedResponse.stateList);
      });
    });
  }, []);

  useEffect(() => {
    if (selectedHcp?.key)
      handleSelectedHcp(selectedHcp, totalData, setData, influenceLevel);
  }, [selectedHcp, influenceLevel, influenceTypes]);

  // useEffect(() => {
  //   if (influenceTypes.length > 0) {
  //     let filteredData = filterDataBasedOnInfluenceTypes(
  //       totalData,
  //       setData,
  //       influenceTypes
  //     );
  //     setData(filteredData);
  //   }
  // }, [influenceTypes, totalData]);

  useEffect(() => {}, [influenceTypes]);

  // useEffect(() => {
  //   console.log("data", data);
  // }, [data]);

  useEffect(() => {
    console.log(influenceTypes);
  }, [influenceTypes]);

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
        selectedHcp={selectedHcp}
        setInfluenceLevel={setInfluenceLevel}
        stateList={stateList}
        influenceTypes={influenceTypes}
        setInfluenceTypes={setInfluenceTypes}
      />
      <div style={{ width: "100%", height: "550px", position: "relative" }}>
        {totalData?.nodes?.length <= 0 && <Loader />}

        {showHcpDetails && selectedHcp?.key && (
          <HcpDetails
            selectedHcp={selectedHcp}
            setSelectedHcp={setSelectedHcp}
            setShowHcpDetails={setShowHcpDetails}
          />
        )}

        {isGraph ? (
          <Graph data={data} />
        ) : (
          <Map
            selectedHcp={selectedHcp}
            data={data}
            setSelectedHcp={setSelectedHcp}
            setShowHcpDetails={setShowHcpDetails}
          />
        )}
      </div>

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
