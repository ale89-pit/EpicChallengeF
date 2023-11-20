import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Library } from "../interfaces/Library";
import { Col, Container, Row } from "react-bootstrap";
import { getAllBooksByLibraryId } from "../fetches/books";
import { LibrarybookList } from "../interfaces/LibraryBookList";
import { Link } from "react-router-dom";

export default function LibraryPageComponent() {
  const pathname = window.location.pathname;
  let { id } = useParams();
  const [library, setLibrary] = useState<Library>({} as Library);
  const [books, setBooks] = useState<LibrarybookList[]>([]);
  const getLibrary = async () => {
    try {
      let response = await fetch(`http://localhost:8080/library/${id}`, {});
      if (response.ok) {
        let data = await response.json();
        //console.log("Libreria: ", data);
        setLibrary(data);
        let booklist = await getAllBooksByLibraryId(data.id);
        setBooks(booklist.books);
        //console.log("Libri: ", booklist);
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
    <Container>
      <Row>
        <Col xs={12} md={8} className="mx-auto">
          <h3 className="mt-5 mb-3">{library.name}</h3>
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
          <h4 className="mt-4 mb-2">Booklist: </h4>
          {pathname !== "/libraries" &&
            books.length > 0 &&
            books.map((item, index) => (
              <Row
                key={index}
                className="border border-1 rounded my-2 bg-light">
                <Link
                  to={`/details/${item.book.isbn}`}
                  className="text-decoration-none text-dark">
                  <span className="d-flex justify-content-between mt-3">
                    <h6 className="text-decoration-none text-truncate w-75">
                      {item.book.title}
                    </h6>
                    <p>Quantity: {item.quantity}</p>
                  </span>
                </Link>
              </Row>
            ))}
        </Col>
      </Row>
    </Container>
  );
}
