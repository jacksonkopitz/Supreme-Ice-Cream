import React, { useState } from 'react';
//import { useForm } from 'react-hook-form';


const Login= () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctUser, setCorrectUser] = useState(false);
 // let correctUser = false;
  
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
       <p>correct user</p>
       {/* create form for the user to add info to main page */}
       <button onClick={()=> setCorrectUser(false)}>Log out</button>
     </div> 
    )
  }
}

export default Login;