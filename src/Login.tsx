import React, { useState } from 'react';
import Flavors from "./Flavors";
//import { useForm } from 'react-hook-form';

type flavor = { flavor: {name: string, qty: number }}
const init_flavors:flavor[] = [
    // { name: "vanilla", qty: 4 },
    // { name: "chocolate", qty: 10 },
    // { name: "mint chip", qty: 3 },
    // { name: "strawberry", qty: 0 },
    // { name: "phish food", qty: 40 }
  ]
export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctUser, setCorrectUser] = useState(false);

  function handleSubmit() {
    if (email === "j@j.com" && password==="123") {
      setCorrectUser(true);
    }
    else {
      alert('wrong email or password');
    }
    setEmail("");
    setPassword("");
  }
  const [flavors, setFlavors] = useState(init_flavors);
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);

  const newName = (event:React.ChangeEvent<HTMLInputElement>) => {
    const nname = event.currentTarget.value;
    setName(nname);
  }
  const newQty = (event:React.ChangeEvent<HTMLInputElement>) => {
    const nqty = event.currentTarget.valueAsNumber;
    setQty(nqty);
  }
  const addStock=() => {
    let x = {flavor: {name, qty}}
    setFlavors([...flavors, x]);
  } 
  
  if (!correctUser){
    return (
      <div>
        <form onSubmit = {handleSubmit}>
          <label>
            Email:
            <input type="email" value = {email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <input type="password" value = {password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <input type="submit" value = "Submit" />
        </form>
      </div>
    );
  }
  else {
    
    return (
     <div>
       <p>update stock</p>
       <input type = "text" placeholder="icecream name" value={name} onChange={newName}></input>
       <input type="number" placeholder="icecream quantity" value={qty} onChange={newQty}></input>
       <button type="button" onClick={addStock}></button>
       {/* create form for the user to add info to main page */}
       {/* <div>{flavors.map(Flavors)}</div> */}
       <br />
       <button onClick={()=> setCorrectUser(false)}>Log out</button>
     </div> 
    )
  }
}

