import React from 'react';
import './Main.css';

type props = { flavor: {name: string, qty: number }}

// const currFlavors: Flavor[] = [
//   { name: "vanilla", qty: 4 },
//   { name: "chocolate", qty: 10 },
//   { name: "mint chip", qty: 3 },
//   { name: "strawberry", qty: 0 },
//   { name: "phish food", qty: 40 }
// ]

// const Flavors = () => {
export default function Flavors({flavor}:props) {
  const {name, qty} = flavor;
  return ( 
  <div>
    <div>we have {qty} scoops of {name}</div>
      {/* {{qty} >0? <div> we have <p className="emph">{qty}</p> scoops of <p className="emph">{name}</p> in stock</div>
      :<div>we are out of <p className="emph">{name}</p></div>} */}
  </div >
  );
};


