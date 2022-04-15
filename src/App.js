import React from 'react';

import { Footer } from './container';
import { Navbar } from './components';
import './App.css';

import GetDetail from './components/GetDetail/GetDetail';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import BuyProcess from './components/BuyProcess/BuyProcess';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/getDetail/:id/:movie_name' element={<GetDetail/>}/>
        <Route path='/' element={<MainContent/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/buyprocess/:id' element={<BuyProcess/>}/>
      </Routes>
      <Footer />
    </div>
  )};

export default App;
