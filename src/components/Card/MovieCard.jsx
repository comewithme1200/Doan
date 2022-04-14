import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./MovieCard.module.css";
import { Link } from 'react-router-dom';

const MovieCard = ({data: {movie_name, id}}) => {
    return (
        <div className={styles.container}>
            <div className={styles.cardImage}>
                <img alt="Poster" src="assets/midsoma.jpg"/>
            </div>
            <div className={styles.cardText}>
                <h4>{movie_name}</h4>
            </div>
            <div className={styles.cardAction}>
                <Link to={`getDetail/${id}`}>
                    <button>MUA VÉ</button>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;