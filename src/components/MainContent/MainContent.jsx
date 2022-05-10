import React from 'react';
import Slider from '../Slider/Slider';
import MovieCarousel from '../MovieSlider/MovieCarousel';
import SaleCarousel from '../SaleSlider/SaleCarousel';
import { fillBuyProcessStatus, changeSeatChoosen, changeVipTicketNumber, changeStandardTicketNumber} from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
const MainContent = () => {
    const [mainContentMoviesData, setMainContentMoviesData] = React.useState({});

    const dispatch = useDispatch();

    React.useEffect(() => {
        axios.get('/movies').then( res => {
            setMainContentMoviesData(res.data);
        }).catch(err => {
            console.log(err);
        })  
        dispatch(fillBuyProcessStatus(false)); 
        dispatch(changeSeatChoosen({
            seatChoose : 0,
            seatNumber: 0
        }));
    
        dispatch(changeVipTicketNumber(0));
        dispatch(changeStandardTicketNumber(0));
    }, []);



    return (
        <div>
            <Slider />
            <MovieCarousel data={mainContentMoviesData}/>
            <SaleCarousel />
        </div>
    );
};

export default MainContent;