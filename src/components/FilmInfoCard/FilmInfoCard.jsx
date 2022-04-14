import React from 'react';
import { Link } from 'react-router-dom';
import "./FilmInfoCard.css"

import { useSelector } from 'react-redux';
import { premiereListSelector } from '../../redux/selectors'

const FilmInfoCard = () => {

    const filmList = useSelector(premiereListSelector);

    const filmListDateFilter = [...filmList];

    for (var premiere of filmListDateFilter) {
        for (var premiere1 of premiere.premiereResponseInfos) {
            for (var dtos of premiere1.premiereDtos) {
                const date = new Date(dtos.start_times);
                const hoursAndMinutes = date.getHours() + ':' + date.getMinutes();
                dtos.start_times = hoursAndMinutes
            }
        }
    }

    console.log(filmListDateFilter);

    return (
        <div className='FilmInfoCard__outterContainer'>
            {filmListDateFilter.map((prop) => (
                <div className='FilmInfoCard__container'>
                    <div className='FilmInfoCard__cinemaName'>{prop.cinema_name}</div>
                    {prop.premiereResponseInfos.map((info, i) => (
                        <div key={i}>
                            <div className='FilmInfoCard__roomName style'>{info.room_name}</div>
                            {info.premiereDtos.map((time, i) => (
                                <Link to="/buyprocess">
                                    <div className='FilmInfoCard__time style' key={time.id}>{time.start_times} PM</div>
                                </Link>
                            ))}
                        </div>
                    ))}
                    <hr className='hr__filmInfo'/>
                </div>
            ))}
        </div>
    );
};

export default FilmInfoCard;