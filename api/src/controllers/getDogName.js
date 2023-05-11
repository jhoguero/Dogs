const { Op } = require('sequelize');
const axios = require('axios');
const { Temperaments, Dog } = require('../db');
const { API_KEY } = process.env;



module.exports = async (req, res) => {
  
    if (req.query.name) {
      
      //Destructuro 'name' de 'req.query' y lo asigno en minúscula para que  la búsqueda sea 'case insensitive'
      const name = req.query.name.toLowerCase();
      try {
        //Empleo el método 'findAll' junto con el operador 'Op.like' de sequelize para buscar por nombre en base de datos y defino los atributos y relaciones con el modelo 'temperamentos' para que la búsqueda coincida con el requerimiento del front
        const dbSearchByName = await Dog.findAll({
          attributes: ['id', 'image', 'name'],
          include: [{
            model: Temperaments,
            attributes: ['name'],
            through: {
              attributes: []
            }
          }],
          where: {
            name: {
              [Op.like]: name
            }
          }
        });
        //Respuesta de la ruta en caso de encontrar en base de datos
        console.log(dbSearchByName.length)
        if(dbSearchByName.length > 0){
          return res.status(200).json(dbSearchByName[0]);
        }
        ////API
        //Llamado de axios a 'thedogapi.com' con 'name' como endpoint para buscar en API en caso de no encontrar en base de datos
        const allResponse = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
        const response = (await axios(`https://api.thedogapi.com/v1/breeds/search?api_key=${API_KEY}&q=${name}`)).data
        //Formateo de la respuesta para que la data coincida con el requerimiento del front
        const apiSearchByName = response.map (b =>{
          const foundImage = allResponse.find(br => br.reference_image_id === b.reference_image_id)
          return{
            id: b.id,
          name: b.name,
          image: foundImage ? foundImage.image.url : "https://img2.freepng.es/20180330/qge/kisspng-dog-puppy-silhouette-clip-art-bone-dog-5abe49d6e6fc19.0846729215224201829461.jpg",
          weight: b.weight.metric,
          temperament: b.temperament ? b.temperament.split(", ") : [],
          }
          
        })
        
        res.status(200).json(apiSearchByName);
      } catch (error) {
        
        res.status(404).json({ error: error.message });
      }
    } 
  };