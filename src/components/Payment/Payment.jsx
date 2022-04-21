import React from 'react';
import styles from './Payment.module.css'
import { useState, useRef, useEffect } from 'react'

const Payment = () => {

    const setGender = (event) => {
        console.log(event.target.value);
    }
    return (
        <div className={styles.container}>
            <div className={styles.note}>Lựa chọn hình thức thanh toán</div>
            <div className={styles.payment} onChange={event => setGender(event)}>
                <input type="radio" value="Paypal" defaultChecked name="paymentType"/> PayPal
                <input type="radio" value="Momo" name="paymentType"/> Momo
            </div>
            <button className={styles.pay}>Thanh Toán</button>
        </div>
    );  
};

export default Payment;