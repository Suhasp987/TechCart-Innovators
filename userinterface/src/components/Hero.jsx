import React, { useState, useEffect } from 'react';
import './Hero.css';
import cart_icon from '../components/assets/Assets/Images/cart1.jpeg'
import fruits_icon from '../components/assets/Assets/Images/fruits.jpeg'
import store_icon from '../components/assets/Assets/Images/store.jpeg'

import './Hero.css'
const Hero = () => {
  const images = [
    {icon:cart_icon},
    {icon:fruits_icon},
    {icon:store_icon},
    // '../components/assets/Assets/Images/cart.jpg',
    // '../components/assets/Assets/Images/store.jpg',
    // '../components/assets/Assets/Images/fruits.jpg',
    
    // Add more image URLs as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds (adjust as needed)

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="hero-container">
      <div className="hero-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <img src={image.icon} alt={`Slide ${index + 1}`} className='imagee' />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;