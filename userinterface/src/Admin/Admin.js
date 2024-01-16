import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Content from './Content'
import Footer from './Footer'
import Items from '../components/items'
const Admin = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex '>
      <div className='flex-none w-28px h-[100vh]'>
        <Sidebar/></div>
        <div className='grow'><Content/></div>
      </div>
      
      <Footer/>
    </div>
  )
}

export default Admin