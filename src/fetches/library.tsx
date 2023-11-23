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

export const getAllLibrariesPageable = async (stateSetter: Function) => {
  try {
    let response = await fetch(`http://localhost:8080/library/allL`);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      stateSetter(data.content);
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

export const getAllLibrariesGeoCoding = async (
  stateSetter: Function,
  latitude: number | undefined,
  longitude: number | undefined
) => {
  try {
    let response = await fetch(
      `http://localhost:8080/library/all/byGeo?lat=${latitude}&lon=${longitude}`
    );
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
