import React from 'react'

const Sidebar = () => {
  return (
    <div className=' mr-20'>
    <div className='border-r-slate-500'>
      <li className='pb-9 list-none '>
        <ul className='p-5 border-b cursor-pointer'>Dashboard</ul>
        <ul  className='p-5 border-b cursor-pointer'>Inventory</ul>
        <ul  className='p-5 border-b cursor-pointer'>Customers</ul>
      </li>
      </div> 
    </div>
  )
}

export default Sidebar