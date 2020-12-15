import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import 'firebase/auth';
import firebase from 'firebase';
import './App.css';
import './Login.css';

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

  const [newFlavor, setNewFlavor] = useState("");
  const [flavorToDelete, setFlavorToDelete] = useState("");
  const [newStock, setNewStock] = useState(0);
  const [flavorToUpdate, setFlavorToUpdate] = useState("");
  const [messege, setMessege] = useState("");

  const newFlavorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewFlavor(val);
  }

  const newFlavorAdder = async () => {
    const body: Flavor = { name: newFlavor, qty: 0 };
    const { data: id } = await axios.post<string>('/addFlavor', body);
    setFlavors([...flavors1, { name: newFlavor, qty: 0, id: id }]);
    setNewFlavor("");
    setMessege("new flavor added successfully")

  }

  const deleteFlavorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const flavor = e.target.value;
    setFlavorToDelete(flavor);
  }

  const deleteFlavor = async () => {
    await axios.delete<string>(`/deleteFlavor/${flavorToDelete}`);
    setFlavors(flavors1.filter(x => !(x.id === flavorToDelete)));
    setMessege("flavor deleted successfully");
  }

  // const deleteFlavor = async () => {
  //   firebase.auth().currentUser?.getIdToken(true)
  //     .then((idtoken) => {
  //       fetch(`/deleteFlavor/${flavorToDelete}`, {
  //         method: 'DELETE',
  //         headers: { idtoken }
  //       })
  //         .then((res) => (res))
  //         .then(_ => setFlavors(flavors1.filter(x => {
  //           !(x.id === flavorToDelete);
  //           setMessege("flavor deleted successfully");
  //         })))
  //     })
  //     .catch(() => {
  //       setMessege("permission denied");
  //     });
  // };

  // const addSong = (name: string, artist: string, rating: number) => {
  //   firebase
  //     .auth()
  //     .currentUser?.getIdToken(true)
  //     .then((idtoken) => {
  //       fetch('/createSong', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           idtoken,
  //         },
  //         body: JSON.stringify({ name, artist, rating }),
  //       })
  //         .then((res) => res.text())
  //         .then((id) => setSongs([...songs, { name, artist, rating, id }]));
  //     })
  //     .catch(() => {
  //       console.log('not authenticated');
  //     });
  // };

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
      (x.id === flavorToUpdate ? { ...x, qty: newStock } : x)));
    setNewStock(0);
    setMessege("stock updated successfully")
  }

  return (
    <div className="container">

      <p>fill out this form to update, add, or remove a flavor</p>

      <div className="change-containers">
        <div className="stock-change-container">
          <div><label><div className="supreme">Update</div> a flavor: </label></div>
          <div><select name="flavor" id="updateStockDropDown" value={flavorToUpdate} onChange={flavorToUpdateChange} placeholder="select">
            {flavors1.map(x => <option value={x.id}>{x.name}</option>)}
          </select>
          </div>
          <div>
            <input type="number" placeholder="0" value={newStock} onChange={newStockChange}></input>
          </div>
          <div>
            <button onClick={addStock}>update stock</button>
          </div>
        </div>

        <div className="stock-change-container">
          <div><label><div className="supreme">Add</div> a flavor: </label></div>
          <div><input type="text" placeholder="new flavor" value={newFlavor} onChange={newFlavorChange}></input></div>
          <div><button onClick={newFlavorAdder}>add flavor</button></div>
        </div>

        <div className="stock-change-container">
          <div><label><div className="supreme">Remove</div> a flavor: </label></div>
          <div><select name="flavor" id="flavorDeleteDropDown" value={flavorToDelete} onChange={deleteFlavorChange} placeholder="select">
            {flavors1.map(x => <option value={x.id}>{x.name}</option>)}
          </select>
          </div>
          <div>
            <button onClick={deleteFlavor}>delete flavor</button>
          </div>
        </div>
      </div>

      <div className="feedback-container">
        <p>{messege}</p>
      </div>

      <div className="stock-container">
        <div className="subtitle">current stock</div>
        <div className="chart">
          {Object.keys(flavors1).length === 0 ? <div>empty</div> : flavors1.map(x =>
            <div><p className="emph">{x.qty}</p> scoops of <p className="emph">{x.name}</p> in stock</div>)}
        </div>
      </div>

      <div className="logout-container">
        <button onClick={() => firebase.auth().signOut()}>Log out</button>
      </div>
    </div>
  )
}
// }

export default Login;