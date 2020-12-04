import React, { useState } from 'react';


const Login= () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctUser, setCorrectUser] = useState(false);
  
  function handleSubmit() {
    if (email === "j@j.com" && password==="123") {
      setCorrectUser(true);
    }
    else {
      alert('wrong email or password');
      setEmail("");
      setPassword("");
    }
  }
  
  function handleLogOut(){
    setCorrectUser(false);
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
     <div className="container">
       <p>Welcome Icecream Driver!</p>
       <p>Fill out this form to update the stock on your icecream truck</p>
       <input type = "text" placeholder="ice-cream name"></input>
       <input type = "number" placeholder="0"></input>
       <button type="button">add</button>
       <br />
       <button onClick={handleLogOut}>Log out</button>
     </div> 
    )
  }
}

export default Login;