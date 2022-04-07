import React from 'react';
import Slider from '../Slider/Slider';
import MovieCarousel from '../MovieSlider/MovieCarousel';
import SaleCarousel from '../SaleSlider/SaleCarousel';

const MainContent = (props) => {
    return (
        <div>
            <Slider />
            <MovieCarousel data={props.data}/>
            <SaleCarousel />
        </div>
    );
};

export default MainContent;