const handleSelectedHcp = (selectedHcp, totalData, setData) => {
  let newData = {
    nodes: [],
    edges: [],
  };

  totalData?.edges?.forEach((element) => {
    if (
      element.source == selectedHcp.key ||
      element.target == selectedHcp.key
    ) {
      let newElement = structuredClone(element);
      newElement.attributes.color = "rgba(255, 99, 71, 0.5)";
      newData.edges.push(newElement);
    }
  });

  newData.nodes.push(selectedHcp);

  totalData?.nodes?.forEach((element) => {
    newData.edges.forEach((edge) => {
      if (
        element.key != selectedHcp.key &&
        !newData.nodes.some((x) => x.key == element.key) &&
        (element.key == edge.source || element.key == edge.target)
      ) {
        newData.nodes.push(element);
      }
    });
  });

  newData?.nodes.forEach((el) => {
    let tempEdges = [],
      tempNodes = [];

    totalData?.edges?.forEach((element) => {
      if (
        !newData.edges.some((x) => x.key == element.key) &&
        !tempEdges.some((x) => x.key == element.key) &&
        (element.source == el.key || element.target == el.key)
      ) {
        let newElement = structuredClone(element);
        newElement.attributes.color = "rgba(255,255,0, 0.7)";
        tempEdges.push(newElement);
      }
    });

    totalData?.nodes?.forEach((element) => {
      tempEdges.forEach((edge) => {
        if (
          element.key != el.key &&
          !newData.nodes.some((x) => x.key == element.key) &&
          !tempNodes.some((x) => x.key == element.key) &&
          (element.key == edge.source || element.key == edge.target)
        ) {
          tempNodes.push(element);
        }
      });
    });

    newData.edges = [...newData.edges, ...tempEdges];
    newData.nodes = [...newData.nodes, ...tempNodes];
  });

  setData(newData);
};

export default handleSelectedHcp;
