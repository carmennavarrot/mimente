import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './users/Login/Login';
import Register from './users/Register/Register';
import Header from './Header/Header';
import WeeklyMenu from './FoodMenu/WeeklyMenu'; // Asegúrate de que esta ruta es correcta
import './../scss/App.scss';

// Definición de AuthRoute
const AuthRoute = ({ user, component }) => {
  return user ? component : <Login />;
};

function App() {
  const [user, setUser] = useState(null);
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    // Obtener la lista de usuarios al cargar el componente
    fetch('https://6648c3564032b1331bec5981.mockapi.io/users')
      .then(response => response.json())
      .then(data => setListUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      
      <Header />
      <Routes>
        <Route path="/" element={<Login setUser={setUser} listUsers={listUsers} />} />
        <Route path="/register" element={<Register />} />
        <Route path='/food-list' element={<WeeklyMenu />}/>
        {/* <Route path="/food-list" element={<AuthRoute user={user} component={<WeeklyMenu />} />} /> */}
      </Routes>
    </div>
  );
}

export default App;

