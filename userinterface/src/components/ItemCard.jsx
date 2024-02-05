import { React, useEffect, useState } from "react";

import "./ItemCard.css";
import { Button } from "@mui/material";
import Items from "./items";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {Snackbar} from "@mui/material";
const ItemCard = () => {
  const [cartNumber, setCartNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total,setTotal]=useState(0);
  const [value,setValue]=useState("");
  const [cart,setCart]=useState(0);
  const [searchParams,setSearchParams]=useSearchParams()
  const location = useLocation();
  const [deleteInitiated, setDeleteInitiated] = useState(false);
  const currentDate = new Date();
const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  const [result,setResult]=useState({});
  const [show,setShow]=useState(false);
  const state= location.state  ;
  const userName = state?.name;
  const userEmail = state?.email;
  const userPhone = state?.phone;
  const userpassword = state?.password;
  const [userData, setUserData] = useState({
    name: userName,
    email: userEmail,
    phone: userPhone,
    password: userpassword,
  });
  const cart_no = location.state &&  location.state.cart_no;
  console.log(cart_no)
  useEffect(()=>{
        setCartNumber(cart_no)
  })

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShow(false);
  };
  useEffect(() => {
    if (result.msg) {
     
      // Ensure deleteCart is called only once
      if (!deleteInitiated) {
        setDeleteInitiated(true);
        const historyData = {
          Date: formattedDate,
          Cartno: cartNumber,
          Name: userName,
          Phone: userPhone,
          Email: userEmail,
          OrderId: result.orderId,
          Amount: "5000",
        };
  
        fetch("http://localhost:3000/histories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(historyData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("History API Response:", data);
          })
          .catch((error) => {
            console.error("Error calling /histories API:", error);
          });
  
        deleteCart();
      }
      setCartNumber();
      
      setShow(true);
      
    }
  }, [result.msg, deleteInitiated]);


  const deleteCart = async () => {
    try {
      const response = await fetch(`http://localhost:3000/deleteCart/${cartNumber}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorMessage = await response.text();
        console.error(`Error deleting cart: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  useEffect(()=>{
    if (!cartNumber) {
      console.log("Cart number is empty. Skipping API call.");
      return;
    }
    const handleCartChange = async () => {
      try {
        const response = await fetch("http://localhost:3000/TempItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartNumber: cartNumber,
          }),
        });
    
        if (response.ok) {
          console.log(response)
          const datas = await response.json();
          console.log("datas",datas)
          const data=datas.items
          setCartItems(data|| []);
          console.log("items",cartItems)
        } else {
          
            setCartItems([]);
          
        }
      } catch (error) {
        console.error("Network error:", error);
      }
  
      const totalPrice = 23
  
    setTotal(totalPrice);
    };
    handleCartChange();
  },[cart,cartNumber])
  
  

  const amount=500;
  const currency="INR";
  const receiptId="qryaq1";

 const paymentHandler=async (e)=>{
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
          "key": "rzp_test_L1JPeGnZbS2ffv", 
          amount,
          currency,
          "name": "Tech Cart ", 
          "description": "Test Transaction",
          "image": "",
          "order_id": order.id, 
          "handler":async function  (response){
             const body={...response};
             const validateRes=await fetch("http://localhost:3000/validate",{
              method:"POST",
              body:JSON.stringify(body),
              headers:{
                "Content-Type":"application/json"
              },
             });
             const jsonRes=await validateRes.json();
             setResult(jsonRes)

             console.log(jsonRes);
          },
          "prefill": { 
              "name": "Suhas", 
              "email": "suhas123.p@gmail.com", 
              "contact": "8792713154"   
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
      };
      var rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response){
              // alert(response.error.code);
              // alert(response.error.description);
              // alert(response.error.source);
              // alert(response.error.step);
              // alert(response.error.reason);
              // alert(response.error.metadata.order_id);
              // alert(response.error.metadata.payment_id);
      });

      rzp1.open();
      e.preventDefault();


 }
 
 
 const handleEnterKey = (e) => {
  if (e.key === 'Enter') {
    console.log('Cart Number entered:', cartNumber);
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
            
            <th>Price</th>
            <th>Total</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {cartItems && cartItems.map((item, id) => {
              return (
                <tr >
                {console.log(item)}
               <td>{item.Product}</td>
               <td>{item.Price}</td>
               <td>{item.Price}</td>
               
    </tr>
              );
            })}
          </tbody>
        </table>
        <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={`Pament Sucessfull ${result.msg}`}
      />
        {cartItems.length>0 && <h3 style={{display:'flex',  justifyContent:'flex-end',marginRight:'18rem'}}  className="m-5 text-lg">Total : {total}</h3>} 
        <div style={{display:'flex',justifyContent:'flex-end',marginRight:'17rem'}}>
        
        {cartItems.length>0 &&<Button variant="contained" onClick={paymentHandler}>Payment</Button>}
       
        </div>
        
      </div>
    </div>
  );
};

export default ItemCard;
