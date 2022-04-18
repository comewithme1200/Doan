import React from 'react';
import styles from './PickSeatContainer.module.css'
import Countdown from 'react-countdown';
import PickSeat from '../PickSeat/PickSeat';
import { Navigate } from 'react-router'

const PickSeatContainer = (props) => {
    
    const startDate = React.useRef(Date.now());

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Navigate to='/ChooseTicketTimeout' />
        } else {
            // Render a countdown
            return (
            <span>
                {minutes}:{seconds}
            </span>
            );
        }   
    };

    return (
        <div className={styles.pick_seat_container_outer}>
            <div className={styles.left}>
                <PickSeat roomId={props.roomId} ticketNumber={props.ticketNumber} premiereId={props.premiereId}/>
            </div>
            <div className={styles.right}>
                <div className={styles.timer_text}>Thời gian của bạn còn: </div>
                <Countdown date={startDate.current + 150000} renderer={renderer}/>
            </div>
        </div>
    );
};

export default PickSeatContainer;