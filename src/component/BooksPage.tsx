import { useEffect, useState } from "react";
import { Alert, Card, Container, Row } from "react-bootstrap";
import { getAllBooks } from "../fetches/books";
import { Book } from "../interfaces/Book";
import BookCardComponent from "./BookCardComponent";
import { useNavigate } from "react-router-dom";

function BooksPage() {
  // TODO: se utente è libreria mostra solo i libri della stessa
  // se vuota messaggio di "non è stato ancora caricato nessun libro"
  // altrimenti tutti i libri
  const [books, setBooks] = useState<Book[]>([]);
  const [errMessage, setErrMessage] = useState<string>("");
  const navigate = useNavigate();

  const bookSelected = (isbn: string) => {
    navigate("/details/" + isbn);
  };

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
          return (
            <Card className="w-100" onClick={() => bookSelected(book.isbn)}>
              <BookCardComponent book={book} />
            </Card>
          );
        })
      )}
    </Container>
  );
}
export default BooksPage;
