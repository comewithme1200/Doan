import React, { useState } from 'react';
import Carousel from "react-elastic-carousel";
import './MovieCarousel.css'
import MovieCard from '../Card/MovieCard';


const MovieCarousel = () => {
    const [toggleMovieList, setToggleMovieList] = React.useState(false);
    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 3 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 6 },
    ];
    const movieOnAir = [
        {src: 'assets/freedom.jpg'},
        {src: 'assets/mars.jpg'},
        {src: 'assets/joker.jpg'},
        {src: 'assets/thehill.jpg'},
        {src: 'assets/avenger.jpg'},
        {src: 'assets/moonlight.jpg'},
        {src: 'assets/raw.jpg'},
        {src: 'assets/midsoma.jpg'},
    ];
    const movieAboutToRelease = [
        {src: 'assets/freedom.jpg'},
        {src: 'assets/mars.jpg'},
        {src: 'assets/joker.jpg'},
        {src: 'assets/thehill.jpg'},
        {src: 'assets/raw.jpg'},
        {src: 'assets/midsoma.jpg'},
    ];
    return (
        <div className='Movie__carousel-containter'>
            <div className='Movie__carousel-header'>
                { !toggleMovieList && (
                    <div className='Header-wrap'>
                        <a className='highlight' onClick={() => setToggleMovieList(false)}>PHIM ĐANG CHIẾU</a>
                        <a onClick={() => setToggleMovieList(true)}>PHIM SẮP CHIẾU</a>
                    </div>
                )}
                { toggleMovieList && (
                    <div className='Header-wrap'>
                        <a onClick={() => setToggleMovieList(false)}>PHIM ĐANG CHIẾU</a>
                        <a className='highlight' onClick={() => setToggleMovieList(true)}>PHIM SẮP CHIẾU</a>
                    </div>
                )}
                
            </div>
            { !toggleMovieList && ( 
                <div className='Movie__carousel'>
                    <Carousel breakPoints={breakPoints}>
                        {movieOnAir.map((movie) => (
                            <MovieCard src={movie.src}/>
                        ))}
                    </Carousel>
                </div>
            )}
            { toggleMovieList && ( 
                <div className='Movie__carousel'>
                    <Carousel breakPoints={breakPoints}>
                        {movieAboutToRelease.map((movie) => (
                            <MovieCard src={movie.src}/>
                        ))}
                    </Carousel>
                </div>
            )}
        </div>  
    );
};

export default MovieCarousel;