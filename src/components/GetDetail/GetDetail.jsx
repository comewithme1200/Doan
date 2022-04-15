import React from 'react';
import {
    BrowserRouter as Router,
    useParams,
  } from "react-router-dom";
import DateCard from '../DateCard/DateCard';
import FilmInfoCard from '../FilmInfoCard/FilmInfoCard';
import './GetDetail.css';
import { premiereListSelector } from '../../redux/selectors'
import { fillPremiereList } from '../../redux/action'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


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
    var { id, movie_name } = useParams();

    const dispatch = useDispatch();

    var currentSelectedDate = '2022-' + dayListTmp[0].month + "-" + dayListTmp[0].date;

    const premiereList = useSelector(premiereListSelector);
    var data = '';

    var config = {
        method: 'get',
        url: '/premiere/movie',
        headers: { },
        params: {
            movie_id: id,
            date: '2022-' + dayListTmp[0].month + "-" + dayListTmp[0].date
        },
        data : data
    };

    
    React.useEffect(() => {
        axios(config).then(function (response) {
            dispatch(fillPremiereList(response.data));
        }).catch(function (error) {
            console.log(error);
        });  
    }, []);

    const [dayList, setDayList] = React.useState(dayListTmp);
    
    const setActive = (i) => {
        const dayListTmp2 = [...dayListTmp];
        for (let i = 0; i<=14; i++) {
            dayListTmp2[i].isActive = false;
        }
        dayListTmp2[i].isActive = true;
        currentSelectedDate = '2022-' + dayListTmp2[0].month + "-" + dayListTmp2[0].date
        setDayList(dayListTmp2);
        var data = '';

        var config = {
            method: 'get',
            url: '/premiere/movie',
            headers: { },
            params: {
                movie_id: id,
                date: '2022-' + dayListTmp[i].month + "-" + dayListTmp[i].date
            },
            data : data
        };

        axios(config).then(function (response) {
            dispatch(fillPremiereList(response.data));
        }).catch(function (error) {
            console.log(error);
        });  
        
    };

    return (
        <div className='Detail__container'>
            <div className='Detail__container-header'>
                <hr className='hr1'></hr>
                <div className='Datecard_container'>
                        {dayList.map((day, i) => (
                            <div className={`DateCard_container ${day.isActive ? 'activeDate' : ''}`} key={i} onClick = {() => setActive(i)}>
                                <DateCard {...day}/>
                            </div>
                        ))}
                </div>
                <hr className='hr1'></hr>
            </div>
            { premiereList.length !== 0 && (
                <div className='place_container'>
                    <FilmInfoCard movie_id={id} date={currentSelectedDate} movie_name={movie_name}/>
                </div>
            )}
            { premiereList.length === 0 && (
                <div className='not_found_premiere'>
                    Hiện không có xuất chiếu phim vào ngày này
                </div>
            )}
            
            
        </div>
    );
};

export default GetDetail;