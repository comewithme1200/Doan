import React from 'react';

import { Footer } from './container';
import { Navbar } from './components';
import './App.css';

import GetDetail from './components/GetDetail/GetDetail';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import BuyProcess from './components/BuyProcess/BuyProcess';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ChooseTicketTimeout from './components/ChooseTicketTimeout/ChooseTicketTimeout';
import SignUp from './components/SignUp/SignUp';
import OnlineInvoice from './components/OnlineInvoice/OnlineInvoice';
import BuyHistory from './components/BuyHistory/BuyHistory';


const App = () => {
  return (
    <PayPalScriptProvider options={{ "client-id" : "AWLQJeoptYF7fpQGxkMf_83KfTJorGBaC9DPoPaZeIb6u6wH_rZGcmiY2ZTpyepPrP_WLMRnv5Harvbx" }}>
      <div>
        <Navbar />
        <Routes>
          <Route path='/ChooseTicketTimeout' element={<ChooseTicketTimeout/>}/>
          <Route path='/OnlineInvoice/:invoice_id' element={<OnlineInvoice/>}/>
          <Route path='/getDetail/:id/:movie_name' element={<GetDetail/>}/>
          <Route path='/' element={<MainContent/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/buyprocess/:id' element={<BuyProcess/>}/>
          <Route path='/buyHistory' element={<BuyHistory/>}/>
        </Routes>
        <Footer />
      </div>
    </PayPalScriptProvider>
  )};

export default App;
