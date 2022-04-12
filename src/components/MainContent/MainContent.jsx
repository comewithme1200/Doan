import React from 'react';
import Slider from '../Slider/Slider';
import MovieCarousel from '../MovieSlider/MovieCarousel';
import SaleCarousel from '../SaleSlider/SaleCarousel';
import axios from 'axios';
const MainContent = () => {
    const [mainContentMoviesData, setMainContentMoviesData] = React.useState({});

    React.useEffect(() => {
        axios.get('/movies').then( res => {
            setMainContentMoviesData(res.data);
        }).catch(err => {
            console.log(err);
        })   
    }, []);

    return (
        <div>
            <Slider />
            <MovieCarousel data={mainContentMoviesData}/>
            <SaleCarousel />
        </div>
    );
};

export default MainContent;