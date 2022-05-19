import React from 'react';
import styles from './HistoryCard.module.css';

const HistoryCard = (props) => {
    console.log(props);

    var ts = new Date(1652938198000);

    return (
        <div className={styles.container}>
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