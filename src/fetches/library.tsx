export const getAllLibraries = async (stateSetter: Function) => {
  try {
    let response = await fetch(`http://localhost:8080/library/all`);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      stateSetter(data);
      return data;
    } else {
      return {
        libraries: [],
        errMessage: "Errore nella ricezione dei dati " + response.status,
      };
    }
  } catch (error) {
    return { books: [], errMessage: "ERRORE: " + error };
  }
};
