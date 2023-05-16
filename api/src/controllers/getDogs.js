const axios = require('axios')
const { API_KEY } = process.env;
const { temperament, Dog } = require('../db');


module.exports = async(req, res)=>{   // trae los perros creados los cuales estan en la base de datos
    try {

      const rawDbDogs = await Dog.findAll({
        include: [{
          model: temperament,
          attributes: ['name'],
          through: {
            attributes: []  // tabla intermedia vacia
          }
        }] 
      })

      const dbDogs = rawDbDogs.map(d => {
        return {
            id: d.dataValues.id,
            name: d.dataValues.name,
            height: d.dataValues.height,
            weight: d.dataValues.weight,
            life_span: d.dataValues.life_span,
            image: d.dataValues.image,
            temperament: d.dataValues.temperaments.map(t => t.name)
        }
      })
      console.log(dbDogs)

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
        
        res.status(200).json([...dbDogs, ...apiDogs]); // concatena los creados con los llamados de la api
      } catch (error) {
        res.status(404).json({ error: error.message });
    }
  
}  
