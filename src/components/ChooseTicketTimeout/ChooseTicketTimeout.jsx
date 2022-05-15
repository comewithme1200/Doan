import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ChooseTicketTimeout.module.css';

const ChooseTicketTimeout = () => {
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