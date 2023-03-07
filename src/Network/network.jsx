import React, { useEffect, useState } from "react";

//components
import Graph from "../graph/graph";
import Map from "../map/map";
import Filters from "./Filters/filters";
import HcpDetails from "./HcpDetails/hcpDetails";
import Legends from "./Legends/legends";
import TopKols from "./TopKols/topKols";
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
  const [KolsOffset, setKolsOffset] = useState(0);

  //hcp details
  const [selectedHcp, setSelectedHcp] = useState(null);
  const [isHcpDetailsShown, setIsHcpDetailsShown] = useState(false);

  //top KOLs
  const [showTopHcps, setShowTopHcps] = useState(true);
  const [topKols, setTopHcps] = useState([]);

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
        KolsOffset,
        formattedResponse.topKols
      );
      setTotalData(formattedResponse.formattedData);
      setTopHcps(formattedResponse.topKols);
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
      KolsOffset,
      topKols
    );
  }, [influenceLevel, influenceTypes, selectedHcp, KolsOffset]);

  //display hcp details when selected hcp changes
  useEffect(() => {
    if (selectedHcp?.key) setIsHcpDetailsShown(true);
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
        KolsOffset={KolsOffset}
        topKols={topKols}
        data={data}
      />
      <div style={{ width: "100%", height: "550px", position: "relative" }}>
        {totalData?.nodes?.length <= 0 && <Loader />}

        {isHcpDetailsShown && selectedHcp?.key && (
          <HcpDetails
            selectedHcp={selectedHcp}
            setSelectedHcp={setSelectedHcp}
            setIsHcpDetailsShown={setIsHcpDetailsShown}
          />
        )}

        {showTopHcps && (
          <TopKols
            topKols={topKols}
            setSelectedHcp={setSelectedHcp}
            setShowTopHcps={setShowTopHcps}
            selectedHcp={selectedHcp}
            KolsOffset={KolsOffset}
            setKolsOffset={setKolsOffset}
          />
        )}

        {isGraph ? (
          <Graph data={data} />
        ) : (
          <Map
            selectedHcp={selectedHcp}
            data={data}
            setSelectedHcp={setSelectedHcp}
            setIsHcpDetailsShown={setIsHcpDetailsShown}
          />
        )}
      </div>

      <Legends />
    </div>
  );
};

export default Network;
