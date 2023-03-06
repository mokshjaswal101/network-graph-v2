import starred from "../assets/starred.png";
import starBlue from "../assets/bluestar.png";
import diamondBlue from "../assets/diamondblue.png";

import specializations from "../data/specializations";

const filterData = (
  data,
  setData,
  influenceTypes,
  influenceLevel,
  selectedHcp,
  selectedSpecialization = "",
  selectedState = "",
  setStateList,
  setSpecializationList,
  setSelectedState,
  setSelectedSpecialization,
  shownKols,
  topHcps
) => {
  let filteredData = { nodes: [], edges: [] };
  let stateList = [];
  let specializationList = new Set();

  let date = new Date();

  filteredData = filterBasedOnTopHcps(data, shownKols, topHcps);

  //filter based on influence filters
  let res = filterBasedOnInfluence(
    filteredData,
    influenceTypes,
    influenceLevel,
    stateList
  );
  filteredData = res.filteredData;
  stateList = res.stateList;
  specializationList = res.specializationList;

  //filter data based on selected hcp
  if (selectedHcp?.key) {
    res = filterBasedOnSelectedHcp(
      data,
      selectedHcp,
      influenceLevel,
      influenceTypes
    );
    filteredData = res.filteredData;
    stateList = res.stateList;
    specializationList = res.specializationList;
  }

  //filter data based on advanced filters
  filteredData = filterBasedOnAdvancedFilters(
    filteredData,
    !specializationList.includes(selectedSpecialization)
      ? ""
      : selectedSpecialization,
    !stateList.includes(selectedState) ? "" : selectedState
  );

  if (!stateList.includes(selectedState)) setSelectedState("");

  if (!specializationList.includes(selectedSpecialization))
    setSelectedSpecialization("");
  setStateList(stateList);
  setData(filteredData);
  setSpecializationList(specializationList);
  console.log("Filter time: ", (new Date() - date) / 1000);
};

const filterBasedOnTopHcps = (data, shownKols, topHcps) => {
  let formattedData = { nodes: [], edges: [] };

  topHcps.slice(shownKols, shownKols + 10).forEach((kol) => {
    data.edges.forEach((edge) => {
      if (edge.source == kol.key || edge.target == kol.key) {
        edge.level = "first";
        if (!formattedData.edges.some((el) => el.key == edge.key))
          formattedData.edges.push(edge);
      }

      let nodeKey = edge.source == kol.key ? edge.target : edge.source;
      if (!formattedData.nodes.some((node) => node.key == nodeKey)) {
        formattedData.nodes.push(data.nodes.find((el) => el.key == nodeKey));
      }
    });
  });

  return formattedData;
};

const filterBasedOnInfluence = (data, influenceTypes, influenceLevel) => {
  let filteredData = { nodes: [], edges: [] };
  let stateList = new Set();
  let specializationList = new Set();

  filteredData.edges = data.edges.filter((edge) => {
    return influenceTypes.includes(edge.type);
  });

  filteredData.edges.forEach((edge) => [
    data.nodes.forEach((node) => {
      if (
        !filteredData.nodes.some((el) => el.key == node.key) &&
        (edge.source == node.key || edge.target == node.key)
      ) {
        filteredData.nodes.push(node);
      }
    }),
  ]);

  //filter based on influence level
  if (influenceLevel == 2) {
    filteredData.edges = filteredData.edges.filter(
      (edge) => edge.level == "first" || edge.level == "second"
    );
  } else
    filteredData.edges = filteredData.edges.filter(
      (edge) => edge.level == "first"
    );

  let tempNodes = [];

  filteredData.edges.forEach((edge) => {
    filteredData.nodes.forEach((node) => {
      if (
        !tempNodes.some((el) => el.key == node.key) &&
        (edge.source == node.key || edge.target == node.key)
      ) {
        if (
          Object.keys(specializations).includes(node.attributes.specialization)
        )
          specializationList.add(node.attributes.specialization);
        stateList.add(node.attributes.state);
        tempNodes.push(node);
      }
    });
  });

  filteredData.nodes = tempNodes;

  stateList = Array.from(stateList);
  specializationList = Array.from(specializationList);
  return { filteredData, stateList, specializationList };
};

