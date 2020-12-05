import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';


type Flavor = {
  readonly name: string;
  readonly qty: number
}

type FlavorWithID = Flavor & {
  readonly id: string;
}

const Login = () => {

  const [flavors1, setFlavors] = useState<readonly FlavorWithID[]>([]);
  const fetchFlavors = async () => {
    const res = await axios.get<readonly FlavorWithID[]>('/getFlavors');
    setFlavors(res.data)
  }
  useEffect(() => { fetchFlavors() }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctUser, setCorrectUser] = useState(false);

  const [newFlavor, setNewFlavor] = useState("");
  const [flavorToDelete, setFlavorToDelete] = useState("");
  const [newStock, setNewStock] = useState(0);
  const [flavorToUpdate, setFlavorToUpdate] = useState("");


  function handleSubmit() {
    if (email === "2@2" && password === "2") {
      setCorrectUser(true);
    }
    else {
      alert('wrong email or password');
      setEmail("");
      setPassword("");
    }
  }

  function handleLogOut() {
    setCorrectUser(false);
    setEmail("");
    setPassword("");
  }

  const newFlavorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewFlavor(val);
  }

  // const newQtyChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const val = e.target.value;
  //   setNewQty(parseInt(val));
  // }

  const newFlavorAdder = async () => {
    const body: Flavor = { name: newFlavor, qty: 0 };
    const { data: id } = await axios.post<string>('/addFlavor', body);
    setFlavors([...flavors1, { name: newFlavor, qty: 0, id: id }]);
    setNewFlavor("");

  }

  const deleteFlavorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const flavor = e.target.value;
    setFlavorToDelete(flavor);
  }

  const deleteFlavor = async () => {
    await axios.delete<string>(`/deleteFlavor/${flavorToDelete}`);
    setFlavors(flavors1.filter(x => !(x.id === flavorToDelete)));
  }

  const newStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewStock(parseInt(val));
  }

  const flavorToUpdateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const flavor = e.target.value;
    setFlavorToUpdate(flavor);
  }

  const addStock = async () => {
    await axios.post(`/updateFlavor/${flavorToUpdate}/${newStock}`);
    setFlavors(flavors1.map(x =>
      (x.id === flavorToUpdate ? { ...x, qty: newStock } : x)))
  }

  // if (!correctUser) {
  //   return (
  //     <div>
  //       <form onSubmit={handleSubmit}>
  //         <label>
  //           Email:
  //           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
  //         </label>
  //         <label>
  //           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
  //         </label>
  //         <input type="submit" value="Submit" />
  //       </form>
  //     </div>
  //   );
  // }
  // else {
  return (
    <div className="container">
      <p>Welcome Icecream Driver!</p>
      <p>Fill out this form to update the stock on your icecream truck</p>

      <br />
      <label> Add Stock: </label>
      <select name="flavor" id="updateStockDropDown" value={flavorToUpdate} onChange={flavorToUpdateChange} placeholder="select">
        {flavors1.map(x => <option value={x.id}>{x.name}</option>)}
      </select>
      <input type="number" placeholder="0" value={newStock} onChange={newStockChange}></input>
      <button onClick={addStock}>Add Stock</button>

      <br />
      <label> Add New Flavor: </label>
      <input type="text" placeholder="new flavor" value={newFlavor} onChange={newFlavorChange}></input>
      <button onClick={newFlavorAdder}>Add Flavor</button>
      <br />

      <label> Remove A Flavor: </label>
      <select name="flavor" id="flavorDeleteDropDown" value={flavorToDelete} onChange={deleteFlavorChange} placeholder="select">
        {flavors1.map(x => <option value={x.id}>{x.name}</option>)}
      </select>

      <button onClick={deleteFlavor}>Delete Flavor</button>
      <br />
      <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}
// }

export default Login;