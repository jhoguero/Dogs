const axios = require('axios')
const { API_KEY } = process.env;
const { Temperaments, Dog } = require('../db');


module.exports = async(req, res)=>{
    try {

        //Llamado de axios a la url el cual llama todas las razas de perros al home de la api
        const response = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
        //Formateo de la respuesta para para coincidir con la data 
        const apiDogs = response.map(b =>{
          return {
            id: b.id,
            name: b.name,
            image: b.image.url,
            temperament: b.temperament ? b.temperament.split(", ") : [],
            life_span: b.life_span,
            height: b.height.metric,
            weight: b.weight.metric
          };
        })
        
        res.status(200).json(apiDogs);
      } catch (error) {
        res.status(404).json({ error: error.message });
    }
  
}  
