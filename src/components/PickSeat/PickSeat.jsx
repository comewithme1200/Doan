import React from 'react';
import axios from 'axios';
import styles from "./PickSeat.module.css";
import { ticketNumberSelector } from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux';
import { changeSeatChoosen } from '../../redux/action'

const PickSeat = (props) => {
    const [seatsData, setSeatsData] = React.useState([]);

    const dispatch = useDispatch();

    const ticketNumber = useSelector(ticketNumberSelector);

    var seatChoosenArray = React.useRef([]);

    var vip = React.useRef(ticketNumber.vip);

    var standard = React.useRef(ticketNumber.standard);

    console.log(vip.current + " " + standard.current);

    const handleChooseSeat = (status, id, type) => {
        if (seatChoosenArray.current.length < ticketNumber.standard + ticketNumber.vip || status === 3) {
            if ((type === 'vip' && vip.current > 0) || (type === 'vip' && vip.current === 0 && status === 3)) {
                if (status === 2) {
                    const seatDataClone = [...seatsData];
                    for(var seat of seatDataClone) {
                        for(var seatNumber of seat.seatNumberArrayList) {
                            if (seatNumber.id === id) {
                                seatNumber.status = 3;
                                seatChoosenArray.current.push({
                                    seat_id: seatNumber.id,
                                    number: seatNumber.number,
                                    rows_alphabet: seat.rows_alphabet,
                                    type: type
                                });
                                vip.current = vip.current - 1;
                            }
                        }
                    }
                    dispatch(changeSeatChoosen({
                        seatChoose : seatChoosenArray.current,
                        seatNumber: seatChoosenArray.current.length
                    }));
                    setSeatsData(seatDataClone);
                } else {
                    if (status === 0) {
                        alert("Ghế đang được người khác chọn")
                    } else if (status === 3){
                        const seatDataClone = [...seatsData];
                        var seatNumberIdTmp;
                        for(seat of seatDataClone) {
                            for(seatNumber of seat.seatNumberArrayList) {
                                if (seatNumber.id === id) {
                                    seatNumberIdTmp = seatNumber.id;
                                    seatNumber.status = 2;
                                }
                            }
                        }
                        seatChoosenArray.current = seatChoosenArray.current.filter(function(seatChoosen) {
                            return seatChoosen.seat_id !== seatNumberIdTmp;
                        });
                        vip.current = vip.current + 1;
                        dispatch(changeSeatChoosen({
                            seatChoose : seatChoosenArray.current,
                            seatNumber: seatChoosenArray.current.length
                        }));
                        setSeatsData(seatDataClone);
                    } else {
                        alert("Ghế đã được bán")
                    }
                }
            } else if (type === 'vip' && vip.current === 0){
                alert('Bạn đã chọn hết vé vip đã đặt');
            }
            if ((type === 'standard' && standard.current > 0) || (type === 'standard' && standard.current === 0 && status === 3)) {
                if (status === 2) {
                    const seatDataClone = [...seatsData];
                    for(seat of seatDataClone) {
                        for(seatNumber of seat.seatNumberArrayList) {
                            if (seatNumber.id === id) {
                                seatNumber.status = 3;
                                seatChoosenArray.current.push({
                                    seat_id: seatNumber.id,
                                    number: seatNumber.number,
                                    rows_alphabet: seat.rows_alphabet,
                                    type: type
                                });
                                standard.current = standard.current - 1;
                            }
                        }
                    }
                    dispatch(changeSeatChoosen({
                        seatChoose : seatChoosenArray.current,
                        seatNumber: seatChoosenArray.current.length
                    }));
                    setSeatsData(seatDataClone);
                } else {
                    if (status === 0) {
                        alert("Ghế đang được người khác chọn")
                    } else if (status === 3){
                        const seatDataClone = [...seatsData];
                        for(seat of seatDataClone) {
                            for(seatNumber of seat.seatNumberArrayList) {
                                if (seatNumber.id === id) {
                                    seatNumberIdTmp = seatNumber.id;
                                    seatNumber.status = 2;
                                }
                            }
                        }
                        seatChoosenArray.current = seatChoosenArray.current.filter(function(seatChoosen) {
                            return seatChoosen.seat_id !== seatNumberIdTmp;
                        });
                        standard.current = standard.current + 1;
                        dispatch(changeSeatChoosen({
                            seatChoose : seatChoosenArray.current,
                            seatNumber: seatChoosenArray.current.length
                        }));
                        setSeatsData(seatDataClone);
                    } else {
                        alert("Ghế đã được bán")
                    }
                }
            } else if (type === 'standard' && standard.current === 0) {
                alert('Bạn đã chọn hết vé thường đã đặt');
            }
        }
    }

    var data = '';

    var config = {
        method: 'get',
        url: '/seats/status',
        headers: { },
        params: {
            room_id: props.roomId,
            premiere_id: props.premiereId
        },
        data : data
    };

    
    React.useEffect(() => {
        axios(config).then(function (response) {
            setSeatsData(response.data);
        }).catch(function (error) {
            console.log(error);
        });  
    }, []);

    return (
        <div className={styles.pick_seat_outer}>
            <div className={styles.left}>
                <div className={styles.pick_seat_screen}>Screen</div>
                <div className={styles.pick_seat_container}>
                    {seatsData.map((seat, i) => (
                        <div className={styles.row} key={i}>
                            {seat.seatNumberArrayList.map((seatNumber) => (
                                <div className={styles.seat} key={seatNumber.id}>
                                <div className={`${seatNumber.status === 1 ? styles.sold : seatNumber.status === 0 ? styles.selected : seatNumber.status === 3 ? styles.self_selected : seatNumber.type === 'vip' ? styles.vip : ''}`} key={seatNumber.id} onClick={() => handleChooseSeat(seatNumber.status, seatNumber.id, seatNumber.type)}>
                                    {seat.rows_alphabet + seatNumber.number}
                                </div>
                            </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PickSeat;