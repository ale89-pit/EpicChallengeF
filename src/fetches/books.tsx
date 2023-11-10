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

export const addBooksFromFile = async (libraryId: number, file: File) => {
  try {
    var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "form-data");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      // enctype: "multipart/form-data",
      body: formdata,
    };

    let response = await fetch(
      `http://localhost:8080/library/addBooks/${libraryId}`,
      requestOptions
    );
    if (response.ok) {
      let data = await response.json();
      return data.message;
    } else {
      console.log(response);
      return "Error upload file";
    }
  } catch (error) {
    console.log(error);
    return "ERROR upload file";
  }
};
