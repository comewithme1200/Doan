import React from 'react';
import { Steps, Button, message } from 'antd';
import "./BuyProcess.css"
import 'antd/dist/antd.css'
import {
  useParams,
} from "react-router-dom";
import PickTicket from '../PickTicket/PickTicket';
import { ticketNumberSelector, premiereRoomInfoSelector, seatChoosenSelector, userInfoSelector, invoiceInfoSelector, ticketPriceSelector } from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux';
import TicketConfirm from '../TicketConfirm/TicketConfirm';
import { fillInvoiceInfo, fillBuyProcessStatus, fillTotalBill } from '../../redux/action'
import Payment from '../Payment/Payment';
import PickSeatContainer from '../PickSeatContainer/PickSeatContainer';
var axios = require('axios');

const { Step } = Steps;

const BuyProcess = () => {
  const [current, setCurrent] = React.useState(0);
  const [roomId, setRoomId] = React.useState('');
  const [premiereId, setPremiereId] = React.useState('');

  const dispatch = useDispatch();

  var { id } = useParams();

  const ticketNumber = useSelector(ticketNumberSelector);

  const roomPremiereInfo = useSelector(premiereRoomInfoSelector);

  const seatChoosen = useSelector(seatChoosenSelector);

  const userInfo = useSelector(userInfoSelector);

  const invoiceInfo = useSelector(invoiceInfoSelector);

  const ticketPrice = useSelector(ticketPriceSelector);

  React.useEffect(() => {
    dispatch(fillBuyProcessStatus(true));
  }, []);

  const renderUpdateData = () => {
    var resultData = [];
    for(var seat of seatChoosen.seatChoose) {
        resultData.push({
            seat_id : seat.seat_id,
            premiere_id: roomPremiereInfo.premiere_id,
            status: "",
            disabled: ""
        });
    }
    return resultData;
  };

  const steps = [
    {
      title: 'Chọn vé',
      content: <PickTicket movie_id={id}/>
    },
    {
      title: 'Chọn ghế',
      content: <PickSeatContainer roomId={roomId} ticketNumber={ticketNumber} premiereId={premiereId} />
    },
    {
      title: 'Xác nhận',
      content: <TicketConfirm/>,
    },
    {
      title: 'Thanh Toán',
      content: <Payment />,
    },
  ];

    const next = () => {
      if (current === 0) {
        if (ticketNumber.standard + ticketNumber.vip > 0) {
          setCurrent(current + 1);
          setRoomId(roomPremiereInfo.room_id);
          setPremiereId(roomPremiereInfo.premiere_id);
          const totalBill = ticketNumber.standard * ticketPrice.standard + ticketNumber.vip * ticketPrice.vip;
          console.log(totalBill);
          dispatch(fillTotalBill(totalBill));
        } else {
          alert("Chưa chọn vé");
        }
      } else if (current === 1) {
        if (seatChoosen.seatNumber !== ticketNumber.standard + ticketNumber.vip) {
            alert("Bạn chưa chọn hết ghế cho vé đã chọn");
        } else {
          var updateSeatOccupiedData = [];

          for (const seatChoose of seatChoosen.seatChoose) {
            updateSeatOccupiedData.push(
              {
                  seat_id: seatChoose.seat_id,
                  premiere_id: roomPremiereInfo.premiere_id,
                  status: ''
              });
          }
          var data = JSON.stringify(updateSeatOccupiedData);
          
          var config = {
            method: 'post',
            url: '/seats',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
              setCurrent(current + 1);
          })
          .catch(function (error) {
            console.log(error.response.data);
            alert(error.response.data.message);
          });
          
        }
      } else if (current === 2) {
        var seatList = [];
        for(var seat of seatChoosen.seatChoose) {
          seatList.push({
              seat_id : seat.seat_id,
              premiere_id: roomPremiereInfo.premiere_id,
              price: seat.type === 'vip' ? ticketPrice.vip : ticketPrice.standard
          });
        } 
        const data = {
          user_id: userInfo.user_id,
          invoiceDetailCreateParams: seatList
        }
        config = {
          method: 'post',
          url: '/invoice',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          dispatch(fillInvoiceInfo({
            invoiceId: response.data.invoice.id,
            status: response.data.invoice.status,
            user_id: response.data.invoice.user_id
          }));
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        setCurrent(current + 1);
      } else {
          setCurrent(current + 1);
      }
      
    };

    const prev = () => {
      if (current === 1) {
        setCurrent(current - 1);
      } else if (current === 2) {
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
        setCurrent(current - 1);
      } else if (current === 3) {
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
        setCurrent(current - 1);
      } else {
        setCurrent(current - 1);
      }
        
    };
    return (
        <div className='buy_process_container'>
            <Steps current={current}>
                {steps.map(item => (
                <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                    {current === 2 ? 'Chốt đơn!!!' : 'Tiếp theo'}
                </Button>
                )}
                {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Hoàn tất
                </Button>
                )}
                {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Quay lại
                </Button>
                )}
            </div>
        </div> 
    );
};

export default BuyProcess;