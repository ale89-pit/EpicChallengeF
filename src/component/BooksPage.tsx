import { useEffect, useState } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import { getAllBooks } from "../fetches/books";
import { Book } from "../interfaces/Book";
import BookCardComponent from "./BookCardComponent";

function BooksPage() {
  // TODO: se utente è libreria mostra solo i libri della stessa
  // se vuota messaggio di "non è stato ancora caricato nessun libro"
  // altrimenti tutti i libri
  const [books, setBooks] = useState<Book[]>([]);
  const [errMessage, setErrMessage] = useState<string>("");

  const fetchBooks = async () => {
    const data = await getAllBooks();
    if (data.errMessage) setErrMessage(data.errMessage);
    setBooks(data.books);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container className="mt-5">
      {errMessage ? (
        <Alert variant="danger">{errMessage}</Alert>
      ) : (
        books.map((book) => {
          return <BookCardComponent book={book} />;
        })
      )}
    </Container>
  );
}
export default BooksPage;
