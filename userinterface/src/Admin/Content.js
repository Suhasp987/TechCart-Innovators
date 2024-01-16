import { useState,useEffect } from "react";
import React from 'react'
import axios from 'axios'


const Content = () => {
    const [data,setData]=useState("");
    const [items,setItems]=useState([]);
    const [itemcount,setItemCount]=useState(0);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/users');
            console.log('Items retrieved successfully:', response.data.totalUsers);
            setData(response.data.totalUsers);
          } catch (error) {
            console.error('Error retrieving items:', error);
          }
        };

        const fetchItems=async()=>{
            try {
                const response = await axios.get('http://localhost:3000/getItems');
                console.log(response.data)
                setItems(response.data);
        
                const itemCount = response.data.reduce((count, cart) => count + cart.items.length, 0);
                setItemCount(itemCount);
        
                // Log the updated itemcount after state is updated
                console.log(itemCount);
        
              }
            catch(error){
                console.log("Error")
            }
        }
        fetchItems();
    
        // Initial fetch
        fetchData();
    
        // Set up an interval to fetch data every 2 seconds
        const intervalId = setInterval(() => {
          fetchData();
          fetchItems();
        }, 2000);
    
        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
      }, []);
      const allItems = items.reduce((acc, cart) => acc.concat(cart.items), []);

  return (
    <div className=' '>
    <div className="flex">
     <h2>Users : </h2>
    <p> {data}</p></div>
    <div className="flex">
    <h2>Orders : </h2>
    <p>{itemcount}</p></div>

  
    <div className="mt-28">
    <div className="block"><h2 className="">Orders</h2></div>
    <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {allItems.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{parseInt(item.quantity)*parseInt(item.price)} </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Content