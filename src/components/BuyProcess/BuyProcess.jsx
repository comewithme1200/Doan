import React from 'react';
import { Steps, Button, message, Card, Modal } from 'antd';
import "./BuyProcess.css"
import 'antd/dist/antd.css'
import PickTicket from '../PickTicket/PickTicket';
import PickSeat from '../PickSeat/PickSeat';
import { ticketNumberSelector } from '../../redux/selectors'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeStandardTicketNumber, changeVipTicketNumber } from '../../redux/action'

const { Step } = Steps;

const BuyProcess = () => {
  const [current, setCurrent] = React.useState(0);
  const [roomId, setRoomId] = React.useState('');
  const [premiereId, setPremiereId] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const dispatch = useDispatch();

  const ticketNumber = useSelector(ticketNumberSelector);

  console.log(ticketNumber);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const steps = [
    {
      title: 'Chọn vé',
      content: <PickTicket />
    },
    {
      title: 'Chọn ghế',
      content: <PickSeat roomId={roomId} ticketNumber={ticketNumber} premiereId={premiereId}/>,
    },
    {
      title: 'Xác nhận',
      content: 'Last-content',
    },
    {
      title: 'Đặt vé thành công',
      content: 'Last-content',
    },
  ];


    const next = () => {
      if (current === 0) {
        if (ticketNumber.standard + ticketNumber.vip > 0) {
          setCurrent(current + 1);
          setRoomId('837175f7-1a06-4605-86ad-8bb4b3b6b0c3');
          setPremiereId('75a3c30e-5b00-41d6-bde0-9c3edde9ee9a');
        } else {
          alert("Chưa chọn vé");
        }
      } else {
        setCurrent(current + 1);
      }
      
    };

    const prev = () => {
      if (current === 1) {
        setCurrent(current - 1);
        dispatch(changeStandardTicketNumber(0));
        dispatch(changeVipTicketNumber(0));
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
                    Next
                </Button>
                )}
                {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                </Button>
                )}
                {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Previous
                </Button>
                )}
            </div>
            <Modal title="Alert" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              
            </Modal>
        </div> 
    );
};

export default BuyProcess;