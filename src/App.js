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
import Company from "./components/Company"
import Type from "./components/Type"
import Sort from "./components/Sort"
import ScreenSize from "./components/ScreenSize"
import Ram from "./components/Ram"
import OperatingSystem from './components/OperatingSystem';
import Price from './components/Price';

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/company" element={<Company />}/>
          <Route path="/product" element={<Type />}/>
          <Route path="/screen" element={<ScreenSize />}/>
          <Route path="/ram" element={<Ram />}/>
          <Route path="/system" element={<OperatingSystem />}/>
          <Route path="/price" element={<Price />}/>
          <Route path="/sort" element={<Sort />}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;