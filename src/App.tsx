import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePageComponent from "./component/HomepageComponent";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePageComponent />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
