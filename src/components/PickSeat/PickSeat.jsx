import React from 'react';
import axios from 'axios';
import styles from "./PickSeat.module.css";

const PickSeat = (props) => {

    const [seatsData, setSeatsData] = React.useState([]);
    
    console.log(seatsData);

    React.useEffect(() => {
        axios.get("/seats", {params : {room_id: props.roomId}}).then(function (response) {
            setSeatsData(response.data);
        }).catch(function (error) {
            console.log(error);
        }); 
    }, []);

    return (
        <div className={styles.pick_seat_outer}>
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
    );
};

export default PickSeat;