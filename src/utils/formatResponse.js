import zipcodes from "zipcodes";

import starred from "../assets/starred.png";

const formatResponse = (data) => {
  let formattedData = { nodes: [], edges: [] };

  let topHcps = [];

  formattedData.nodes = data.nodes.map((el) => {
    let zip = zipcodes.lookup(el.attributes.zipcode) || zipcodes.random();

    let hcpNode = {
      key: el.key,
      attributes: {
        label: el.attributes.label
          .split(" ")
          .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
          .join(""),
        color: el.attributes.color,
        zipcode: el.attributes.zipcode,
        icon: el.attributes.kol ? starred : null,
        lat: parseFloat(zip?.latitude),
        lng: parseFloat(zip?.longitude),
        x: Math.random(),
        y: Math.random(),
        specialization: el.attributes.specialization,
        rank: el.attributes.rank,
        size: "4",
      },
    };

    if (el.attributes.kol) topHcps.push(hcpNode);

    return hcpNode;
  });

  formattedData.edges = data.edges.map((el, index) => {
    return {
      key: index,
      source: el.source,
      target: el.target,
      attributes: {
        color: el.attributes.color,
        size: 0.1,
        label: el.attributes.label,
      },
    };
  });

  let rankMax = Math.max(...data.nodes.map((el) => el.attributes.rank));
  let rankRange = [];

  for (let i = 0; i < rankMax; i += 500) {
    rankRange.push(i);
  }

  return { formattedData, topHcps, rankRange };
};

export default formatResponse;
