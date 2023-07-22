import React from "react";
import {Routes, Route } from "react-router-dom";
import Movies from "./component/Basics/Movies";
import { Detail } from "./component/Basics/Detail";
const App =() => {
  return (
    <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/moviedetail/:id' element={<Detail />} />
    </Routes>
  );
}
export default App;