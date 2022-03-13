import React from 'react';
import "./FilmInfoCard.css"

const FilmInfoCard = (props) => {
    console.log(props);
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
                                <div className='FilmInfoCard__time style'>{time} PM</div>
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