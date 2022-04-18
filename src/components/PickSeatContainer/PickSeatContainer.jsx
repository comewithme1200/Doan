import React from 'react';
import Countdown from 'react-countdown';
import { Navigate } from 'react-router'

import styles from './PickSeatContainer.module.css'
import PickSeat from '../PickSeat/PickSeat';

const PickSeatContainer = (props) => {

    const startDate = React.useRef(Date.now());

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // reset number seat have been choosen before
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