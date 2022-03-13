import React from 'react';

import { Footer } from './container';
import { Navbar } from './components';
import './App.css';
import Slider from './components/Slider/Slider';
import MovieCarousel from './components/MovieSlider/MovieCarousel';
import SaleCarousel from './components/SaleSlider/SaleCarousel';
import GetDetail from './components/GetDetail/GetDetail';
import { useSelector } from 'react-redux';
import Login from './components/Login/Login';


const App = () => {
  const toggleScreen = useSelector((state) => state.toggleScreen);

  return (
    <div>
      <Navbar />
      {toggleScreen.screen == "buy" && (
        <GetDetail />
      )}
      {toggleScreen.screen == "main" && (
        <div>
          <Slider />
          <MovieCarousel />
          <SaleCarousel />
        </div>
      )}
      {toggleScreen.screen == "login" && (
        <Login/>
      )}
      <Footer />
    </div>
  )};

export default App;
