import { useEffect, useState } from "react";
import BookCardComponent from "./BookCardComponent";
import { Book } from "../interfaces/Book";

function HomePageComponent() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const getBooks = async () => {
    try {
      let response = await fetch(`http://localhost:8080/book/all`, {});
      if (response.ok) {
        let data = await response.json();
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

  return <div>CIAO</div>;
}
export default HomePageComponent;
