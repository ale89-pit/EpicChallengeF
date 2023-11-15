import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Book } from "../interfaces/Book";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Profile } from "../redux/reducers/profile";
import { RootState } from "../redux/store";
import BookCardComponent from "./BookCardComponent";
import {
  addBooksFromFile,
  getAllBooks,
  getAllBooksByLibraryId,
} from "../fetches/books";
import { Library } from "../interfaces/Library";
import { LibrarybookList } from "../interfaces/LibraryBookList";

function BooksPage() {
  // TODO: se utente è libreria mostra solo i libri della stessa
  // se vuota messaggio di "non è stato ancora caricato nessun libro"
  // altrimenti tutti i libri
  const currentProfile: Profile = useSelector(
    (state: RootState) => state.profile
  );
  const isLogged: boolean = currentProfile.id != null;
  let isUser: boolean = false;
  let isLibrary: boolean = false;
  let myid: number = currentProfile.id ? currentProfile.id : 0;
  if (isLogged) {
    isUser = currentProfile.roles[0].roleName === "ROLE_USER";
    isLibrary = currentProfile.roles[0].roleName === "ROLE_MODERATOR";
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [libraryBooks, setLibraryBooks] = useState<LibrarybookList[]>([]);

  const [errMessage, setErrMessage] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");

  const navigate = useNavigate();
  const [file, setFile] = useState<File>();

  const bookSelected = (isbn: string) => {
    if (!isLibrary) navigate("/details/" + isbn);
  };

  const handleOnChange = (e: any) => {
    setResponseMessage("");
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    if (file) {
      const responseMessage = await addBooksFromFile(myid, file);
      setResponseMessage(responseMessage);
    } else {
      setResponseMessage("First upload a csv file");
    }
  };

  const fetchBooks = async () => {
    //TODO: chiama fetch diverse per library / user
    let data = null;
    if (!isLogged) {
      data = await getAllBooks();
      if (data.errMessage) {
        setErrMessage(data.errMessage);
      } else setBooks(data.books);
    } else {
      if (isLibrary) {
        data = await getAllBooksByLibraryId(
          currentProfile.id ? currentProfile.id : 0
        );
        console.log(data.books);
        setLibraryBooks(data.books);
        if (data.errMessage) {
          setErrMessage(data.errMessage);
        } else setBooks(data.books);
      } else if (isUser) {
        const data = await getAllBooks();
      } else setErrMessage("Error in get books");
    }
  };

  function setErrorMessageIfPresent(data: any) {}
  // const fetchBooksByLibraryId = async (libId) => {
  //   const data = await getAllBooks();
  //   if (data.errMessage) setErrMessage(data.errMessage);
  //   setBooks(data.books);
  // };

  useEffect(() => {
    fetchBooks();
  }, [isLogged]);

  return (
    <Container className="mt-5">
      {isLibrary && (
        <Form encType="multipart/form-data">
          <input type="file" accept=".csv" onChange={handleOnChange} />

          <Button variant="success" onClick={handleOnSubmit}>
            IMPORT BOOKS FROM CSV
          </Button>
        </Form>
      )}

      {responseMessage ? (
        <Alert variant="warning">{responseMessage}</Alert>
      ) : (
        ""
      )}

      {errMessage ? (
        <Alert variant="danger">{errMessage}</Alert>
      ) : isLibrary ? (
        libraryBooks.map((book) => {
          return (
            <Card
              className="w-100"
              onClick={() => bookSelected(book.book.isbn)}
              key={book.book.isbn}
            >
              <BookCardComponent book={book.book} />
              <Badge>Quantity Available: {book.quantity}</Badge>
            </Card>
          );
        })
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
