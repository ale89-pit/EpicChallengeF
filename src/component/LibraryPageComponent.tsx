import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Library } from "../interfaces/Library";
import { Col, Row } from "react-bootstrap";
import { CarouselCardComponent } from "./CarouselComponent";

export default function LibraryPageComponent() {
  let { id } = useParams();
  const [library, setLibrary] = useState<Library>({} as Library);
  const getLibrary = async () => {
    try {
      let response = await fetch(`http://localhost:8080/library/${id}`, {});
      if (response.ok) {
        let data = await response.json();
        console.log("Libreria: ", data);
        console.log(Object.keys(data.booklist));
        setLibrary({ ...data, booklist: Object.keys(data.booklist) });
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  useEffect(() => {
    getLibrary();
    console.log(library);
  }, []);
  return (
    <div className="ms-3">
      <Row>
        <Col xs={12} sm={6}>
          <h3 className="mt-5 mb-3">{library.name}</h3>
          {library.address && (
            <>
              <h4 className="fw-bold">Address: </h4>
              <br />
              <span className="fw-bolder">Street: </span>
              {library.address.street}, {library.address.number} -{library.address.municipality.name}{" "}
              {`(${library.address.municipality.province.sign})`}
              <br />
              <span className="fw-bolder">Phone: </span> {library.phone}
              <br />
              <span className="fw-bolder">Email: </span> {library.email}
              <br />
            </>
          )}
          <h4>Booklist: </h4>
          {/*library.booklist.length > 0 &&
            library.booklist.map((item, index) => (
              <span key={index}>
                <CarouselCardComponent book={item.book}></CarouselCardComponent>
              </span>
            ))*/}
        </Col>
      </Row>
    </div>
  );
}
