import L from "leaflet";
import { Marker } from "react-leaflet";

const getArrow = (arrLatlngs, color = "red", weight = 0.1) => {
  if (!arrLatlngs || arrLatlngs.length < 2) return;

  if (
    arrLatlngs[0].lat == arrLatlngs[1].lat &&
    arrLatlngs[0].lng == arrLatlngs[1].lng
  )
    return;

  let icon = L.divIcon({
    className: "arrow-icon",
    bgPos: [5, 5],
    html: `<div style="border: 6px solid transparent; border-top-color:${color} ;  transform: rotate(${getAngle(
      arrLatlngs[1],
      arrLatlngs[0],
      -1
    )}rad) translateY(-50%);" ></div>`,
  });

  return <Marker position={arrLatlngs[1]} icon={icon} />;
};

const getAngle = (latLng1, latlng2) => {
  let dx = latlng2.lat - latLng1.lat;
  let dy = latlng2.lng - latLng1.lng;

  let ang = Math.atan2(dy, dx);
  return ang;
};

function myMidPoint(latlng1, latlng2, per, mapObj) {
  if (!mapObj) throw new Error("map is not defined");

  var halfDist,
    segDist,
    dist,
    p1,
    p2,
    ratio,
    points = [];

  p1 = new L.latLng(latlng1);
  p2 = new L.latLng(latlng2);

  halfDist = distanceTo(p1, p2) * per;

  if (halfDist === 0) return mapObj.unproject(p1);

  dist = distanceTo(p1, p2);

  if (dist > halfDist) {
    ratio = (dist - halfDist) / dist;
    var res = mapObj.unproject(
      new Point(p2.x - ratio * (p2.x - p1.x), p2.y - ratio * (p2.y - p1.y))
    );
    return [res.lat, res.lng];
  }
}

function distanceTo(p1, p2) {
  var x = p2.x - p1.x,
    y = p2.y - p1.y;

  return Math.sqrt(x * x + y * y);
}

function toPoint(x, y, round) {
  if (x instanceof Point) {
    return x;
  }
  if (x?.length >= 0) {
    return new Point(x[0], x[1]);
  }
  if (x === undefined || x === null) {
    return x;
  }
  if (typeof x === "object" && "x" in x && "y" in x) {
    return new Point(x.x, x.y);
  }
  return new Point(x, y, round);
}

function Point(x, y, round) {
  this.x = round ? Math.round(x) : x;
  this.y = round ? Math.round(y) : y;
}

export default getArrow;
