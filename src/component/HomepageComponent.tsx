import { useEffect, useState } from "react";
import BookCardComponent from "./BookCardComponent";
import { Book } from "../interfaces/Book";
import { Link, useNavigate } from "react-router-dom";

function HomePageComponent() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      let response = await fetch(`http://localhost:8080/book/allT`, {});
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setAllBooks(data);
        setIsLoading(false);
      } else {
        console.log("Errore nella ricezione dei dati");
        setIsError(true);
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <Link to="/profile">profile</Link>
      {allBooks.map((item) => (
        <BookCardComponent book={item} />
      ))}
    </div>
  );
}
export default HomePageComponent;
