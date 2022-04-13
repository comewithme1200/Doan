import React from 'react';
import axios from 'axios';
import styles from "./PickSeat.module.css";

import Countdown from 'react-countdown';

const PickSeat = (props) => {

    const [seatsData, setSeatsData] = React.useState([]);
    const [seatOccupiedData, setSeatOccupiedData] = React.useState([]);
   
    const Completionist = () => <span>You are good to go!</span>;
    
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
            <span>
                {minutes}:{seconds}
            </span>
            );
        }   
    };

    React.useEffect(() => {
        axios.get("/seats/status", {params : {premiere_id: props.premiereId}}).then(function (response) {
            setSeatOccupiedData(response.data);
        }).catch(function (error) {
            console.log(error);
        }); 
        axios.get("/seats", {params : {room_id: props.roomId}}).then(function (response) {
            
            setSeatsData(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        
    }, []);

    return (
        <div className={styles.pick_seat_outer}>
            <div className={styles.left}>
                <div className={styles.pick_seat_screen}>Screen</div>
                <div className={styles.pick_seat_container}>
                    {seatsData.map((seat, i) => (
                        <div className={styles.row} key={i}>
                            {seat.seatNumberArrayList.map((seatNumber) => (
                                <div className={styles.seat} key={seatNumber.id}>
                                    {seat.rows_alphabet + seatNumber.number}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.timer_text}>Thời gian của bạn còn: </div>
                <Countdown date={Date.now() + 150000} renderer={renderer} />
            </div>
        </div>
    );
};

export default PickSeat;