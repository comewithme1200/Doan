import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./MovieCard.module.css";
import { Link } from 'react-router-dom';
import { fillMovieInfo } from '../../redux/action'

const MovieCard = ({data: {movie_name, id, image_path, detail, trailer_link}}) => {
    const base_url = 'assets/';

    const disatch = useDispatch();

    const setMovieInfor = () => {
        disatch(fillMovieInfo({
            name: movie_name,
            image_path: image_path,
            detail: detail,
            trailer_link: trailer_link
        }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.cardImage}>
                <img alt="Poster" src={base_url+image_path}/>
            </div>
            <div className={styles.cardText}>
                <h4>{movie_name}</h4>
            </div>
            <div className={styles.cardAction}>
                <Link to={`getDetail/${id}/${movie_name}`}>
                    <button onClick={() => setMovieInfor()}>MUA VÉ</button>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;