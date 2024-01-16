import React from 'react'
import {Stack} from '@mui/material'
import {Link} from 'react-router-dom';
const Navbar = () => {
   
  return (
    <Stack direction="row" alignItems="center" p={2} sx={{position:'sticky',background:'white',top:0,justifyContent:'space-between'}} className='w-full border-b-2'>
    <div>
     <Link to="/" style={{display:'flex',alignItems:'center'}}>
            Tech Cart Innovators
     </Link>
     </div>
    </Stack>
  )
}

export default Navbar