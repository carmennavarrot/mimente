import React, { useState, useEffect } from 'react';

const WeeklyMenu = () => {
  const [foodData, setFoodData] = useState([]);
  const [newMenu, setNewMenu] = useState({
    day: '',
    name: '',
    type: '',
    description: '',
    imagen: '',
  });
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://6648c3564032b1331bec5981.mockapi.io/food');
        const data = await response.json();
        setFoodData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenu({ ...newMenu, [name]: value });
  };

  const handleAddMenu = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://6648c3564032b1331bec5981.mockapi.io/food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMenu),
      });
      const newMenuData = await response.json();
      setFoodData([...foodData, newMenuData]);
      setNewMenu({ day: '', name: '', type: '', description: '', imagen: '' });
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  return (
    <div>
      <h1>Menú Semanal</h1>
      <form onSubmit={handleAddMenu}>
        <input
          type="text"
          name="day"
          value={newMenu.day}
          placeholder="Día"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="name"
          value={newMenu.name}
          placeholder="Nombre"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="type"
          value={newMenu.type}
          placeholder="Tipo"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          value={newMenu.description}
          placeholder="Descripción"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="imagen"
          value={newMenu.imagen}
          placeholder="URL de Imagen"
          onChange={handleInputChange}
        />
        <button type="submit">Agregar Menú</button>
      </form>
      <div>
        <h3>¿Que día quieres ver?</h3>
        <select onChange={handleDayChange}>
          <option value="">Selecciona un día</option>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>
        {foodData
          .filter(foodItem => !selectedDay || foodItem.day === selectedDay)
          .map((foodItem) => (
            <div key={foodItem.id} className="food-item">
              {foodItem.imagen && <img src={foodItem.imagen} alt={foodItem.name} />}
              <h2>{foodItem.name}</h2>
              <p>Tipo: {foodItem.type}</p>
              <p>Día: {foodItem.day}</p>
              <p>Descripción: {foodItem.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeeklyMenu;

