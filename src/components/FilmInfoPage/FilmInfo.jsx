import React from 'react';
import YoutubeFrame from '../YoutubeFrame/YoutubeFrame';
import styles from './FilmInfo.module.css'
var axios = require('axios');

const FilmInfo = (props) => {

    console.log(props.movie_id);

    const [movieInfo, setMovieInfo] = React.useState({});

    React.useEffect(() => {
        var config = {
            method: 'get',
            url: 'movies/getMovieInfo?id=' + props.movie_id,
            headers: { }
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            setMovieInfo(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    var ts = new Date(movieInfo.premiere_date);

    return (
        <div className={styles.container}>
            <img src={"../../assets/" + movieInfo.image_path}/>
            <div className={styles.movieInfo}>
                <div className={styles.movieName}>{movieInfo.movie_name}</div>
                <div className={styles.detail}>{movieInfo.detail}</div>
                <table>
                    <tr>
                        <td>Khởi chiếu</td>
                        <td>{ts.toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td>Thời lượng</td>
                        <td>{movieInfo.time} phút</td>
                    </tr>
                </table>
                {movieInfo.trailer_link !== '' && (
                    <YoutubeFrame embedId={movieInfo.trailer_link} />
                )}
            </div>
        </div>
    );
};

export default FilmInfo;