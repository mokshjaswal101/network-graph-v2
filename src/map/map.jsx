import React, { useState, useEffect } from "react";
import {
  MapContainer,
  LayersControl,
  LayerGroup,
  Polyline,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import calculatePolyLines from "./polylines";
import L from "leaflet";

const Map = ({ data, setSelectedHcp }) => {
  const [polylines, setPolylines] = useState([]);

  useEffect(() => {
    if (data?.edges) setPolylines(calculatePolyLines(data));
  }, [data?.nodes, data?.edges]);

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        style={{ width: "100%", height: "800px" }}
        center={[37.445767, -100.161522]}
        zoom={4}
        scrollWheelZoom={false}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Default Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="KOLs Marked on Map">
            <LayerGroup>
              {data?.nodes?.map((element, index) => {
                return (
                  <Marker
                    key={index}
                    position={[element.attributes.lat, element.attributes.lng]}
                    icon={
                      element.attributes.icon != null
                        ? new L.Icon({
                            iconUrl: element.attributes.icon,
                            iconRetinaUrl: element.attributes.icon,
                            iconAnchor: [16, 16],
                            popupAnchor: [16, 16],
                            shadowUrl: null,
                            shadowSize: null,
                            shadowAnchor: null,
                            iconSize: new L.Point(24, 24),
                          })
                        : new L.divIcon({
                            iconSize: "auto",
                            html: `<div style="background-color:${element.attributes.color};padding:5px;" ></div>`,
                          })
                    }
                  >
                    <Popup>
                      {element.attributes.label}
                      <button
                        style={{
                          fontStyle: "italic",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}
                        onClick={() => setSelectedHcp(element)}
                      >
                        i
                      </button>
                    </Popup>
                  </Marker>
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Influence Directed on Map">
            <LayerGroup>
              {polylines?.length > 0 &&
                polylines.map((poly, index) => {
                  return (
                    <Polyline
                      key={index}
                      pathOptions={{ color: poly.cc, weight: 1 }}
                      positions={poly.pointList}
                    />
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default Map;
