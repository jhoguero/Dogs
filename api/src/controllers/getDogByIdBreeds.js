const axios = require('axios')
const { API_KEY } = process.env;
const { temperament, Dog } = require('../db');
const isUUID = require ('../utils/isUUID')

//  getDogByIdBreeds PARA EL LLAMADO DE DETAILS

module.exports = async (req, res) => {
    const {id} = req.params;
    //Establezco una condición comprobando si 'id' es o no un UUID para buscar en base de datos o en API
    if (isUUID(id)){
        try{
          // findBypk el cual busca por PK del ids
            const rawDbDogById = await Dog.findByPk(id, {
                include: [{
                  model: temperament,
                  attributes: ['name'],
                  through: {
                    attributes: []  // tabla intermedia vacia
                  }
                }] 
        })
        if (!rawDbDogById) throw new Error('Dog not found!') // formatea la data para que llegue igual que los datos de la api
          const dbDogById = {
            id: rawDbDogById.dataValues.id,
            name: rawDbDogById.dataValues.name,
            height: rawDbDogById.dataValues.height,
            weight: rawDbDogById.dataValues.weight,
            life_span: rawDbDogById.dataValues.life_span,
            image: rawDbDogById.dataValues.image,
            temperament: rawDbDogById.dataValues.temperaments.map(t => t.name)
            
          }
          
        res.status(200).json(dbDogById);
    }   catch(error){
        res.status(404).json({ error: error.message });
    }
        }else {
        try {
      //Llamado de axios a la url de dogs con el id como endpoint
      const response = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
      //Formateo de la respuesta para para coincidir con la data de id
      const apiFind = response.find(b => b.id == id)
      const apiDog = {                               // organiza todos los datos traidos del response de "apiFind"
        id: apiFind.id,
        name: apiFind.name,
        image: apiFind.image 
          ? apiFind.image.url
          : "https://img2.freepng.es/20180330/qge/kisspng-dog-puppy-silhouette-clip-art-bone-dog-5abe49d6e6fc19.0846729215224201829461.jpg",
        temperament: apiFind.temperament ? apiFind.temperament.split(", ") : [],
        life_span: apiFind.life_span,
        height: apiFind.height.metric,
        weight: apiFind.weight.metric
      };
      res.status(200).json(apiDog);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}
