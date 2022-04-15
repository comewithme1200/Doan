import React from 'react';
import axios from 'axios';
import styles from "./PickSeat.module.css";
import { ticketNumberSelector } from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux';
import { changeSeatQuantity } from '../../redux/action'

import Countdown from 'react-countdown';

const PickSeat = (props) => {

    const [seatsData, setSeatsData] = React.useState([]);
    const [seatChoosenNumber, setSeatChoosenNumber] = React.useState(0);

    const dispatch = useDispatch();

    const ticketNumber = useSelector(ticketNumberSelector);

    // console.log(ticketNumber);

    const handleTimeout = () => {

    }
    
    const handleChooseSeat = (status, id) => {
        console.log(seatChoosenNumber + " " + ticketNumber.standard + ticketNumber.vip);
        if (seatChoosenNumber < ticketNumber.standard + ticketNumber.vip || status === 3) {
            if (status === 2) {
                const seatDataClone = [...seatsData];
                for(var seat of seatDataClone) {
                    for(var seatNumber of seat.seatNumberArrayList) {
                        if (seatNumber.id === id) {
                            seatNumber.status = 3;
                        }
                    }
                }
                console.log("before add: " + seatChoosenNumber);
                setSeatChoosenNumber(seatChoosenNumber + 1);
                console.log("after add: " + seatChoosenNumber)
                dispatch(changeSeatQuantity(seatChoosenNumber));
                setSeatsData(seatDataClone);
            } else {
                if (status === 0) {
                    alert("Ghế đang được người khác chọn")
                } else if (status === 3){
                    const seatDataClone = [...seatsData];
                    for(var seat of seatDataClone) {
                        for(var seatNumber of seat.seatNumberArrayList) {
                            if (seatNumber.id === id) {
                                seatNumber.status = 2;
                            }
                        }
                    }
                    console.log("before minus: " + seatChoosenNumber);
                    setSeatChoosenNumber(seatChoosenNumber - 1);
                    console.log("after minus: " + seatChoosenNumber)
                    dispatch(changeSeatQuantity(seatChoosenNumber));
                    setSeatsData(seatDataClone);
                } else {
                    alert("Ghế đã được bán")
                }
            }
        }
    }

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


    var data = '';

    var config = {
        method: 'get',
        url: '/seats/status',
        headers: { },
        params: {
            room_id: props.roomId,
            premiere_id: props.premiereId
        },
        data : data
    };

    
    React.useEffect(() => {
        axios(config).then(function (response) {
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
                                <div className={`${seatNumber.status === 1 ? styles.sold : seatNumber.status === 0 ? styles.selected : seatNumber.status === 3 ? styles.self_selected : ''}`} key={seatNumber.id} onClick={() => handleChooseSeat(seatNumber.status, seatNumber.id)}>
                                    {seat.rows_alphabet + seatNumber.number}
                                </div>
                            </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.timer_text}>Thời gian của bạn còn: </div>
                <Countdown date={Date.now() + 150000} renderer={renderer} onComplete={handleTimeout}/>
            </div>
        </div>
    );
};

export default PickSeat;