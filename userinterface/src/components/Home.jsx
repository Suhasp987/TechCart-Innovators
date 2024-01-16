import React from 'react';
import { useLocation } from 'react-router-dom';
import Items from './items';
import SideBar from './SideBar';
import Navbar from './Navbar';

const Home = () => {
  
  console.log(name)
  // Use useLocation to get access to location.state
  const location = useLocation();
  const userData = location.state && location.state.userData;

  return (
    <div>
      <Navbar userData={userData} /> 
      <SideBar />
       
    </div>
  );
};

export default Home;
