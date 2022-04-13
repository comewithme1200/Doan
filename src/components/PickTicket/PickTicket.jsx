import React from 'react';
import { QuantityPicker } from 'react-qty-picker';
import { useDispatch } from 'react-redux';
import { changeStandardTicketNumber, changeVipTicketNumber } from '../../redux/action'
import styles from "./PickTicket.module.css";

const PickTicket = () => {

    const dispatch = useDispatch();

    const data = [
        {
            name: "Adult Standard 2D",
            price: "90000",
        },
        {
            name: "Adult VIP 2D",
            price: "100000",
        }
    ];

    const [priceStandard, setPriceStandard] = React.useState(0);
    const [priceVIP, setPriceVIP] = React.useState(0);

    const getStandardPickerValue = (value) => {
        setPriceStandard(value * 90000);
        dispatch(changeStandardTicketNumber(value))
    }

    const getVIPPickerValue = (value) => {
        setPriceVIP(value * 100000);
        dispatch(changeVipTicketNumber(value))
    }
    return (
        <div className={styles.pick_ticket_container}>
            <div className={styles.pick_ticket_filmInfo_container}>
                <div className={styles.pick_ticket_filmInfo}>
                    <img src='assets/midsoma.jpg'></img>
                    <div className={styles.pick_ticket_ticketInfo}>
                        <div className={styles.pick_ticket_filmName}>MidSomar</div>
                        <div className={styles.pick_ticket_preniereInfo}>Showing on 08-04-2022</div>
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
                            <td><QuantityPicker max={9} min={0} smooth width='6.7rem' onChange={getStandardPickerValue} /></td>
                            <td>{priceStandard}</td>
                        </tr>
                        <tr>
                            <td>{data[1].name}</td>
                            <td>{data[1].price}</td>
                            <td><QuantityPicker max={9} min={0} smooth width='6.7rem' onChange={getVIPPickerValue} /></td>
                            <td>{priceVIP}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PickTicket;