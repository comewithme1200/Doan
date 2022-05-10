import React from 'react';
import styles from './Payment.module.css'
import { useState, useRef, useEffect } from 'react'
import PaypalButton from '../PaypalButtons/PaypalButton';

const Payment = () => {

    const [paymentType, setPaymentType] = React.useState("Paypal");

    const [render, setRender] = React.useState(true);

    const setGender = (event) => {
        const type = event.target.value
        setPaymentType(type);
        console.log(paymentType);
    }
    return (
        <div className={styles.container}>
            <div className={styles.note}>Lựa chọn hình thức thanh toán</div>
            <div className={styles.payment} onChange={event => setGender(event)}>
                <input type="radio" value="Paypal" defaultChecked name="paymentType"/> PayPal
                <input type="radio" value="Momo" name="paymentType"/> Momo
            </div>
            { !render && (
                <button className={styles.pay} onClick={() => setRender(true)}>Thanh Toán</button>
            )}
           
            <PaypalButton />
        
        </div>
    );  
};

export default Payment;