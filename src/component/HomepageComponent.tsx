import { useEffect, useState } from "react";
import { Book } from "../interfaces/Book";
import CarouselComponent from "./CarouselComponent";

function HomePageComponent() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const getBooks = async () => {
    try {
      let response = await fetch(`http://localhost:8080/book/all`, {});
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setAllBooks(data.content);
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
    <div className="mt-3">
      <h1 className="ms-2"> New Releases</h1>
      <CarouselComponent items={allBooks} />
    </div>
  );
}
export default HomePageComponent;
