import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import MapComponent from "./MapComponent";
import { Library } from "../interfaces/Library";
import { Coordinates } from "../interfaces/Coordinates";
import {
  getAllLibraries,
  getAllLibrariesPageable,
  getAllLibrariesGeoCoding,
} from "../fetches/library";

const AllLibraries = () => {
  const [allLibrary, setAllLibrary] = useState<Library[]>([]);
  const [userCoordinates, setUserCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  });

  const loadData = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        setUserCoordinates(position.coords);
        console.log(userCoordinates);
      },
      (error) => {
        console.error(`Errore nella geolocalizzazione: ${error.message}`);
      }
    );

    if (userCoordinates.latitude && userCoordinates.longitude) {
      //prendi librerie vicine
      let data = await getAllLibrariesGeoCoding(
        userCoordinates.latitude,
        userCoordinates.longitude
      );
      console.log(data);
      setAllLibrary(data);
      console.log(userCoordinates);
    } else {
      //prendi solo una pagina di librerie
      console.log("geolocalizzazione non attiva");
      let data = await getAllLibrariesPageable();
      setAllLibrary(data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log("cambiate coordinate");
    loadData();
  }, [userCoordinates.latitude, userCoordinates.longitude]);

  return (
    <Container className="my-3">
      {userCoordinates.latitude !== null &&
        userCoordinates.longitude !== null && (
          <MapComponent
            center={[userCoordinates.latitude, userCoordinates.longitude]}
            library={allLibrary}
          />
        )}

      {allLibrary.length === 0 ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {allLibrary.map((library) => (
            <div key={library.id} className="ms-3">
              <Row className="my-3">
                <Col className="border rounded bg-lightGrey" xs={12} sm={10}>
                  <Link
                    className="text-decoration-none"
                    to={`/library/${library.id}`}
                  >
                    {" "}
                    <h3 className="mt-5 mb-3">
                      {/* {library.name ? library.name : ""} */}
                    </h3>
                  </Link>
                  {library.address && (
                    <>
                      <h4 className="fw-bold">Address: </h4>
                      <br />
                      <span className="fw-bolder">Street: </span>
                      {library.address !== null ? (
                        <>
                          {library.address.street}, {library.address.number} -
                          {library.address.municipality.name}{" "}
                          {`(${library.address.municipality.province.sign})`}
                        </>
                      ) : (
                        ""
                      )}
                      <br />
                      <span className="fw-bolder">Phone: </span> {library.phone}
                      <br />
                      <span className="fw-bolder">Email: </span> {library.email}
                      <br />
                    </>
                  )}
                </Col>
              </Row>
            </div>
          ))}
        </>
      )}
    </Container>
  );
};

export default AllLibraries;
