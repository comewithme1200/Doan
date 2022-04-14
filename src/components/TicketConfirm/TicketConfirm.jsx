import React from 'react';
import styles from "./TicketConfirm.module.css";
import Countdown from 'react-countdown';

const TicketConfirm = () => {

    const handleTimeout = () => {
        
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


    return (
        <div className={styles.pick_seat_outer}>
            <div className={styles.left}>
                <div className={styles.header}>GIỎ HÀNG CỦA BẠN</div>
                <table>
                    <tbody>
                        <tr className={styles.film_name}>
                            <td>PHIM:</td>
                            <td>2</td>
                        </tr>
                        <tr className={styles.cinema}>
                            <td>RẠP:</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>NGÀY:</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>SUẤT:</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>GHẾ:</td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.note_text}>Quý khách vui lòng kiểm tra lại thông tin trước khi thanh toán</div>
                <div className={styles.note_text} style={{color: 'red'}}>Vé mua rồi sẽ không được đổi hoặc trả lại</div>
                <table>
                    <thead className={styles.cart_table_head}>
                        <th>Mục</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                    </thead>
                    <tbody>
                        {/* dynamic render ticket here */}
                        <tr>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.timer_text}>Thời gian của bạn còn: </div>
                <Countdown date={Date.now() + 150000} renderer={renderer} onComplete={handleTimeout}/>
            </div>
        </div>
    );
};

export default TicketConfirm;