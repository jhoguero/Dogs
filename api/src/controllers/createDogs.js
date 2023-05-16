const { Dog } = require("../db");

module.exports = async (req, res) =>{
  try{
      // recibe el body por req.body y se lo pasa al modelo dog para crear un nuevo dog, el cual se realiza por medio del form
      const newDog = await Dog.create(req.body);
      console.log(req.body)
     
      await newDog.addTemperaments(req.body.temperament);

      
      

      res.status(201).json({
          message: 'Dog successfully created',
          new_dog: newDog
        });
  }   catch (error) {
      res.status(400).json({ error: error.message });
  }
};
