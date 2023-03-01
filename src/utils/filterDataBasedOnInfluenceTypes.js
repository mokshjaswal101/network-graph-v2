const filterDataBasedOnInfluenceTypes = (
  totalData,
  setData,
  influenceTypes
) => {
  let filteredData = {
    nodes: [],
    edges: [],
  };

  filteredData.edges = totalData.edges.filter((edge) => {
    return influenceTypes.includes(edge.type);
  });

  filteredData.edges.forEach((edge) => {
    if (!filteredData.nodes.find((node) => node.key === edge.key)) {
      filteredData.nodes.push(
        totalData.nodes.find((el) => el.key == edge.source)
      );
      filteredData.nodes.push(
        totalData.nodes.find((el) => el.key == edge.target)
      );
    }
  });
  console.log(filteredData);
  setData(filteredData);
};

export default filterDataBasedOnInfluenceTypes;
