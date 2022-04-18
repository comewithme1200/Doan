import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ChooseTicketTimeout.module.css'
import { changeSeatChoosen, changeVipTicketNumber, changeStandardTicketNumber } from '../../redux/action'
import { useDispatch } from 'react-redux';

const ChooseTicketTimeout = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(changeSeatChoosen({
            seatChoose : 0,
            seatNumber: 0
        }));
    
        dispatch(changeVipTicketNumber(0));
        dispatch(changeStandardTicketNumber(0));
    }, []);
    
    return (
        <div className={styles.container}>
            <div className={styles.announcement}>XIN LỖI BẠN ĐÃ QUÁ THỜI GIAN ĐỂ MUA VÉ VỀ TRANG CHỦ ĐỂ ĐẶT LẠI VÉ</div>
            <Link to='/'>
                <button className={styles.button}>HOME</button>
            </Link>
        </div>
    );
};

export default ChooseTicketTimeout;