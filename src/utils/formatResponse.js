import zipcodes from "zipcodes";

import starred from "../assets/starred.png";

import specializations from "../data/specializations";

const formatResponse = (
  data,
  affiliationsData,
  citationsData,
  referralData
) => {
  let formattedData = { nodes: [], edges: [] };

  let topKols = [];
  let date = new Date();
  let count = 0;

  //coauthorship data
  formattedData.nodes = data?.nodes?.map((el) => {
    let hcpNode = null;
    let zip = zipcodes.lookup(el.attributes.zipcode) || zipcodes.random();
    if (!el?.attributes?.zipcode && !el?.attributes?.state) count++;
    hcpNode = {
      key: el.key,
      attributes: {
        label: el.attributes.label
          .split(" ")
          .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
          .join(" "),
        color:
          specializations[el.attributes.specialization] ||
          specializations["other"],
        state: zip?.state,
        zipcode: el.attributes.zipcode,
        icon: el.attributes.kol ? starred : null,
        lat: parseFloat(zip?.latitude),
        lng: parseFloat(zip?.longitude),
        x: Math.random(),
        y: Math.random(),
        specialization: el.attributes.specialization,
        rank: el.attributes.rank,
        size: "4",
        credentials: el.attributes.credentials
          .map((el) => el.toUpperCase())
          .join(" "),
      },
    };

    if (el.attributes.kol) topKols.push(hcpNode);

    return hcpNode;
  });

  formattedData.edges = data?.edges?.map((el, index) => {
    return {
      key: index,
      type: "coauthorship",
      source: el.source,
      target: el.target,
      attributes: {
        color: "#0047ab",
        size: el.attributes.weight || 0.1,
        label: el.attributes.label,
      },
    };
  });

  //affiliations data
  affiliationsData?.nodes?.forEach((node) => {
    let hcpNode = null;
    let zip = zipcodes.lookup(node.attributes.zipcode) || zipcodes.random();

    if (!node?.attributes?.zipcode && !node?.attributes?.state) count++;
    hcpNode = {
      key: node.key,
      attributes: {
        label: node.attributes.label
          .split(" ")
          .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
          .join(" "),
        color:
          specializations[node.attributes.specialization] ||
          specializations["other"],
        state: zip?.state,
        zipcode: node.attributes.zipcode,
        icon: node.attributes.kol ? starred : null,
        lat: parseFloat(zip?.latitude),
        lng: parseFloat(zip?.longitude),
        x: Math.random(),
        y: Math.random(),
        specialization: node.attributes.specialization,
        rank: node.attributes.rank,
        size: "4",
        affiliation: node.attributes.affiliation,
        credentials: node.attributes.credentials
          .map((el) => el.toUpperCase())
          .join(" "),
      },
    };

    if (!formattedData.nodes.find((el) => el.key === hcpNode.key)) {
      formattedData.nodes.push(hcpNode);
    }
    if (node.attributes.kol && !topKols.some((top) => top.key == hcpNode.key))
      topKols.push(hcpNode);
  });

  affiliationsData?.edges?.forEach((el, index) => {
    let edge = {
      key: formattedData.edges.length + 1,
      type: "coaffiliation",
      source: el.source,
      target: el.target,
      attributes: {
        color: "orange",
        size: el.attributes.weight || 1,
        label: el.attributes.label,
      },
    };

    formattedData.edges.push(edge);
  });

  //Citations Data
  citationsData?.nodes?.forEach((node) => {
    let hcpNode = null;
    let zip = zipcodes.lookup(node.attributes.zipcode) || zipcodes.random();

    if (!node?.attributes?.zipcode && !node?.attributes?.state) count++;
    hcpNode = {
      key: node.key,
      attributes: {
        label: node.attributes.label
          .split(" ")
          .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
          .join(" "),
        color:
          specializations[node.attributes.specialization] ||
          specializations["other"],
        state: zip?.state,
        zipcode: node.attributes.zipcode,
        icon: node.attributes.kol ? starred : null,
        lat: parseFloat(zip?.latitude),
        lng: parseFloat(zip?.longitude),
        x: Math.random(),
        y: Math.random(),
        specialization: node.attributes.specialization,
        rank: node.attributes.rank,
        size: "4",
        affiliation: node.attributes.affiliation,
        credentials: node.attributes.credentials
          .map((el) => el.toUpperCase())
          .join(" "),
      },
    };

    if (!formattedData.nodes.find((el) => el.key === hcpNode.key)) {
      formattedData.nodes.push(hcpNode);
    }
    if (node.attributes.kol && !topKols.some((top) => top.key == hcpNode.key))
      topKols.push(hcpNode);
  });

  citationsData?.edges?.forEach((el, index) => {
    let edge = {
      key: formattedData.edges.length + 1,
      type: "citation",
      source: el.source,
      target: el.target,
      attributes: {
        color: "rgba(80,00,88, 0.6)",
        size: el.attributes.weight * 0.15 || 0.1,
        label: el.attributes.label,
        type: "arrow",
      },
    };

    formattedData.edges.push(edge);
  });

  //referral data
  referralData?.nodes?.forEach((node) => {
    let hcpNode = null;
    let zip = zipcodes.lookup(node.attributes.zipcode) || zipcodes.random();

    if (!node?.attributes?.zipcode && !node?.attributes?.state) count++;
    hcpNode = {
      key: node.key,
      attributes: {
        label: node.attributes.label
          .split(" ")
          .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
          .join(" "),
        color:
          specializations[node.attributes.specialization] ||
          specializations["other"],
        state: zip?.state,
        zipcode: node.attributes.zipcode,
        icon: node.attributes.kol ? starred : null,
        lat: parseFloat(zip?.latitude),
        lng: parseFloat(zip?.longitude),
        x: Math.random(),
        y: Math.random(),
        specialization: node.attributes.specialization,
        rank: node.attributes.rank,
        size: "4",
        affiliation: node.attributes.affiliation,
        credentials: node?.attributes?.credentials
          ?.map((el) => el.toUpperCase())
          .join(" "),
      },
    };

    if (!formattedData.nodes.find((el) => el.key === hcpNode.key)) {
      formattedData.nodes.push(hcpNode);
    }
    if (node.attributes.kol && !topKols.some((top) => top.key == hcpNode.key))
      topKols.push(hcpNode);
  });

  referralData?.edges?.forEach((el, index) => {
    let edge = {
      key: formattedData.edges.length + 1,
      type: "referral",
      source: el.source,
      target: el.target,
      attributes: {
        color: "#008080",
        size: el.attributes.weight || 1,
        label: el.attributes.label,
        type: "arrow",
      },
    };

    formattedData.edges.push(edge);
  });

  console.log("time for formatting: ", (new Date() - date) / 1000);
  console.log("Nodes without zip and state:", count);
  console.log("top kols:", topKols.length);
  return { formattedData, topKols };
};

export default formatResponse;
