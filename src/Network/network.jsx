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
  const [kolData, setKolData] = useState({ nodes: [], edges: [] });
  const [prescriberData, setPrescriberData] = useState({
    nodes: [],
    edges: [],
  });
  const [totalData, setTotalData] = useState({ nodes: [], edges: [] });
  const [data, setData] = useState({ nodes: [], edges: [] });

  // show Kols or Prescribers
  const [isPrescriberShown, setIsPrescriberShown] = useState(false);

  //which KOLs to display
  const [KolsOffset, setKolsOffset] = useState(0);

  //hcp details
  const [selectedHcp, setSelectedHcp] = useState(null);
  const [isHcpDetailsShown, setIsHcpDetailsShown] = useState(false);

  //top KOLs and prescribers
  const [isTopHcpsShown, setIsTopHcpsShown] = useState(true);
  const [kols, setKols] = useState([]);
  const [prescribers, setPrescribers] = useState([]);
  const [topKols, setTopKols] = useState([]);

  //influence variables
  const [influenceLevel, setInfluenceLevel] = useState(1);
  const [influenceTypes, setInfluenceTypes] = useState(["coauthorship"]);

  //advanced Filter variables
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [stateList, setStateList] = useState([]);
  const [specializationList, setSpecializationList] = useState([]);

  //loader
  const [isLoading, setIsLoading] = useState(true);

  const handleFilters = async () => {
    // await setStateAsync(true);

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

    // await setStateAsync(false);
  };

  //handle initial loading of data
  useEffect(() => {
    fetchAllData().then((res) => {
      let formattedResponse = formatResponse(
        res.co_author,
        res.co_affiliation,
        res.citation,
        res.referral,
        setSelectedHcp
      );

      filterData(
        formattedResponse.kolData,
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

      setTotalData(formattedResponse.kolData);
      setKolData(formattedResponse.kolData);
      setPrescriberData(formattedResponse.prescriberData);
      setPrescribers(formattedResponse.prescribers);
      setTopKols(formattedResponse.topKols);
      setKols(formattedResponse.topKols);

      setIsLoading(false);
    });
  }, []);

  //filter data based on filter changes
  useEffect(() => {
    handleFilters();
  }, [influenceLevel, influenceTypes, selectedHcp?.key, KolsOffset, topKols]);

  //display hcp details when selected hcp changes
  useEffect(() => {
    if (selectedHcp?.key) setIsHcpDetailsShown(true);
  }, [selectedHcp?.key]);

  useEffect(() => {
    if (isPrescriberShown) {
      setInfluenceTypes(["referral"]);
      setTotalData(prescriberData);
      setTopKols(prescribers);
      setSelectedHcp(prescribers?.[0]);
    } else {
      setInfluenceTypes(["coauthorship"]);
      setTotalData(kolData);
      setTopKols(kols);
      setSelectedHcp(kols?.[0]);
    }
  }, [isPrescriberShown]);

  return (
    <div style={{ padding: "1rem", position: "relative" }}>
      <Filters
        setIsGraph={setIsGraph}
        isGraph={isGraph}
        setSelectedHcp={setSelectedHcp}
        isTopHcpsShown={isTopHcpsShown}
        setIsTopHcpsShown={setIsTopHcpsShown}
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
        setIsPrescriberShown={setIsPrescriberShown}
        isPrescriberShown={isPrescriberShown}
        setKolsOffset={setKolsOffset}
      />
      <div style={{ width: "100%", height: "550px", position: "relative" }}>
        {isLoading && <Loader />}

        {isHcpDetailsShown && selectedHcp?.key && (
          <HcpDetails
            selectedHcp={selectedHcp}
            setSelectedHcp={setSelectedHcp}
            setIsHcpDetailsShown={setIsHcpDetailsShown}
            isPrescriberShown={isPrescriberShown}
          />
        )}

        {isTopHcpsShown && (
          <TopKols
            topKols={topKols}
            setSelectedHcp={setSelectedHcp}
            setIsTopHcpsShown={setIsTopHcpsShown}
            selectedHcp={selectedHcp}
            KolsOffset={KolsOffset}
            setKolsOffset={setKolsOffset}
            isPrescriberShown={isPrescriberShown}
          />
        )}

        {isGraph ? (
          <Graph
            selectedHcp={selectedHcp}
            data={data}
            setSelectedHcp={setSelectedHcp}
            setIsHcpDetailsShown={setIsHcpDetailsShown}
          />
        ) : (
          <Map
            selectedHcp={selectedHcp}
            data={data}
            setSelectedHcp={setSelectedHcp}
            setIsHcpDetailsShown={setIsHcpDetailsShown}
            setIsLoading={setIsLoading}
            totalData={totalData}
            influenceTypes={influenceTypes}
            setData={setData}
          />
        )}
      </div>

      <Legends
        isPrescriberShown={isPrescriberShown}
        specializationList={specializationList}
      />
    </div>
  );
};

export default Network;
