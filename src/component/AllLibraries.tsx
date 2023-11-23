import {
  getAllLibraries,
  getAllLibrariesPageable,
  getAllLibrariesGeoCoding,
} from "../fetches/library";
import { useState, useEffect } from "react";
import { Library } from "../interfaces/Library";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import LibraryCardComponent from "./LibraryPageComponent";
import { Book } from "../interfaces/Book";
import { Profile } from "../redux/reducers/profile";
import { Link, useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";
const AllLibraries = () => {
  const [allLibrary, setAllLibrary] = useState<Library[]>([]);
  //   const [lat, setLat] = useState<number>();
  //   const [lon, setLon] = useState<number>();
  const [userCoordinates, setUserCoordinates] = useState<{
    latitude: number | undefined;
    longitude: number | undefined;
  }>({
    latitude: undefined,
    longitude: undefined,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position && position.coords) {
          console.log(position);
          setUserCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(userCoordinates);
          getAllLibrariesGeoCoding(
            setAllLibrary,
            userCoordinates.latitude,
            userCoordinates.longitude
          );
        } else {
          getAllLibrariesPageable(setAllLibrary);
          console.error("Coordinate non disponibili.");
        }
      },
      (error) => {
        getAllLibrariesPageable(setAllLibrary);
        console.error(`Errore nella geolocalizzazione: ${error.message}`);
      }
    );
  }, []);
  useEffect(() => {
    // getAllLibraries(setAllLibrary);
    console.log(allLibrary);
    getAllLibrariesGeoCoding(
      setAllLibrary,
      userCoordinates.latitude,
      userCoordinates.longitude
    );
  }, [!userCoordinates.latitude, !userCoordinates.longitude]);
  return (
    <Container className="my-3">
      {userCoordinates.latitude !== undefined &&
        userCoordinates.longitude !== undefined && (
          <MapComponent
            center={[
              userCoordinates.latitude || 46,
              userCoordinates.longitude || 14,
            ]}
            library={allLibrary}
          />
        )}

      {allLibrary.length === 0 ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          {allLibrary.map((library) => (
            <div key={library.id} className="ms-3">
              <Row className="my-3">
                <Col className="border rounded bg-lightGrey" xs={12} sm={10}>
                  <Link
                    className="text-decoration-none"
                    to={`/library/${library.id}`}>
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
