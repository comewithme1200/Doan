import React from 'react';
import './DateCard.css'

const DateCard = (props) => {    
    return (
        <>
            <div className='month_day_container'>
                <div className='month'>{props.month}</div>
                <div className='day'>{props.day}</div>
            </div>
            <div className='date'>{props.date}</div>
        </>
    );
};

export default DateCard;