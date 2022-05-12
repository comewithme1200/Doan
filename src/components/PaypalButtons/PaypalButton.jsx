import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { totalBillSelector, seatChoosenSelector, premiereRoomInfoSelector } from '../../redux/selectors'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
var axios = require('axios');

const PaypalButton = () => {

    const [paidFor, setPaidFor] = React.useState(false);

    const seatChoosen = useSelector(seatChoosenSelector);

    const roomPremiereInfo = useSelector(premiereRoomInfoSelector);

    const products = {
        description : "Vé xem phim",
        price: useSelector(totalBillSelector)
    }

    console.log(products);

    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    if (paidFor) {
        var updateSeatOccupiedData = [];

          for (const seatChoose of seatChoosen.seatChoose) {
            updateSeatOccupiedData.push(
              {
                  seat_id: seatChoose.seat_id,
                  premiere_id: roomPremiereInfo.premiere_id,
                  status: 1
              });
          }
          var data = JSON.stringify(updateSeatOccupiedData);
          
          var config = {
            method: 'put',
            url: '/seats',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
        //redirect to success page what i need to do
        return <Navigate to='/ChooseTicketTimeout' />
    }

    return (
        <PayPalButtons style={{
            color: "silver",
            layout: "horizontal",
            height: 48,
            tagline: false,
            shape: "pill" 
        }}
        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        description: products.description,
                        amount: {
                            value: products.price
                        }
                    }
                ]
            });
        }}
        onApprove={async(data, actions) => {
            const order = await actions.order.capture();
            console.log("order", order);

            handleApprove(data.orderID);
        }}
        />
    );
};

export default PaypalButton;