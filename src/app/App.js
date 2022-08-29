import React from "react";
import {Routes, Route} from "react-router-dom";
import Customer from '../pages/Customer';
import Item from "../pages/Item";
import Home from "../pages/Home";

function App() {
  return (
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='customer-manage' element={<Customer/>}/>
        <Route path='item-manage' element={<Item/>}/>
        {/* <Route path="*" element={<NotFound/>}/>*/}
      </Routes>
  );
}

export default App;
