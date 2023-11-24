import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Library } from "../interfaces/Library";
import { FaMapMarkerAlt } from "react-icons/fa";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const MapComponent: React.FC<{
  center: [number, number];
  library: Library[];
}> = ({ center, library }) => {
  const customIcon = new Icon({
    iconUrl: "https://img.icons8.com/?size=512&id=13800&format=png",
    iconSize: [30, 30],
  });

  const customUserIcon = new Icon({
    iconUrl: require("../style/assets/marker_pin.png"),
    iconSize: [50, 50],
    className: "customUserMarker",
  });

  console.log(library);
  return (
    <>
      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={customUserIcon}>
          <Popup>you are here!!</Popup>
        </Marker>

        {library
          .filter((lib) => lib.address != null)
          .map((lib, index) => (
            <Marker
              key={index}
              position={[
                lib.address.lat !== null
                  ? parseFloat(lib.address.lat.replace(",", "."))
                  : 0,
                lib.address.lon !== null
                  ? parseFloat(lib.address.lon.replace(",", "."))
                  : 0,
              ]}
              icon={customIcon}>
              <Popup className="popup">
                <Card>
                  <Card.Body>
                    <Card.Title>{lib.name}</Card.Title>

                    <Card.Text>
                      {`${lib.address.municipality.province.region}   ${lib.address.municipality.province.name}`}
                      <br />{" "}
                      {`
                    ${lib.address.municipality.name}`}{" "}
                      <br />
                      {`${lib.address.street} ${lib.address.number}`}
                    </Card.Text>
                    <Card.Link href="#">{lib.phone}</Card.Link>
                    <Card.Link href="#">{lib.email}</Card.Link>
                  </Card.Body>
                </Card>
              </Popup>
            </Marker>
          ))}
        {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </>
  );
};

export default MapComponent;
