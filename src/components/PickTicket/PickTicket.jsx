import React from 'react';
import { QuantityPicker } from 'react-qty-picker';
import { useDispatch, useSelector } from 'react-redux';
import { buyProcessObjSelector, ticketNumberSelector, movieInfoSelector, premiereRoomInfoSelector, ticketPriceSelector } from '../../redux/selectors'
import { changeStandardTicketNumber, changeVipTicketNumber, fillTicketPrice } from '../../redux/action'
import styles from "./PickTicket.module.css";
var axios = require('axios');

const PickTicket = () => {

    const dispatch = useDispatch();
    
    const buyProcessObj = useSelector(buyProcessObjSelector);

    const ticketNumber = useSelector(ticketNumberSelector);

    const movieInfo = useSelector(movieInfoSelector);
    
    const premiereRoomInfo = useSelector(premiereRoomInfoSelector);

    const ticketPrice = useSelector(ticketPriceSelector);

    React.useEffect(() => {
        var config = {
            method: 'get',
            url: '/price?premiere_id=' + premiereRoomInfo.premiere_id + '&room_id=' + premiereRoomInfo.room_id ,
            headers: { 
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          };
          
          axios(config)
          .then(function (response) {
            dispatch(fillTicketPrice({
                vip: response.data.vipPrice,
                standard: response.data.standardPrice
            }));
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }, []);

    const data = [
        {
            name: "Adult Standard 2D",
            price: ticketPrice.standard,
        },
        {
            name: "Adult VIP 2D",
            price: ticketPrice.vip,
        }
    ];

    const [priceStandard, setPriceStandard] = React.useState(0);
    const [priceVIP, setPriceVIP] = React.useState(0);

    const getStandardPickerValue = (value) => {
        setPriceStandard(value * ticketPrice.standard);
        dispatch(changeStandardTicketNumber(value))
    }

    const getVIPPickerValue = (value) => {
        setPriceVIP(value * ticketPrice.vip);
        dispatch(changeVipTicketNumber(value))
    }
    return (
        <div className={styles.pick_ticket_container}>
            <div className={styles.pick_ticket_filmInfo_container}>
                <div className={styles.pick_ticket_filmInfo}>
                    <img src={movieInfo.image_path}></img> 
                    <div className={styles.pick_ticket_ticketInfo}>
                        <div className={styles.pick_ticket_filmName}>{buyProcessObj.movie_name}</div>
                        <div className={styles.pick_ticket_preniereInfo}>Showing on {buyProcessObj.date}</div>
                    </div>
                </div>
                <div>
                    <table className={styles.pick_ticket_cart}>
                        <thead>
                            <tr><th>GIỎ HÀNG CỦA BẠN</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Tổng cộng</td>
                                <td>VND {priceStandard + priceVIP}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.pick_ticket_note}>
                <h2>LƯU Ý</h2>
                <ul className={styles.pick_ticket_noteList}>
                    <li>Hãy chọn kỹ loại vé và số lượng bạn muốn mua</li>
                    <li>Bạn có thể mua tối đa 10 vé trong một lần giao dịch</li>
                </ul>
            </div>
            <div className={styles.pick_ticket_choose_ticket_container}>
                <table className={styles.pick_ticket_choose_ticket}>
                    <thead>
                        <tr>
                            <th>Vé</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data[0].name}</td>
                            <td>{data[0].price}</td>
                            <td><QuantityPicker max={10 - ticketNumber.vip} min={0} value={ticketNumber.standard} smooth width='6.8rem' onChange={getStandardPickerValue} /></td>
                            <td>{priceStandard}</td>
                        </tr>
                        <tr>
                            <td>{data[1].name}</td>
                            <td>{data[1].price}</td>
                            <td><QuantityPicker max={10 - ticketNumber.standard} min={0} value={ticketNumber.vip} smooth width='6.8rem' onChange={getVIPPickerValue} /></td>
                            <td>{priceVIP}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PickTicket;