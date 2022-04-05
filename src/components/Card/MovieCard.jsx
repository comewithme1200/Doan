import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./MovieCard.module.css";
import { toggleBuyScreen } from '../../redux/action';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
    const dispatch = useDispatch();
    const handleBuyBtn = () => {
        dispatch(
            toggleBuyScreen()
        );
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.cardImage}>
                <img alt="Poster" src={props.src} />
            </div>
            <div className={styles.cardText}>
                <h3>Movie Name</h3>
            </div>
            <div className={styles.cardAction}>
                <Link to="/getDetail">
                    <button onClick={() => handleBuyBtn()}>MUA VÉ</button>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;