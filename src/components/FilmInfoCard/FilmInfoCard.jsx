import React from 'react';
import { Link } from 'react-router-dom';
import "./FilmInfoCard.css"

import { useSelector, useDispatch } from 'react-redux';
import { premiereListSelector } from '../../redux/selectors'

const FilmInfoCard = (props) => {

    const filmList = useSelector(premiereListSelector);

    const filmListDateFilter = [...filmList];

    const dispatch = useDispatch();

    // const handleChoosePremiere = () => {
    //     dispatch(fillBuyProcessObj({
    //         movie_name: props.movie_name,
    //         date: props.date
    //     }));
    // }

    for (var premiere of filmListDateFilter) {
        for (var premiere1 of premiere.premiereResponseInfos) {
            for (var dtos of premiere1.premiereDtos) {
                const date = new Date(dtos.start_times);
                const hoursAndMinutes = date.getHours() + ':' + date.getMinutes();
                dtos.start_times = hoursAndMinutes
            }
        }
    }

    return (
        <div className='FilmInfoCard__outterContainer'>
            {filmListDateFilter.map((prop, i) => (
                <div className='FilmInfoCard__container' key={i}>
                    <div className='FilmInfoCard__cinemaName'>{prop.cinema_name}</div>
                    {prop.premiereResponseInfos.map((info, i) => (
                        <div key={i}>
                            <div className='FilmInfoCard__roomName style'>{info.room_name}</div>
                            {info.premiereDtos.map((time, i) => (
                                <Link to={`/buyprocess/${props.movie_id}`}>
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