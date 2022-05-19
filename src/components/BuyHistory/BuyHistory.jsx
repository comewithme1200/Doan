import React from 'react';
import styles from './BuyHistory.module.css';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '../../redux/selectors';
import HistoryCard from '../HistoryCard/HistoryCard';
var axios = require('axios');

const BuyHistory = () => {
    
    const [buyHistory, setBuyHistory] = React.useState([]);

    const userInfo = useSelector(userInfoSelector);

    const token = userInfo.token ? userInfo.token : localStorage.getItem('token');


    const TOKEN = 'Bearer ' + token;
    console.log(TOKEN);

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
    

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Lịch sử mua vé
            </div>
            <hr className={styles.hr} />
            {buyHistory?.map((history, key = history.invoice_id) => (
                <HistoryCard props={history}/>
            ))}
        </div>
    );
};

export default BuyHistory;