
const { temperament } = require("../db");



module.exports = async (req, res) => {
  try {
    //Invoco el método 'findAll' del modelo 'Temperaments' para traer todos los temperamentos desde la base de datos
    const allTemperaments = await temperament.findAll();
   
    res.status(200).json(allTemperaments);
  } catch (error) {
    
    res.status(404).json({ error: error.message });
  }
};

