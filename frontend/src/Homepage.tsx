import React from 'react';
import Flavors from './Flavors';
import './Main.css';


const Homepage = () => {
  return <div className="container">
    <div className='title-cont'>
      <div className="title">welcome to <p className='supreme'>Supreme Ice Cream</p></div>
    </div>
    <div className="flavors-chart">
      <Flavors />
    </div>

  </div>;
}

export default Homepage;