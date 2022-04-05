import React from 'react';
import { Link } from 'react-router-dom';
import "./FilmInfoCard.css"

const FilmInfoCard = (props) => {
    const filmList = props.filmInfo;
    return (
        <div className='FilmInfoCard__outterContainer'>
            {filmList.map((prop) => (
                <div className='FilmInfoCard__container'>
                    <div className='FilmInfoCard__cinemaName'>{prop.cinemaName}</div>
                    {prop.info.map((info) => (
                        <div>
                            <div className='FilmInfoCard__roomName style'>{info.roomName}</div>
                            {info.time.map((time) => (
                                <Link to="/buyprocess">
                                    <div className='FilmInfoCard__time style'>{time} PM</div>
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