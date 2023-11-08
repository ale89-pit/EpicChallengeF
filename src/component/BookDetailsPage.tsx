import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Book } from "../interfaces/Book";
import BookCardComponent from "./BookCardComponent";
import { Container, Row } from "react-bootstrap";
import { Library } from "../interfaces/Library";
import { Card } from "../interfaces/Card";
import { useSelector } from "react-redux";
import { Profile } from "../redux/reducers/profile";
import { RootState } from "../redux/store";
import LibraryCardComponent from "./LibrayCardComponent";

function BookDetailsPage() {
  let { isbn } = useParams();
  const [book, setBook] = useState<Book>({} as Book);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const currentProfile: Profile = useSelector((state: RootState) => state.profile);
  const isLogged: boolean = currentProfile.id != null;
  let isUser: boolean = false;
  let isLibrary: boolean = false;
  if (isLogged) {
    isUser = currentProfile.roles[0].roleName === "ROLE_USER";
    isLibrary = currentProfile.roles[0].roleName === "ROLE_MODERATOR";
  }

  const getMembershipCards = async () => {
    try {
      let response = await fetch(`http://localhost:8080/card/allByUser/${currentProfile.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setCards(data);
      } else {
        console.log("Errore nella ricezione dei dati");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };
  const getBook = async () => {
    try {
      let response = await fetch(`http://localhost:8080/book/${isbn}`, {});
      if (response.ok) {
        let data = await response.json();
        console.log("Libro: ", data);
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
        let data = await response.json();
        console.log("Librerie: ", data);
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
    if (isUser) {
      getMembershipCards();
    }
  }, []);
  return (
    <div>
      {book.isbn && (
        <Container className="mt-5">
          <BookCardComponent book={book!} />
          <Row className="mt-5">
            {libraries.length > 0 ? (
              <>
                <h5 className="ms-5">Aviable on these libraries:</h5>
                {libraries.map((library, index) => {
                  return (
                    <Row key={index}>
                      <LibraryCardComponent
                        book={book}
                        library={library}
                        cards={cards}
                        currentProfile={currentProfile}
                        index={index}
                        isUser={isUser}
                        getCards={getMembershipCards}
                      />
                    </Row>
                  );
                })}
              </>
            ) : (
              <h5 className="ms-5">Currently unaviable</h5>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
}
export default BookDetailsPage;
