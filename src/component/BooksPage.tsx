import { useEffect, useState } from "react";
import { Alert, Card, Container, Row } from "react-bootstrap";
import { getAllBooks } from "../fetches/books";
import { Book } from "../interfaces/Book";
import BookCardComponent from "./BookCardComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Profile } from "../redux/reducers/profile";
import { RootState } from "../redux/store";

function BooksPage() {
  // TODO: se utente è libreria mostra solo i libri della stessa
  // se vuota messaggio di "non è stato ancora caricato nessun libro"
  // altrimenti tutti i libri
  const currentProfile: Profile = useSelector(
    (state: RootState) => state.profile
  );

  const [books, setBooks] = useState<Book[]>([]);
  const [errMessage, setErrMessage] = useState<string>("");
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const fileReader = new FileReader();

  const bookSelected = (isbn: string) => {
    navigate("/details/" + isbn);
  };

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event: any) {
        const csvOutput = event.target.result;
        console.log(csvOutput);
      };
    }
  };

  const fetchBooks = async () => {
    const data = await getAllBooks();
    if (data.errMessage) setErrMessage(data.errMessage);
    setBooks(data.books);
  };
  // const fetchBooksByLibraryId = async (libId) => {
  //   const data = await getAllBooks();
  //   if (data.errMessage) setErrMessage(data.errMessage);
  //   setBooks(data.books);
  // };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container className="mt-5">
      <form>
        <input type="file" accept=".csv" onChange={handleOnChange} />
        <button onClick={handleOnSubmit}>IMPORT BOOKS CSV</button>
      </form>
      {errMessage ? (
        <Alert variant="danger">{errMessage}</Alert>
      ) : (
        books.map((book) => {
          return (
            <Card
              className="w-100"
              onClick={() => bookSelected(book.isbn)}
              key={book.isbn}
            >
              <BookCardComponent book={book} />
            </Card>
          );
        })
      )}
    </Container>
  );
}
export default BooksPage;
