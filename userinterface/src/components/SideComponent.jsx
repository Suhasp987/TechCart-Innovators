import React, { useEffect,useState } from 'react';
import { useParams,useSearchParams } from 'react-router-dom';

import { Stack } from '@mui/material';
import { Categories } from './utils/constant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const SideComponent = ({selectedCategory,setSelectedCategory}) => {
  const [name,setName]=useState("")
  const [searchParam, setSearchParam] = useSearchParams();
  
   
 
  
  
  return (
    <Stack direction="row" sx={{ overflow: 'auto', height: { sx: 'auto', md: '95%' }, flexDirection:{sx:'row',md:'column'} }} >
      {Categories && Categories.map(category => (
        
        <button className='category-btn' style={{background:category.name===selectedCategory && '#fc1503',color:'white'}} key={category.name} onClick={()=>{setSelectedCategory(category.name);}}>
        
          <span style={{color:category.name===selectedCategory ? 'black':'red',marginRight:'15px'}}>H</span>
          <span style={{opacity:category.name===selectedCategory?'1':'0.8',color:category.name===selectedCategory ? 'white':'Black' }}>{category.name}</span>
        </button>
      ))}
    </Stack>
  );
};

export default SideComponent;
