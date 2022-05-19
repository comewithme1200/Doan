import React from 'react';
import styles from './OnlineInvoice.module.css';
import { useSelector } from 'react-redux';
import { ticketDataSelector } from '../../redux/selectors'
import InvoiceCard from '../InvoiceCard/InvoiceCard';

const OnlineInvoice = () => {

    const ticketData  = useSelector(ticketDataSelector);

    console.log(ticketData);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.success}>Chúc mừng bạn!!!</div>
                <div className={styles.text}>Quá trình mua vé đã hoàn tất. LC Cinema xin chân thành cảm ơn quý khách đã lựa chọn chúng tôi để phục nhu cầu giải trí của các bạn!!</div>
                <div className={styles.note}>Để quá trình vào rạp được thuận lợi! Quý khách nên tải vé về máy để đảm bảo trải nghiệm dịch vụ là tốt nhất!</div>
            </div>
            <div className={styles.ticket_section}>
                {ticketData?.map((ticket) => (
                    <InvoiceCard ticketInfo={ticket}/>
                ))}
            </div>
        </div>
    );
};

export default OnlineInvoice;