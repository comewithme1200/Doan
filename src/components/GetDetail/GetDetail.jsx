import React from 'react';
import DateCard from '../DateCard/DateCard';
import './GetDetail.css'


const dayListTmp = [];
const today = new Date();
const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const dayObj = {
    day: weekday[today.getDay()],
    date: today.getDate(),
    month: ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1),
    isActive: true
}
dayListTmp.push(dayObj);

for (let i = 1; i <= 14; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    const dayObj = {
        day: weekday[nextDay.getDay()],
        date: nextDay.getDate(),
        month: ((nextDay.getMonth() + 1) < 10 ? '0' : '') + (nextDay.getMonth() + 1),
        isActive: false
    }
    dayListTmp.push(dayObj);
}
const GetDetail = () => {
    const [dayList, setDayList] = React.useState(dayListTmp);
    const placeList = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Quảng Ninh", "Hải Dương", "Bắc Ninh", "Tuyên Quang", "Hà Giang", "Nha Trang"];
    const setActive = (i) => {
        const dayListTmp2 = [...dayListTmp];
        for (let i = 0; i<=14; i++) {
            dayListTmp2[i].isActive = false;
        }
        dayListTmp2[i].isActive = true;
        setDayList(dayListTmp2);
    };
    return (
        <div className='Detail__container'>
            <div className='Detail__container-header'>
                <hr className='hr1'></hr>
                <div className='Datecard_container'>
                        {dayList.map((day, i) => (
                            <div className={`DateCard_container ${day.isActive ? 'active' : ''}`} key={i} onClick = {() => setActive(i)}>
                                <DateCard {...day}/>
                            </div>
                        ))}
                </div>
                <hr className='hr1'></hr>
            </div>
            <div className='place_container'>
                {placeList.map((place) => (
                    <button>{place}</button>
                ))}  
                <hr className='hr1'></hr>
            </div>

        </div>
    );
};

export default GetDetail;