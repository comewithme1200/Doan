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
                            <tr><th>GI??? H??NG C???A B???N</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>T???ng c???ng</td>
                                <td>VND {priceStandard + priceVIP}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.pick_ticket_note}>
                <h2>L??U ??</h2>
                <ul className={styles.pick_ticket_noteList}>
                    <li>H??y ch???n k??? lo???i v?? v?? s??? l?????ng b???n mu???n mua</li>
                    <li>B???n c?? th??? mua t???i ??a 10 v?? trong m???t l???n giao d???ch</li>
                </ul>
            </div>
            <div className={styles.pick_ticket_choose_ticket_container}>
                <table className={styles.pick_ticket_choose_ticket}>
                    <thead>
                        <tr>
                            <th>V??</th>
                            <th>Gi??</th>
                            <th>S??? l?????ng</th>
                            <th>T???ng</th>
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