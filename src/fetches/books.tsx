import { Book } from "../interfaces/Book";

export const getAllBooks = async () => {
  try {
    let response = await fetch(`http://localhost:8080/book/all`);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      return { books: data.content };
    } else {
      return {
        books: [],
        errMessage: "Errore nella ricezione dei dati " + response.status,
      };
    }
  } catch (error) {
    return { books: [], errMessage: "ERRORE: " + error };
  }
};
