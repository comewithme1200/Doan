import React, { useState } from 'react';
import Carousel from "react-elastic-carousel";
import styles from './MovieCarousel.module.css'
import MovieCard from '../Card/MovieCard';


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
        <div className={styles.Movie__carousel_containter}>
            <div className={styles.Movie__carousel_header}>
                {!toggleMovieList && (
                    <div className={styles.Header_wrap}>
                        <a className={styles.highlight} onClick={() => setToggleMovieList(false)}>PHIM ĐANG CHIẾU</a>
                        <a onClick={() => setToggleMovieList(true)}>PHIM SẮP CHIẾU</a>
                    </div>
                )}
                {toggleMovieList && (
                    <div className={styles.Header_wrap}>
                        <a onClick={() => setToggleMovieList(false)}>PHIM ĐANG CHIẾU</a>
                        <a className={styles.highlight} onClick={() => setToggleMovieList(true)}>PHIM SẮP CHIẾU</a>
                    </div>
                )}

            </div>
            {!toggleMovieList ? (
                <div className={styles.Movie__carousel}>
                    <Carousel breakPoints={breakPoints}>
                        {movieOnAir?.map((movie) => (
                            <MovieCard data={movie} key={movie.id} />
                        ))}
                    </Carousel>
                </div>
            ) : (
                <div className={styles.Movie__carousel}>
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