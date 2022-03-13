import React from 'react';
import './Item.css'
const Item = (props) => {
    return (
        <div className='Sale_img'>
            <img src={props.src}/>
        </div>
    );
};

export default Item;