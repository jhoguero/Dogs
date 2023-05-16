const axios = require('axios');
const { temperament } = require('../db');
const { API_KEY } = process.env;


module.exports = async () => {
  
  try {
    //Llamado de axios para traer todos los tipos de perros desde 'dogapi.co'
    const response = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
    
    const filterTemp = response.map(t =>{
      return t.temperament ? t.temperament.split(", ") : []  // recorremos los temperamentos y se separan por comas, de lo contrario es array vacio
    }).flat() //guarda todo en un solo arreglo
    const allTemperaments = filterTemp.filter((t, i)=>{
      return filterTemp.indexOf(t) === i;
    }).map(t=>{
      return {
        name:t
      }
    })
    await temperament.bulkCreate(allTemperaments); // se guarda en los temperamentos en la base de datos
  } catch (error) {
    //En caso de error lo lanzo al próximo catch
    console.error(error.message);
  }
};

