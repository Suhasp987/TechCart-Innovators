import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Content from './Content'
import Footer from './Footer'

const Admin = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex '>
        <Sidebar/>
        <Content/>
      </div>
      <Footer/>
    </div>
  )
}

export default Admin