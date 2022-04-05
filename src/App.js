import React from 'react';

import { Footer } from './container';
import { Navbar } from './components';
import './App.css';

import GetDetail from './components/GetDetail/GetDetail';
import { useSelector } from 'react-redux';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import BuyProcess from './components/BuyProcess/BuyProcess';


const App = () => {
  const toggleScreen = useSelector((state) => state.toggleScreen);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/getDetail' element={<GetDetail/>}/>
        <Route path='/' element={<MainContent/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/buyprocess' element={<BuyProcess/>}/>
      </Routes>
      {/* {toggleScreen.screen == "buy" && (
        <GetDetail />
      )}
      {toggleScreen.screen == "main" && (
        <MainContent/>      
      )}
      {toggleScreen.screen == "login" && (
        <Login/>
      )} */}
      <Footer />
    </div>
  )};

export default App;
