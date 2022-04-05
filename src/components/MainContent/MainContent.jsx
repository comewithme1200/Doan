import React from 'react';
import Slider from '../Slider/Slider';
import MovieCarousel from '../MovieSlider/MovieCarousel';
import SaleCarousel from '../SaleSlider/SaleCarousel';

const MainContent = () => {
    return (
        <div>
            <Slider />
            <MovieCarousel />
            <SaleCarousel />
        </div>
    );
};

export default MainContent;