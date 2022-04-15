import React, { useState } from 'react';
import Item from './Item';
import Carousel from "react-elastic-carousel";
import './SaleCarousel.css'

const SaleCarousel = () => {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1 },
        { width: 768, itemsToShow: 2 },
        { width: 1200, itemsToShow: 3 },
    ];
    const saleList = [
        {src: 'assets/1920x1080-BHDS-Hue-Tiger.png'},
        {src: 'assets/1920x1080PromotionSPA02.jpg'},
        {src: 'assets/1920x1080TichSaoDoiQua.jpg'},
        {src: 'assets/Package-U22.png'},
        {src: 'assets/U22-web-1.png'},
        {src: 'assets/Web-HappyDay.png'},
    ];

    return (
        <div className='Sale__container'>
            <div className='Sale__header'>
                <a>KHUYẾN MÃI</a>
            </div>
            <div className='Sale__carousel'>
                <Carousel breakPoints={breakPoints}>
                    {saleList.map((movie, i) => (
                        <Item src={movie.src} key={i}/>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default SaleCarousel;