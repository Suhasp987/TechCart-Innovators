import { React, useState } from "react";
import { Data } from "../Data/Data";
import "./ItemCard.css";
import { Button } from "@mui/material";

const ItemCard = () => {
  const [cartNumber, setCartNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total,setTotal]=useState(0);
  const [value,setValue]=useState("");
  const handleCartChange = (event) => {
    const selectedCartNumber = parseInt(event.target.value);
    if (!isNaN(selectedCartNumber)) {
      setCartNumber(selectedCartNumber);
    } else {
      // Handle the case where the entered value is not a number (e.g., clear the input)
      setCartNumber('');
    }
  

    const selectedCart = Data.find(
      (cart) => cart.cartNumber === selectedCartNumber
    );

    setCartItems(selectedCart ? selectedCart.items : []);

    const totalPrice = selectedCart
    ? selectedCart.items.reduce(
        (acc, item) => acc + parseFloat(item.price.replace("$", "")),
        0
      )
    : 0;

  setTotal(totalPrice);
  };

  const amount=500;
  const currency="INR";
  const receiptId="qwsaq1";

 const paymentHandler=async(e)=>{
        const response =fetch("http://localhost:3000/order",{
             method:"POST",
             body:JSON.stringify({
              amount,
              currency,
             receipt: receiptId
             }),
             headers:{
              "COntent-Type":"application/json",
             },
        });
        const json=await response.json();
        console.log(order);

        
 }
 const handleEnterKey = (e) => {
  if (e.key === 'Enter') {
    // Value entered by the user is available in cartNumber
    console.log('Cart Number entered:', cartNumber);
    // You can perform further actions or call your desired method here
  }
};
  
  return (
    <div className="contaier">
     

    <input
    type="text"
    placeholder="Enter Cart Number"
    value={cartNumber}
    onChange={handleCartChange}
    onKeyDown={handleEnterKey}
    className="border-slate-500"
  />
   {console.log(cartNumber)}

      <div className="details" style={{ color:'black',marginTop:'17px' }} >
        <table className="table">
          <thead style={{color:'white'}}>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {cartItems.map((item, id) => {
              return (
                <tr key={item.id}>
                  <td>{item.name} </td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{parseInt(item.quantity)*parseInt(item.price)} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {cartItems.length>0 && <h3 style={{display:'flex',  justifyContent:'flex-end',marginRight:'18rem'}} className="m-5 text-lg">Total : {total}</h3>} 
        <div style={{display:'flex',justifyContent:'flex-end',marginRight:'17rem'}}>
        
        {cartItems.length>0 &&<Button variant="contained" onclick={paymentHandler}>Payment</Button>}
       
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
