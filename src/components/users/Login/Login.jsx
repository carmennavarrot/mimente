import React, { useState } from 'react';
import './Login.scss';

function Login({ setUser, listUsers }) {
  const [userLogin, setUserLogin] = useState({});
  
  const handleInput = (ev) => {
    const id = ev.target.id;
    setUserLogin({ ...userLogin, [id]: ev.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    const findUser = listUsers.find(user => user.email === userLogin.email && user.password === userLogin.password);
    if (findUser) {
      setUser(findUser);
    }
  };

  return (
    <form className="loginForm" onChange={handleInput}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" />
      <input type="submit" value="Inicia sesión" onClick={handleClick} />
    </form>
  );
}

export default Login;
