import {React,useState} from 'react';
import { Data } from '../Data/Data';
import './ItemCard.css'; // Create a CSS file for styling
import { Button } from '@mui/material';

const ItemCard = () => {
    const [cartNumber, setCartNumber] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleCartChange = (event) => {
    const selectedCartNumber = parseInt(event.target.value);
    setCartNumber(selectedCartNumber);

    
    const selectedCart = Data.find((cart) => cart.cartNumber === selectedCartNumber);

  
    setCartItems(selectedCart ? selectedCart.items : []);}
  return (
    <div className="container">
    <select id="cartNumber" onChange={handleCartChange} value={cartNumber}>
         <option value="">Select Cart</option>
        {Data.map((cart) => (
          <option key={cart.cartNumber} value={cart.cartNumber}>
            Cart {cart.cartNumber}
          </option>
        ))}
      </select>
      <div className='details'>
            
            <table className='table'>
               <thead>
                  
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
               </thead>
               <tbody className='tbody'>
                    {cartItems.map((item,id)=>{
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
