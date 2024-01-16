import React from 'react'
import {useState,useEffect} from 'react'
import { Typography,Box,Stack } from '@mui/material'
import SideComponent from './SideComponent'
import ItemCard from './ItemCard'
const SideBar = () => {
    const [selectedCategory,setSelectedCategory] = useState('Home');
  return (
    <Stack sx={{flexDirection:{sx:"column",md:'row',background:'white'}}} >
       <Box sx={{height:{sx:'auto',md:'92vh'},borderRight:'1px solid #3d3d3d',px:{sx:0,md:2}}}>
        <SideComponent selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      
       
       </Box>
       <Box p={2} sx={{overflowY:'auto',height:'90vh',flex:2}}>
         <Typography style={{color:'#f31503'}} variant='h4' fontWeight="bold" mb={2} sx={{color:'black'}}>{selectedCategory}</Typography>
          {selectedCategory==='Cart' && <ItemCard/>}
       </Box>
    </Stack>
  )
}

export default SideBar