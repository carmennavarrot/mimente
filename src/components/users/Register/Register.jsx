import React, { useState } from 'react';
import "./Register.scss"

const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");



  const handleChangeName = (ev) => {
    setName(ev.target.value);
  };

  const handleChangeEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const handleChangePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    // Verificar si el email ya está registrado
    fetch('https://6648c3564032b1331bec5981.mockapi.io/users')
      .then(response => response.json())
      .then(users => {
        const userExists = users.some(user => user.email === email);

        if (userExists) {
          setErrorMessage('El email ya está registrado');
        } else {
          setErrorMessage('Registro exitoso');
          const newUser = {
            name: name,
            email: email,
            password: password
          };

          // Enviar la solicitud POST al mock API
          fetch('https://6648c3564032b1331bec5981.mockapi.io/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
          })}
      })
      .catch(error => {
        console.error('Error al verificar el email:', error);
        setErrorMessage('Error');
      });
  };

  return (
    <form className='formularioRegister' onSubmit={handleSubmit}>
      <h2>Registro</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <span className='Register'>
        <span>
          <label>Nombre</label>
          <input placeholder='Nombre' type="text" value={name} onChange={handleChangeName} required />
        </span>
        <span>
          <label>Email</label>
          <input placeholder='Email' type="email" value={email} onChange={handleChangeEmail} required />
        </span>
        <span>
          <label>Password</label>
          <input placeholder='contraseña' type="password" value={password} onChange={handleChangePassword} required />
        </span>
      </span>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
