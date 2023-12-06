import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Listing from "./Components/ListAnime";
import Create from "./Components/CreateAnime";
import Detail from "./Components/DetailAnime";
import Edit from "./Components/EditAnime";

function App() {
  return (
    <div className="App">
      <h1>Muhammad Ridho 51421055</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Listing />}></Route>
          <Route path="/anime/create" element={<Create />}></Route>
          <Route path="/anime/detail/:id" element={<Detail />}></Route>
          <Route path="/anime/edit/:id" element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
