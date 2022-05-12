import React from 'react';
import Slider from '../Slider/Slider';
import MovieCarousel from '../MovieSlider/MovieCarousel';
import SaleCarousel from '../SaleSlider/SaleCarousel';
import { fillBuyProcessStatus, changeSeatChoosen, changeVipTicketNumber, changeStandardTicketNumber} from '../../redux/action';
import { seatChoosenSelector, invoiceInfoSelector, premiereRoomInfoSelector } from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux';
import { useStateIfMounted } from 'use-state-if-mounted'
import axios from 'axios';
const MainContent = () => {
    const [mainContentMoviesData, setMainContentMoviesData] = useStateIfMounted({});

    const dispatch = useDispatch();

    const invoiceInfo = useSelector(invoiceInfoSelector);

    const seatChoosen = useSelector(seatChoosenSelector);

    const roomPremiereInfo = useSelector(premiereRoomInfoSelector);

    const renderUpdateData = () => {
        var resultData = [];
        console.log(seatChoosen);
        if (seatChoosen) {
            for(var seat of seatChoosen.seatChoose) {
                resultData.push({
                    seat_id : seat.seat_id,
                    premiere_id: roomPremiereInfo.premiere_id,
                    status: "",
                    disabled: ""
                });
            }
        }
        return resultData;
    };

    React.useEffect(() => {
        axios.get('/movies').then( res => {
            setMainContentMoviesData(res.data);
        }).catch(err => {
            console.log(err);
        });
        if (seatChoosen) {
            var data = renderUpdateData();
            var config = {
                method: 'delete',
                url: '/seats',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };
            
            axios(config).then(function (response) {
            }).catch(function (error) {
                console.log(error);
            });
        }
        if (invoiceInfo) {
            const data = invoiceInfo.invoiceId;
            const config = {
            method: 'delete',
            url: '/invoice',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };
            axios(config).then(function (response) {
            console.log(JSON.stringify(response.data));
            }).catch(function (error) {
                console.log(error);
            });
        }
        dispatch(fillBuyProcessStatus(false)); 
        dispatch(changeSeatChoosen({
            seatChoose : [],
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