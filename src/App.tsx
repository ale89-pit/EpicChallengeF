import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";

import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePageComponent from "./component/HomepageComponent";
import BookDetailsPage from "./component/BookDetailsPage";
import UserorLibraryDetails from "./component/UserOrLibraryDetails";
import BooksPage from "./component/BooksPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePageComponent />}></Route>
          <Route path="/profile" element={<UserorLibraryDetails />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/details/:isbn" element={<BookDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
