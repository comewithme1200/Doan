import React from 'react';
import styles from './Payment.module.css';
import { ticketNumberSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import PaypalButton from '../PaypalButtons/PaypalButton';
import { configConsumerProps } from 'antd/lib/config-provider';

const Payment = () => {

    const [paymentType, setPaymentType] = React.useState("Paypal");

    const [render, setRender] = React.useState(true);

    const ticketNumber = useSelector(ticketNumberSelector);

    console.log(ticketNumber);

    const setGender = (event) => {
        const type = event.target.value
        setPaymentType(type);
        console.log(paymentType);
    }
    return (
        <div className={styles.container}>
            <div className={styles.note}>Lựa chọn hình thức thanh toán</div>
            <div className={styles.payment} onChange={event => setGender(event)}>
            <span className={styles.span}>
                <input className={styles.radio} type="radio" value="Paypal" defaultChecked name="paymentType"/>
                <label className={styles.label}>Paypal</label>
            </span>
            <span className={styles.span}>
                <input className={styles.radio} type="radio" value="Momo" name="paymentType"/> 
                <label className={styles.label}>Momo</label>
            </span>
            </div>
            { !render && (
                <button className={styles.pay} onClick={() => setRender(true)}>Thanh Toán</button>
            )}
           
            <PaypalButton />
        
        </div>
    );  
};

export default Payment;