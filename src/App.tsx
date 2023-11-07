import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";

import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePageComponent from "./component/HomepageComponent";
import UserorLibraryDetails from "./component/UserOrLibraryDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePageComponent />}></Route>
          <Route path="/profile" element={<UserorLibraryDetails />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
