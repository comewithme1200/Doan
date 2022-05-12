import React, { useState } from 'react';
import Carousel from "react-elastic-carousel";
import './MovieCarousel.css'
import MovieCard from '../Card/MovieCard';
import UserDropdown from '../UserDropdown/UserDropdown';


const MovieCarousel = (props) => {
    const [toggleMovieList, setToggleMovieList] = React.useState(false);
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 3 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 6 },
    ];
    const movieOnAir = props?.data?.moviesOnAir;
    const movieAboutToRelease = props?.data?.moviesAboutOnAir;
    return (
        <div className='Movie__carousel-containter'>
            <div className='Movie__carousel-header'>
                {!toggleMovieList && (
                    <div className='Header-wrap'>
                        <a className='highlight' onClick={() => setToggleMovieList(false)}>PHIM ĐANG CHIẾU</a>
                        <a onClick={() => setToggleMovieList(true)}>PHIM SẮP CHIẾU</a>
                    </div>
                )}
                {toggleMovieList && (
                    <div className='Header-wrap'>
                        <a onClick={() => setToggleMovieList(false)}>PHIM ĐANG CHIẾU</a>
                        <a className='highlight' onClick={() => setToggleMovieList(true)}>PHIM SẮP CHIẾU</a>
                    </div>
                )}

            </div>
            {!toggleMovieList ? (
                <div className='Movie__carousel'>
                    <Carousel breakPoints={breakPoints}>
                        {movieOnAir?.map((movie) => (
                            <MovieCard data={movie} key={movie.id} />
                        ))}
                    </Carousel>
                </div>
            ) : (
                <div className='Movie__carousel'>
                    <Carousel breakPoints={breakPoints}>
                        {movieAboutToRelease?.map((movie) => (
                            <MovieCard data={movie} key={movie.id} />
                        ))}
                    </Carousel>
                </div>
            )}
        </div>
    );
};

export default MovieCarousel;