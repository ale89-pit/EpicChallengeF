import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Library } from "../interfaces/Library";
import { FaMapMarkerAlt } from "react-icons/fa";

import { Card } from "react-bootstrap";

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
      <MapContainer center={center} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={customUserIcon}></Marker>

        {library.map((lib, index) => (
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
            <Popup>
              <Card>
                <Card.Body>
                  <Card.Title>{lib.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {/* {lib.address.city} */}
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
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
