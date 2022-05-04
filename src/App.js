import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import View from "./components/View"
import Sort from "./components/Sort"

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/sort" element={<Sort />}/>
          <Route path="/view" element={<View />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;