import React from 'react';
import { Data } from '../Data/Data';
import './ItemCard.css'; // Create a CSS file for styling
import { Button } from '@mui/material';

const ItemCard = () => {
  return (
    <div className="container">
      <div className='details'>
            <Button variant='contained' >Payment</Button>
            <table className='table'>
               <thead>
                  
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
               </thead>
               <tbody className='tbody'>
                    {Data.map((item,id)=>{
                        return <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                    })}
               </tbody>
            </table>
      </div>
    </div>
  );
};

export default ItemCard;