const filterBasedOnSelectedHcp = (
  filteredData,
  selectedHcp,
  influenceLevel,
  influenceTypes
) => {
  let newData = { nodes: [], edges: [] };
  let stateList = new Set();
  let specializationList = new Set();

  filteredData?.edges?.forEach((edge) => {
    if (
      (edge.source == selectedHcp.key || edge.target == selectedHcp.key) &&
      influenceTypes.includes(edge.type)
    ) {
      let newEdge = structuredClone(edge);
      newEdge.level = "first";
      newData.edges.push(newEdge);
    }
  });

  newData.nodes.push(selectedHcp);
  stateList.add(selectedHcp.attributes.state);
  if (
    Object.keys(specializations).includes(selectedHcp.attributes.specialization)
  )
    specializationList.add(selectedHcp.attributes.specialization);

  filteredData?.nodes?.forEach((element) => {
    newData?.edges?.forEach((edge) => {
      if (
        element.key != selectedHcp.key &&
        !newData.nodes.some((x) => x.key == element.key) &&
        (element.key == edge.source || element.key == edge.target)
      ) {
        newData.nodes.push(element);
        stateList.add(element.attributes.state);
        if (
          Object.keys(specializations).includes(
            element.attributes.specialization
          )
        )
          specializationList.add(element.attributes.specialization);

        if (influenceLevel == 2) {
          let extraNodes = [];

          filteredData.edges.forEach((el) => {
            if (
              !newData.edges.some((e) => e.key == el.key) &&
              (element.key == el.source || element.key == el.target) &&
              influenceTypes.includes(el.type)
            ) {
              let tempEdge = structuredClone(el);
              tempEdge.level = "second";
              newData.edges.push(tempEdge);
            }
            if (element.key == el.source) {
              extraNodes.push(el.target);
            } else extraNodes.push(el.source);
          });

          extraNodes.forEach((extraNode) => {
            if (!newData.nodes.some((el) => el.key == extraNode)) {
              let temp = filteredData.nodes.find((e) => e.key == extraNode);
              stateList.add(temp.attributes.state);
              if (
                Object.keys(specializations).includes(
                  temp.attributes.specialization
                )
              )
                specializationList.add(temp.attributes.specialization);
              newData.nodes.push(temp);
            }
          });
        }
      }
    });
  });

  filteredData = structuredClone(newData);
  stateList = Array.from(stateList);
  specializationList = Array.from(specializationList);

  return { filteredData, stateList, specializationList };
};

const filterBasedOnAdvancedFilters = (
  totalData,
  selectedSpecialization,
  selectedState
) => {
  let displayData = structuredClone(totalData);

  // filtering based on specialization
  if (selectedSpecialization && selectedSpecialization != "") {
    let filteredData = { nodes: [], edges: [] };
    if (selectedSpecialization == "others") {
      totalData.nodes.forEach((node) =>
        !node.attributes.specialization
          ? filteredData.nodes.push(structuredClone(node))
          : null
      );
    } else {
      totalData.nodes.forEach((node) =>
        node.attributes.specialization === selectedSpecialization
          ? filteredData.nodes.push(structuredClone(node))
          : null
      );
    }

    let extraNodes = [];

    totalData.edges.forEach((edge) => {
      let source = filteredData.nodes.find((node) => node.key === edge.source);
      let target = filteredData.nodes.find((node) => node.key === edge.target);

      if (source && target) {
        filteredData.edges.push(edge);
      } else if (source || target) {
        if (source) {
          extraNodes.push(
            totalData.nodes.find((node) => node.key === edge.target)
          );
        }
        if (target) {
          extraNodes.push(
            totalData.nodes.find((node) => node.key === edge.source)
          );
        }

        filteredData.edges.push(edge);
      }
      return false;
    });

    {
      !selectedState &&
        filteredData.nodes.forEach((node) => {
          if (node?.attributes?.icon == starred)
            node.attributes.icon = starBlue;
          else node.attributes.icon = diamondBlue;
        });
    }

    extraNodes.forEach((node) => {
      if (!filteredData.nodes.some((el) => el.key == node.key))
        filteredData.nodes.push(node);
    });

    displayData = filteredData;
  }

  //filtering based on state
  if (selectedState && selectedState != "") {
    let filteredData = { nodes: [], edges: [] };

    displayData.nodes.forEach((node) =>
      node.attributes.state === selectedState
        ? filteredData.nodes.push(structuredClone(node))
        : null
    );

    let extraNodes = [];

    displayData.edges.forEach((edge) => {
      let source = filteredData.nodes.find((node) => node.key === edge.source);
      let target = filteredData.nodes.find((node) => node.key === edge.target);

      if (source && target) {
        filteredData.edges.push(edge);
      } else if (source || target) {
        if (source) {
          extraNodes.push(
            totalData.nodes.find((node) => node.key === edge.target)
          );
        }
        if (target) {
          extraNodes.push(
            totalData.nodes.find((node) => node.key === edge.source)
          );
        }

        filteredData.edges.push(edge);
      }
      return false;
    });

    {
      filteredData.nodes.forEach((node) => {
        if (node?.attributes?.icon == starred) node.attributes.icon = starBlue;
        else node.attributes.icon = diamondBlue;
      });
    }

    extraNodes.forEach((node) => {
      if (!filteredData.nodes.some((el) => el.key == node.key))
        filteredData.nodes.push(node);
    });

    return filteredData;
  } else {
    return displayData;
  }
};

export default filterData;
