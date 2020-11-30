import React from 'react';
import './Main.css';

//for the next milestone we will connect the backend to a firebase db and handle 
//google authentication

type Flavor = {
  name: string;
  qty: number
}

const currFlavors: Flavor[] = [
  { name: "vanilla", qty: 4 },
  { name: "chocolate", qty: 10 },
  { name: "mint chip", qty: 3 },
  { name: "strawberry", qty: 0 },
  { name: "phish food", qty: 40 }
]

const Flavors = () => {
  return <div>
    <div className="subtitle">current stock</div>
    <div className="chart">
      {currFlavors.map(x =>
        x.qty > 0 ? <div>we have < p className="emph">{x.qty}</p> scoops of <p className="emph">{x.name}</p> in stock</div>
          : <div>we are out of <p className="emph">{x.name}</p> :(</div>)}
    </div>
  </div >;
}

export default Flavors;