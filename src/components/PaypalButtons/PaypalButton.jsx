import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { totalBillSelector, seatChoosenSelector, premiereRoomInfoSelector, invoiceInfoSelector } from '../../redux/selectors';
import { changeIsPaid } from '../../redux/action'
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
var axios = require('axios');

const PaypalButton = () => {

    const dispatch = useDispatch();

    const [paidFor, setPaidFor] = React.useState(false);

    const seatChoosen = useSelector(seatChoosenSelector);

    const roomPremiereInfo = useSelector(premiereRoomInfoSelector);

    const invoiceInfo = useSelector(invoiceInfoSelector);

    const products = {
        description : "Vé xem phim",
        price: useSelector(totalBillSelector)
    }

    console.log(products);

    const handleApprove = (orderId) => {
        dispatch(changeIsPaid(true));
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
          data = {
            id: invoiceInfo.invoiceId,
            status: 1
          };
          
          config = {
            method: 'put',
            url: '/invoice',
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