import React, { useState, useEffect } from 'react';
import './Main.css';
import axios from 'axios';


export type Flavor = {
  readonly name: string;
  readonly qty: number
}

export type FlavorWithID = Flavor & {
  readonly id: string;
}

const Homepage = () => {
  const [flavors1, setFlavors] = useState<readonly FlavorWithID[]>([]);
  const fetchFlavors = async () => {
    const res = await axios.get<readonly FlavorWithID[]>('/getFlavors');
    setFlavors(res.data)
  }
  useEffect(() => { fetchFlavors() }, []);

  return <div className="container">
    <div className='title-cont'>
      <div className="title">welcome to <p className='supreme'>Supreme Ice Cream</p></div>
    </div>
    <div className="flavors-chart">
      <div className="subtitle">current stock</div>
      <div className="chart">
        {Object.keys(flavors1).length === 0 ? <div>empty</div> : flavors1.map(x =>
          x.qty > 0 ? <div>we have <p className="emph">{x.qty}</p> scoops of <p className="emph">{x.name}</p> in stock</div> : <div>we are out of <p className="emph">{x.name}</p> :(</div>)}
      </div>
    </div>

  </div>;
}

export default Homepage;