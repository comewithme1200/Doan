import React from 'react';
import styles from "./TicketConfirm.module.css";
import Countdown from 'react-countdown';
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux';
import { premiereRoomInfoSelector, seatChoosenSelector, buyProcessObjSelector, ticketNumberSelector, ticketPriceSelector } from '../../redux/selectors'
import axios from 'axios';

const TicketConfirm = () => {
    const startDate = React.useRef(Date.now());

    const premireInfo  = useSelector(premiereRoomInfoSelector);

    const seatChoosen = useSelector(seatChoosenSelector);

    const buyProcessObj = useSelector(buyProcessObjSelector);

    const ticketNumber = useSelector(ticketNumberSelector);

    const ticketPrice = useSelector(ticketPriceSelector);

    const renderUpdateData = () => {
        var resultData = [];
        for(var seat of seatChoosen.seatChoose) {
            resultData.push({
                seat_id : seat.seat_id,
                premiere_id: premireInfo.premiere_id,
                status: "",
                disabled: ""
            });
        }
        return resultData
    };
    var seatDatasString = '';


    for (const seatData of seatChoosen.seatChoose) {
        seatDatasString += seatData.rows_alphabet + seatData.number + ", ";
    }

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            var data = renderUpdateData();
            console.log(data);
            var config = {
                method: 'delete',
                url: '/seats',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };
            
            axios(config).then(function (response) {
                console.log(JSON.stringify(response.data));
            }).catch(function (error) {
                console.log(error);
            });
            return <Navigate to='/ChooseTicketTimeout' />
        } else {
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
                            <td>{buyProcessObj.movie_name}</td>
                        </tr>
                        <tr className={styles.cinema}>
                            <td>RẠP:</td>
                            <td>{premireInfo.cinema_name}</td>
                        </tr>
                        <tr>
                            <td>NGÀY:</td>
                            <td>{buyProcessObj.date}</td>
                        </tr>
                        <tr>
                            <td>SUẤT:</td>
                            <td>{premireInfo.time} / {premireInfo.room_name}</td>
                        </tr>
                        <tr>
                            <td>GHẾ:</td>
                            <td>{seatDatasString.substring(0, seatDatasString.length - 2)}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.note_text}>Quý khách vui lòng kiểm tra lại thông tin trước khi thanh toán</div>
                <div className={styles.note_text} style={{color: 'red'}}>Vé mua rồi sẽ không được đổi hoặc trả lại</div>
                <table>
                    <thead className={styles.cart_table_head}>
                        <tr>
                            <th>Mục</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* dynamic render ticket here */}
                        {ticketNumber.standard !== 0 && (
                            <tr>
                                <td>Adult Standard 2D</td>
                                <td>{ticketPrice.standard * ticketNumber.standard}</td>
                                <td>{ticketNumber.standard}</td>
                            </tr>    
                        )}
                        {ticketNumber.vip !== 0 && (
                            <tr>
                                <td>Adult VIP 2D</td>
                                <td>{ticketPrice.vip * ticketNumber.vip}</td>
                                <td>{ticketNumber.vip}</td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.timer_text}>Thời gian của bạn còn: </div>
                <Countdown date={startDate.current + 150000} renderer={renderer}/>
            </div>
        </div>
    );
};

export default TicketConfirm;