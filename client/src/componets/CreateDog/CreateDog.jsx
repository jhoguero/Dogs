import validationDog from "../Form/ValidationDog";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import './CreateDogs.css';

const initialDog = {
  name: "",
  life_span: "",
  heightMin: "",
  heightMax: "",
  weightMin: "",
  weightMax: "",
  temperaments: [],
};

function CreateDog() {
  const temperaments = useSelector((state) => state.temperaments); // trae el estado temperamentos de redux
  const [input, setInput] = useState(initialDog);
  const [disabler, setDisabler] = useState(true);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    if (disabler) {
      setDisabler(false); //condicion para que se habilite el boton crear si no hay errores
    }
    setInput({
      ...input,
      [e.target.name]: e.target.value, // seteo el estado input con el evento segun name y value
    });
    setErrors(
      validationDog({ ...input, [e.target.name]: e.target.value }) // valida el estado input y genera error segun la condicion validationDog
    );
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleChangeDogs = (e) => {
    const temperament = JSON.parse(e.target.value); // parsea valor numerico del value del input
    if (input.temperaments.includes(temperament)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments.filter((t) => t !== temperament)], //metodo para remover los temperamentos que se quieran quitar en el create
      });
      setErrors(
        validationDog({
          ...input,
          temperaments: [
            ...input.temperaments.filter((t) => t !== temperament),
          ], // valida que la casilla de temperamentos este llena
        })
      );
    } else {
      setInput({
        ...input,
        temperaments: [...input.temperaments, temperament], // metodo para poner los temperamentos sin que se pisen
      });
      setErrors(
        validationDog({
          ...input,
          temperaments: [...input.temperaments, temperament], // valida que la casilla de tempéramentos este llena
        })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //para no refrescar el navegador
    if (!Object.entries(errors).length) {
      const body = {
        name: input.name,
        height: `${input.heightMin} - ${input.heightMax}`,
        weight: `${input.weightMin} - ${input.weightMax}`,
        life_span: input.life_span,
        temperament: input.temperaments
      }
      const response = await axios.post("http://localhost:3001/dogs", body); //envia post al back del perro creado
      if (response.data.message === "Dog successfully created") {
        history.push(`/details/${response.data.new_dog.id}`); // ruta para ver el detalle de la creacion de perro
      }
    }
  };


  return (
    <div className="create-wrapper">
      <form onSubmit={handleSubmit} className="form-create">
        <div>
          <img
            src="https://img2.freepng.es/20180330/qge/kisspng-dog-puppy-silhouette-clip-art-bone-dog-5abe49d6e6fc19.0846729215224201829461.jpg"
            alt="dog"
            className="img-dog"
          />
        </div>
        <div>
          <label> Name</label>
          <input
            onChange={handleChange}
            value={input.name}
            name="name"
            className="input-create"
          />
          {errors.name ? <label>{errors.name}</label> : <label>&nbsp;</label>}
        </div>
        <div>
          <label> Life_span </label>
          <input
            onChange={handleChange}
            value={input.life_span}
            type="number"
            name="life_span"
            className="input-create"
          />
          {errors.life_span ? (
            <label>{errors.life_span}</label>
          ) : (
            <label>&nbsp;</label>
          )}
        </div>
        <div>
          <label> HeightMin</label>
          <input
            onChange={handleChange}
            value={input.heightMin}
            type="number"
            name="heightMin"
            className="input-create"
          />
          {errors.heightMin ? (
            <label>{errors.heightMin}</label>
          ) : (
            <label>&nbsp;</label>
          )}
        </div>
        <div>
          <label> HeightMax</label>
          <input
            onChange={handleChange}
            value={input.heightMax}
            type="number"
            name="heightMax"
            className="input-create"
          />
          {errors.heightMax ? (
            <label>{errors.heightMax}</label>
          ) : (
            <label>&nbsp;</label>
          )}
        </div>
        <div>
          <label> WeightMin</label>
          <input
            onChange={handleChange}
            value={input.weightMin}
            type="number"
            name="weightMin"
            className="input-create"
          />
          {errors.weightMin ? (
            <label>{errors.weightMin}</label>
          ) : (
            <label>&nbsp;</label>
          )}
        </div>
        <div>
          <label> WeightMax</label>
          <input
            onChange={handleChange}
            value={input.weightMax}
            type="number"
            name="weightMax"
            className="input-create"
          />
          {errors.weightMax ? (
            <label>{errors.weightMax}</label>
          ) : (
            <label>&nbsp;</label>
          )}
        </div>
        <div className="temperaments-checkbox">
          <label> Temperament:</label>
          {errors.temperaments ? (
            <label>{errors.temperaments}</label>
          ) : (
            <label>&nbsp;</label>
          )}
          <div className="check">
            {temperaments?.map((t) => {
              return (
                <div key={t.id}>
                  <label>{t.name}:</label>
                  <input
                    onChange={handleChangeDogs}
                    value={`${t.id}`}
                    type="checkbox"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="buttons-create">
          <input
            disabled={disabler || Object.entries(errors).length ? true : false}
            value="Create"
            type="submit"
          />
          <Link to={`/home`}>
            <button>Home</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default CreateDog;
