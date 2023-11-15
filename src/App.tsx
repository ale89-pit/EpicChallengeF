import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";

import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePageComponent from "./component/HomepageComponent";
import BookDetailsPage from "./component/BookDetailsPage";
import UserorLibraryDetails from "./component/UserOrLibraryDetails";
import BooksPage from "./component/BooksPage";
import LibraryPageComponent from "./component/LibraryPageComponent";
import BookingsPage from "./component/BookingsPage";
import MemberhipCardPage from "./component/MembershipCardPage";

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
          <Route path="/library/:id" element={<LibraryPageComponent />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/cards" element={<MemberhipCardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
