const getDataApi = () => {
    return fetch('https://6648c3564032b1331bec5981.mockapi.io/food')
      .then((response) => response.json())
      .then((data) => {
        const dataApi = data.map((item) => {
          return {
            imagen: item.imagen,
            día: item.day,
            nombre: item.name,
            tipo: item.type,
            descripción: item.description,
            id: item.id
          };
        });
        return dataApi;
      });
  };

  export default getDataApi;