const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
                          // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
                        //nombre
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
                          // alto
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
                            // peso
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
                             // ESPERANZA DE VIDA
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: "https://img2.freepng.es/20180330/qge/kisspng-dog-puppy-silhouette-clip-art-bone-dog-5abe49d6e6fc19.0846729215224201829461.jpg"
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
