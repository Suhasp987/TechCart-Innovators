import React from 'react'
import {Stack} from '@mui/material'
import {Link,useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Navbar.css'
import {Button} from '@mui/material';
import {Box} from '@mui/material';
const Navbar = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const cart_no = location.state.name
  const Logout=()=>{
    navigate("/login")
  }
  
  return (
    // 
   <Box className='item-center justify-between m-11 flex '>
         
      <h2 className='font-bold text-3xl'>Tech Cart Innovators</h2>
      <h2 className='text-xl font-bold'>Welcome <b className='hover:capitalize'>{cart_no}</b>!</h2>
      <Button variant='contained' className='' onClick={Logout}>Logout</Button>
   </Box>
      
  
  )
}

export default Navbar