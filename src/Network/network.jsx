import React, { useEffect, useState } from "react";

//components
import Graph from "../graph/graph";
import Map from "../map/map";
import Filters from "./filters";
import HcpDetails from "./hcpDetails";
import Legends from "./Legends/legends";
import TopHcps from "./topHcps";
import Loader from "./loader";

//apis to fetch data
import { fetchAllData, fetchAffiliations, fetchCitations } from "../api";

//utils
import formatResponse from "../utils/formatResponse";
import filterData from "../utils/filterData";

const Network = () => {
  const [isGraph, setIsGraph] = useState(false);

  //data variables
  const [totalData, setTotalData] = useState({ nodes: [], edges: [] });
  const [data, setData] = useState({ nodes: [], edges: [] });

  //which KOLs to display
  const [shownKols, setShownKols] = useState(0);

  //hcp details
  const [selectedHcp, setSelectedHcp] = useState(null);
  const [showHcpDetails, setShowHcpDetails] = useState(false);

  //top KOLs
  const [showTopHcps, setShowTopHcps] = useState(true);
  const [topHcps, setTopHcps] = useState([]);

  //influence variables
  const [influenceLevel, setInfluenceLevel] = useState(1);
  const [influenceTypes, setInfluenceTypes] = useState(["coauthorship"]);

  //advanced Filter variables
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [stateList, setStateList] = useState([]);
  const [specializationList, setSpecializationList] = useState([]);

  //handle initial loading of data
  useEffect(() => {
    fetchAllData().then((res) => {
      let formattedResponse = formatResponse(
        res.co_author,
        res.co_affiliation,
        res.citation,
        res.referral
      );

      filterData(
        formattedResponse.formattedData,
        setData,
        influenceTypes,
        influenceLevel,
        selectedHcp,
        selectedSpecialization,
        selectedState,
        setStateList,
        setSpecializationList,
        setSelectedState,
        setSelectedSpecialization,
        shownKols,
        formattedResponse.topHcps
      );
      setTotalData(formattedResponse.formattedData);
      setTopHcps(formattedResponse.topHcps);
    });
  }, []);

  //filter data based on filter changes
  useEffect(() => {
    filterData(
      totalData,
      setData,
      influenceTypes,
      influenceLevel,
      selectedHcp,
      selectedSpecialization,
      selectedState,
      setStateList,
      setSpecializationList,
      setSelectedState,
      setSelectedSpecialization,
      shownKols,
      topHcps
    );
  }, [influenceLevel, influenceTypes, selectedHcp, shownKols]);

  //display hcp details when selected hcp changes
  useEffect(() => {
    if (selectedHcp?.key) setShowHcpDetails(true);
  }, [selectedHcp?.key]);

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
        selectedHcp={selectedHcp}
        influenceLevel={influenceLevel}
        setInfluenceLevel={setInfluenceLevel}
        stateList={stateList}
        influenceTypes={influenceTypes}
        setInfluenceTypes={setInfluenceTypes}
        selectedSpecialization={selectedSpecialization}
        setSelectedSpecialization={setSelectedSpecialization}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        setStateList={setStateList}
        setSpecializationList={setSpecializationList}
        shownKols={shownKols}
        topHcps={topHcps}
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

        {showTopHcps && (
          <TopHcps
            topHcps={topHcps}
            setSelectedHcp={setSelectedHcp}
            setShowTopHcps={setShowTopHcps}
            selectedHcp={selectedHcp}
            shownKols={shownKols}
            setShownKols={setShownKols}
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

      <Legends />
    </div>
  );
};

export default Network;
