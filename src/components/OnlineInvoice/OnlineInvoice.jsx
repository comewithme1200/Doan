import React from 'react';
import styles from './OnlineInvoice.module.css';
import { useSelector } from 'react-redux';
import { ticketDataSelector, userInfoSelector } from '../../redux/selectors';
import { useParams } from "react-router-dom";
import InvoiceCard from '../InvoiceCard/InvoiceCard';
var axios = require('axios');

const OnlineInvoice = () => {

    const [ticketData, setTicketData] = React.useState(new Array());

    const ticketList = useSelector(ticketDataSelector);

    const userInfo = useSelector(userInfoSelector);

    var { invoice_id } = useParams();

    React.useEffect(() => {
        setTicketData(ticketList);
        if (ticketData.length === 0) {
            var data = '';

            var config = {
            method: 'get',
            url: '/invoice/getTicket?invoice_id=' + invoice_id,
            headers: { 
                'Authorization': 'Bearer ' +  userInfo.token
            },
            data : data
            };

            axios(config)
            .then(function (response) {
                setTicketData(response.data);
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }, []);
    
    // console.log(ticketData);

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