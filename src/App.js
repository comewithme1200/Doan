import React from 'react';

import { Footer } from './container';
import { Navbar } from './components';
import './App.css';
import Slider from './components/Slider/Slider';
import MovieCarousel from './components/MovieSlider/MovieCarousel';
import SaleCarousel from './components/SaleSlider/SaleCarousel';
import GetDetail from './components/GetDetail/GetDetail';
import { useSelector } from 'react-redux';


const App = () => {
  const toggleScreen = useSelector((state) => state.toggleScreen);

  console.log(toggleScreen.screen);
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
      <Footer />
    </div>
  )};

export default App;
