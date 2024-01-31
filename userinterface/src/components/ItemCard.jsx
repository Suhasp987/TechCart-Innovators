import { React, useEffect, useState } from "react";
import { Data } from "../Data/Data";
import "./ItemCard.css";
import { Button } from "@mui/material";
import Items from "./items";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ItemCard = () => {
  const [cartNumber, setCartNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total,setTotal]=useState(0);
  const [value,setValue]=useState("");
  const [cart,setCart]=useState(0);
  const [searchParams,setSearchParams]=useSearchParams()
  const location = useLocation();
  const email = location.state && location.state.email;
   useEffect(()=>{
       setCartNumber(email)
   })

  useEffect(()=>{
    
    const handleCartChange = () => {
      const selectedCartNumber = parseInt(email);
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
    handleCartChange();
  },[cart,cartNumber])
  
  // const handleCartChange = (event) => {
  //   const selectedCartNumber = parseInt(event.target.value);``
  //   if (!isNaN(selectedCartNumber)) {
  //     setCartNumber(selectedCartNumber);
  //   } else {
  //     // Handle the case where the entered value is not a number (e.g., clear the input)
  //     setCartNumber('');
  //   }
  

  //   const selectedCart = Data.find(
  //     (cart) => cart.cartNumber === selectedCartNumber
  //   );

  //   setCartItems(selectedCart ? selectedCart.items : []);

  //   const totalPrice = selectedCart
  //   ? selectedCart.items.reduce(
  //       (acc, item) => acc + parseFloat(item.price.replace("$", "")),
  //       0
  //     )
  //   : 0;

  // setTotal(totalPrice);
  // };

  const amount=500;
  const currency="INR";
  const receiptId="qryaq1";

 const paymentHandler=async(e)=>{
  console.log("payment start")
        const response = await fetch("http://localhost:3000/order",{
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
        const order=await response.json();
        console.log(order);

        var options = {
          "key": "rzp_test_L1JPeGnZbS2ffv", // Enter the Key ID generated from the Dashboard
          amount,// Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency,
          "name": "Tech Cart ", //your business name
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler": function (response){
              alert(response.razorpay_payment_id);
              alert(response.razorpay_order_id);
              alert(response.razorpay_signature)
          },
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
              "name": "Suhas", //your customer's name
              "email": "suhas123.p@gmail.com", 
              "contact": "8792713154"  //Provide the customer's phone number for better conversion rates 
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
      });

      rzp1.open();
      e.preventDefault();
 }
 const handleEnterKey = (e) => {
  if (e.key === 'Enter') {
    // Value entered by the user is available in cartNumber
    console.log('Cart Number entered:', cartNumber);
    // You can perform further actions or call your desired method here
  }
};
  
  return (
    <div className="">
     

    <input
    type="text"
    placeholder="Enter Cart Number"
    value={cartNumber}
    onChange={(e)=>setCart(e.target.value)}
    onKeyDown={handleEnterKey}
    className=" border border-zinc-950 rounded-lg focus:border-blue-500 focus:outline-none pl-3"
  />
   

      <div className="details" style={{ color:'black',marginTop:'17px' }} >
        <table className="table">
          <thead style={{color:'white'}} className="">
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
                  <td>{parseInt(item.quantity)*parseInt(item.price)}</td>
                  

                </tr>
              );
            })}
          </tbody>
        </table>
        
        {cartItems.length>0 && <h3 style={{display:'flex',  justifyContent:'flex-end',marginRight:'18rem'}}  className="m-5 text-lg">Total : {total}</h3>} 
        <div style={{display:'flex',justifyContent:'flex-end',marginRight:'17rem'}}>
        
        {cartItems.length>0 &&<Button variant="contained" onClick={paymentHandler}>Payment</Button>}
       
        </div>
        
      </div>
    </div>
  );
};

export default ItemCard;
