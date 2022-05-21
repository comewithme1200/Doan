import React from 'react';
import styles from './HistoryCard.module.css';

const HistoryCard = (props) => {
    var ts = new Date(props.props.created_date);

    const now = new Date().getTime();

    return (
        <div className={`${props.props.premiere_end_time > now ? styles.container : styles.container_disable}`}>
            <div className={styles.movie_container}>
                <img src={"assets/" + props.props.image_path}/>
                <div className={styles.movie_name}>{props.props.movie_name}</div>
            </div>
            <div className={styles.date}>{ts.toLocaleDateString()}</div>
            <div className={styles.totalPrice}>{props.props.totalPrice}</div>
        </div>
    );
};

export default HistoryCard;