import React, { useState, useEffect } from 'react';
import 'firebase/auth';
// import firebase from 'firebase/app';
import firebase from 'firebase';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import { setupMaster } from 'cluster';

const firebaseConfig = {
  apiKey: "AIzaSyCEQILmhz3O-p577zSwaQ19iiZeNh97zXU",
  authDomain: "supreme-ice-cream.firebaseapp.com",
  databaseURL: "https://supreme-ice-cream-default-rtdb.firebaseio.com",
  projectId: "supreme-ice-cream",
  storageBucket: "supreme-ice-cream.appspot.com",
  messagingSenderId: "1006059533503",
  appId: "1:1006059533503:web:a843f5763eda2acd5b820a",
  measurementId: "G-MD6EP7LHWS"

};

firebase.initializeApp(firebaseConfig);

type Props = {
  readonly children: React.ReactNode;
};

const Authenticated = ({ children }: Props) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  function onAuthStateChange() {
    return firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }
  useEffect(() => onAuthStateChange(), []);

  return (
    <div>
      {user && children}
      {!user && (
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

      )}
      {/* <button onClick={()=>setUser(null)}>sign out</button> */}
    </div>
  );
};

export default Authenticated;