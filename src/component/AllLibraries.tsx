import { getAllLibraries } from "../fetches/library";
import { useState, useEffect } from "react";
import { Library } from "../interfaces/Library";
import { Col, Container, Row } from "react-bootstrap";
import LibraryCardComponent from "./LibraryPageComponent";
import { Book } from "../interfaces/Book";
import { Profile } from "../redux/reducers/profile";
import { Link } from "react-router-dom";
const AllLibraries = () => {
  const [allLibrary, setAllLibrary] = useState<Library[]>([]);

  useEffect(() => {
    getAllLibraries(setAllLibrary);
  }, []);
  return (
    <Container className="my-3">
      {allLibrary.map((library) => (
        <div className="ms-3">
          <Row className="my-3">
            <Col className="border rounded bg-lightGrey" xs={12} sm={10}>
              <Link
                className="text-decoration-none"
                to={`/library/${library.id}`}>
                {" "}
                <h3 className="mt-5 mb-3">{library.name}</h3>
              </Link>
              {library.address && (
                <>
                  <h4 className="fw-bold">Address: </h4>
                  <br />
                  <span className="fw-bolder">Street: </span>
                  {library.address.street}, {library.address.number} -
                  {library.address.municipality.name}{" "}
                  {`(${library.address.municipality.province.sign})`}
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
    </Container>
  );
};

export default AllLibraries;
