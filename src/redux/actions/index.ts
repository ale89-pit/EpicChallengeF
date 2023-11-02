import { Profile } from "../reducers/profile";
export const SET_PROFILE = "SET_PROFILE";

export const setProfile = (profileData: Profile) => {
  return {
    type: SET_PROFILE,
    payload: profileData,
  };
};
export const getProfile = (username: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  console.log("USERNAME: " + username);
  return async (dispatch: any, getState: any) => {
    console.log("inizio getProfile");
    try {
      console.log("inizio Try");
      const response = await fetch("http://localhost:8080/user/" + username + "/" + username, requestOptions);

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        dispatch(setProfile(data));
        console.log("PROFILO UTENTE:", data);
      } else {
        alert("Errore nel recupero del profilo");
      }
    } catch (error) {
      console.log("inizio Catch");
      console.log(error);
    }
  };
};
