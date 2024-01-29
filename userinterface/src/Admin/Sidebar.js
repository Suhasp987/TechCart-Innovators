import React from 'react'
import {Stack} from '@mui/material'
import Content from './Content'
const Sidebar = ({selectedCategory,setSelectedCategory}) => {
    const items=[
        {name:"Dashboard"},
        {name:"Inventory"},
        {name:"Customers"}
    ]
  return (
    <div className="flex md:flex-row flex-col h-full">
    <Stack  direction="row" sx={{ overflow: 'auto', height: { sx: 'auto', md: '95%' }, flexDirection:{sx:'row',md:'column'} }} >
      {items && items.map(category => (
        
        <button className='category-btn' style={{background:category.name===selectedCategory && '#fc1503',color:'white'}} key={category.name} onClick={()=>setSelectedCategory(category.name)}>
        
          <span style={{color:category.name===selectedCategory ? 'black':'red',marginRight:'15px'}}>H</span>
          <span style={{opacity:category.name===selectedCategory?'1':'0.8',color:category.name===selectedCategory ? 'white':'Black' }}>{category.name}</span>
        </button>
      ))}
      
    </Stack>
      { selectedCategory=="Dashboard" && <Content selectedCategory={selectedCategory}/>}
    </div>
  )
}

export default Sidebar