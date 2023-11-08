import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";

import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePageComponent from "./component/HomepageComponent";
import BookDetailsPage from "./component/BookDetailsPage";
import UserorLibraryDetails from "./component/UserOrLibraryDetails";
import LibraryPageComponent from "./component/LibraryPageComponent";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePageComponent />}></Route>
          <Route path="/profile" element={<UserorLibraryDetails />} />
          <Route path="/details/:isbn" element={<BookDetailsPage />} />
          <Route path="/library/:id" element={<LibraryPageComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
