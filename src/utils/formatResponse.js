import zipcodes from "zipcodes";

import calcLatLng from "./calcLatLng";
import starred from "../assets/starred.png";
import prescriber from "../assets/prescriber.png";

import specializations from "../data/specializations";

const formatResponse = (
  coauthorshipData,
  referralData,
  setSelectedHcp,
  topKols
) => {
  let kolData = { nodes: [], edges: [] };
  let prescriberData = { nodes: [], edges: [] };
  let prescribers = [];

  //coauthorship coauthorshipData
  kolData.nodes = coauthorshipData?.nodes?.map((el) => {
    let hcpNode = null;
    let zip = calcLatLng(el.attributes.location, el);
    hcpNode = {
      key: el.key,
      location: el.attributes.location,
      attributes: {
        label: el.attributes.label
          .split(" ")
          .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
          .join(" "),
        color:
          specializations[el.attributes.specialization] ||
          specializations["other"],
        state: zip?.state,
        icon: el.attributes.kol ? starred : null,
        lat: parseFloat(zip?.latitude),
        lng: parseFloat(zip?.longitude),
        x: Math.random(),
        y: Math.random(),
        specialization: el.attributes.specialization,
        rank: el.attributes.rank,
        size: "4",
        credentials: el?.attributes?.credentials
          ?.map((el) => el.toUpperCase())
          .join(" "),
      },
    };

    return hcpNode;
  });

  kolData.edges = coauthorshipData?.edges?.map((el, index) => {
    return {
      key: index,
      type:
        el.attributes.label == "co_author"
          ? "coauthorship"
          : el.attributes.label == "citation"
          ? "citation"
          : "coaffiliation",
      source: el.source,
      target: el.target,
      attributes: {
        color:
          el.attributes.label == "co_author"
            ? "#00008B"
            : el.attributes.label == "citation"
            ? "purple"
            : "orange",
        size: el.attributes.weight > 4 ? 4 : el.attributes.weight,
        label: el.attributes.weight,
        type: el.attributes.label == "citation" ? "arrow" : "",
      },
    };
  });

  topKols = topKols?.map((el) => {
    let zip = calcLatLng(el.attributes.location, el);
    return {
      key: el.key,
      location: el.attributes.location,
      attributes: {
        label: el.attributes.label
          .split(" ")
          .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
          .join(" "),
        color:
          specializations[el.attributes.specialization] ||
          specializations["other"],
        state: zip?.state || el.attributes.state,
        icon: el.attributes.kol ? starred : null,
        lat: parseFloat(zip?.latitude),
        lng: parseFloat(zip?.longitude),
        x: Math.random(),
        y: Math.random(),
        specialization: el.attributes.specialization,
        rank: el.attributes.rank,
        size: "4",
        credentials: el?.attributes?.credentials
          ?.map((el) => el.toUpperCase())
          .join(" "),
      },
    };
  });

  prescribers = referralData.topPrescribers.map((el) => {
    let zip = calcLatLng(el.attributes.location, el);
    return {
      key: el.key,
      attributes: {
        label: el?.attributes?.label
          ?.split(" ")
          .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
          .join(" "),
        color:
          specializations[el.attributes.specialization] ||
          specializations["other"],
        state: zip?.state || el.attributes.state,
        icon: el.attributes.prescriber ? prescriber : null,
        lat: parseFloat(zip?.latitude),
        lng: parseFloat(zip?.longitude),
        x: Math.random(),
        y: Math.random(),
        specialization: el.attributes.specialization,
        rank: el.attributes.rank,
        size: "4",
        credentials:
          el?.attributes?.credentials
            ?.map((el) => el.toUpperCase())
            .join(" ") || "",
        currentPractice: el.attributes.current_practice,
        prescriptions: el.attributes.prescriptions,
      },
    };
  });

  //referral coauthorshipData
  prescriberData.nodes = referralData?.nodes?.map((el) => {
    let hcpNode = null;
    let zip = calcLatLng(el.attributes.location, el);
    hcpNode = {
      key: el.key,
      attributes: {
        label: el?.attributes?.label
          ?.split(" ")
          .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
          .join(" "),
        color:
          specializations[el.attributes.specialization] ||
          specializations["other"],
        state: zip?.state || el.attributes.state,
        icon: el.attributes.prescriber ? prescriber : null,
        lat: parseFloat(zip?.latitude),
        lng: parseFloat(zip?.longitude),
        x: Math.random(),
        y: Math.random(),
        specialization: el.attributes.specialization,
        rank: el.attributes.rank,
        size: "4",
        credentials:
          el?.attributes?.credentials
            ?.map((el) => el.toUpperCase())
            .join(" ") || "",
        currentPractice: el.attributes.current_practice,
        prescriptions: el.attributes.prescriptions,
      },
    };
    return hcpNode;
  });

  prescriberData.edges = referralData?.edges?.map((el, index) => {
    return {
      key: kolData.edges.length + 1 + index,
      type: "referral",
      source: el.source,
      target: el.target,
      attributes: {
        color: "#008080",
        size: el.attributes?.weight * 0.1 > 6 ? 6 : el.attributes.weight,
        label: el?.attributes.weight
          ? `Unique Patients referred : ${el.attributes.weight}`
          : "",
        type: "arrow",
      },
    };
  });

  setSelectedHcp(topKols?.[0]);

  // console.log("time for formatting: ", (new Date() - date) / 1000);
  // console.log("top kols:", topKols.length);

  prescriberData.nodes = [...prescriberData.nodes, ...prescribers];
  kolData.nodes = [...kolData.nodes, ...topKols];
  return { kolData, prescriberData, topKols, prescribers };
};

export default formatResponse;
