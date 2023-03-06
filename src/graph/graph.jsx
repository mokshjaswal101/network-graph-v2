import React, { useEffect, useState } from "react";
import { MultiDirectedGraph } from "graphology";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import {
  LayoutForceAtlas2Control,
  useLayoutForceAtlas2,
  control,
} from "@react-sigma/layout-forceatlas2";
import {
  SigmaContainer,
  ControlsContainer,
  ZoomControl,
  SearchControl,
  FullScreenControl,
  useSetSettings,
  useSigma,
  useRegisterEvents,
} from "@react-sigma/core";

const Events = () => {
  const setSettings = useSetSettings();
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();

  const [hoveredNode, setHoveredNode] = useState();

  useEffect(() => {
    registerEvents({
      enterNode: (event) => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
    });
  }, []);

  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, highlighted: data.highlighted || false };

        if (hoveredNode) {
          if (
            node === hoveredNode ||
            graph.neighbors(hoveredNode).includes(node)
          ) {
            newData.highlighted = true;
          } else {
            newData.color = "#E2E2E2";
            newData.highlighted = false;
          }
        }
        return newData;
      },
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [hoveredNode, setSettings, sigma]);
};

const Graph = ({ data }) => {
  useEffect(() => {
    data.nodes.map((el) => {
      if (el.attributes.icon) {
        el.attributes.type = "image";
        el.attributes.image = el.attributes.icon;
        el.attributes.size = 13;
        el.attributes.color = "rgba(0, 0, 0, 0)";
      }
    });
  }, [data]);

  const graph = MultiDirectedGraph.from(data);

  return (
    <SigmaContainer
      graph={graph}
      style={{ height: "100%", width: "100%" }}
      settings={{
        nodeProgramClasses: { image: getNodeProgramImage() },
        defaultNodeType: "image",
        defaultEdgeTyp: "edge",
        renderEdgeLabels: true,
        minEdgeSize: 1,
        maxEdgeSize: 1000,
        maxIterations: 100,
        defaultNodeColor: "#3388AA",
      }}
    >
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <FullScreenControl />
        <LayoutForceAtlas2Control />
      </ControlsContainer>
      <ControlsContainer position={"top-right"}>
        <SearchControl style={{ width: "200px" }} />
      </ControlsContainer>
      <Events />
    </SigmaContainer>
  );
};

export default Graph;
