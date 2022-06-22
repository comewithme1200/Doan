import React from 'react';
import styles from './BuyHistory.module.css';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '../../redux/selectors';
import HistoryCard from '../HistoryCard/HistoryCard';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
var axios = require('axios');

const BuyHistory = () => {
    
    const [buyHistory, setBuyHistory] = React.useState([]);

    console.log(buyHistory);

    const userInfo = useSelector(userInfoSelector);

    const token = userInfo.token ? userInfo.token : localStorage.getItem('token');

    const TOKEN = 'Bearer ' + token;

    React.useEffect(() => {
        var config = {
            method: 'get',
            url: '/invoice/history',
            headers: { 
                'Authorization': TOKEN
            }
            };
        
            axios(config)
            .then(function (response) {
                setBuyHistory(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleGetInvoiceDetail = (invoice_id) => {
        console.log(invoice_id);
    }

    const handlePagination = (current) => {
        console.log(current);
    }

    const now = new Date().getTime();
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Lịch sử mua vé
            </div>
            <hr className={styles.hr} />
            {buyHistory?.map((history) => (
                <Link to={ history.premiere_end_time > now ? `/OnlineInvoice/${history.invoice_id}` : '#'}>
                    <HistoryCard props={history} key={history.invoice_id}/>
                </Link>
            ))}
            <Pagination defaultCurrent={1} total={50} current onChange={() => handlePagination()}/>
        </div>
    );
};

export default BuyHistory;