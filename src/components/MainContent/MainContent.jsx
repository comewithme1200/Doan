import React from 'react';
import Slider from '../Slider/Slider';
import MovieCarousel from '../MovieSlider/MovieCarousel';
import SaleCarousel from '../SaleSlider/SaleCarousel';
import { fillBuyProcessStatus, changeSeatChoosen, changeVipTicketNumber, changeStandardTicketNumber, changeIsPaid, fillInvoiceInfo } from '../../redux/action';
import { seatChoosenSelector, invoiceInfoSelector, premiereRoomInfoSelector, isPaidSelector } from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux';
import { useStateIfMounted } from 'use-state-if-mounted'
import axios from 'axios';
const MainContent = () => {
    const [mainContentMoviesData, setMainContentMoviesData] = useStateIfMounted({});

    const dispatch = useDispatch();

    const invoiceInfo = useSelector(invoiceInfoSelector);

    const seatChoosen = useSelector(seatChoosenSelector);

    const roomPremiereInfo = useSelector(premiereRoomInfoSelector);

    const isPaid = useSelector(isPaidSelector);

    React.useEffect(() => {
        console.log("render");
        axios.get('/movies').then( res => {
            setMainContentMoviesData(res.data);
        }).catch(err => {
            console.log(err);
        });
        const renderUpdateData = () => {
            var resultData = [];
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
        if (seatChoosen.length !== 0 && isPaid === false) {
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
        if (invoiceInfo.invoiceId !== "" && isPaid === false) {
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
        dispatch(changeIsPaid(false))
        dispatch(fillInvoiceInfo({
            invoiceId: '',
            status: 0,
            user_id: ''
        }))
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