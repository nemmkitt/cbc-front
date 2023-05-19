import React from "react";
import Home from "./Home";
import Search from "./Search";
import Form from "./Form";
import Staff from "./Staff";
import Searching from "./Searching";
import Edit from "./Edit";
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/certification' element={<Form/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/staff' element={<Staff/>} />
      <Route path='/searching' element={<Searching/>} />
      <Route path='/edit' element={<Edit/>} />
      </Routes>

    </div>
  );
}

export default App;
