import React from 'react';
import Flavors from './Flavors';
import './Main.css';


const Homepage = () => {
  const initFlav = {name:"", qty:0};
  // const [flavor,setFlavor]=useState(initFlav);
  return <div className="container">
    <div className='title-cont'>
      <div className="title">welcome to <p className='supreme'>Supreme Ice Cream</p></div>
    </div>
    <div className="flavors-chart">
      <Flavors 
        flavor={initFlav}
      />
    </div>

  </div>;
}

export default Homepage;