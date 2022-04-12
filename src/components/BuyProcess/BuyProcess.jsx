import React from 'react';
import { Steps, Button, message, Card, Modal } from 'antd';
import "./BuyProcess.css"
import 'antd/dist/antd.css'
import PickTicket from '../PickTicket/PickTicket';
import PickSeat from '../PickSeat/PickSeat';

const { Step } = Steps;

const BuyProcess = () => {
  const [current, setCurrent] = React.useState(0);
  const [roomId, setRoomId] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);

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
      content: <PickSeat roomId={roomId}/>,
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
        setCurrent(current + 1);
        setRoomId('837175f7-1a06-4605-86ad-8bb4b3b6b0c3');
    };

    const prev = () => {
        setCurrent(current - 1);
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