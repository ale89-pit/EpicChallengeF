import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Book } from "../interfaces/Book";
import BookCardComponent from "./BookCardComponent";
import { Container, Row } from "react-bootstrap";

function BookDetailsPage() {
  let { isbn } = useParams();
  const [book, setBook] = useState<Book>({} as Book);
  const [libraries, setLibraries] = useState<any[]>([]);

  const getBook = async () => {
    try {
      let response = await fetch(`http://localhost:8080/book/${isbn}`, {});
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setBook(data);
      } else {
        console.log("Errore nella ricezione dei dati");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  const getLibrariesByBook = async () => {
    try {
      let response = await fetch(`http://localhost:8080/book/bookInLibrary/${isbn}`, {});
      if (response.ok) {
        console.log(`http://localhost:8080/book/bookInLibrary/${isbn}`);
        let data = await response.json();
        console.log(data);
        setLibraries(data);
      } else {
        console.log("Errore nella ricezione dei dati");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  useEffect(() => {
    getBook();
    getLibrariesByBook();
  }, []);
  return (
    <div>
      {book.isbn && (
        <Container className="mt-5">
          <BookCardComponent book={book!} />
          <Row className="mt-5">
            <h5>Aviable on these libraries:</h5>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default BookDetailsPage;
