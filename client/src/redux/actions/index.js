import axios from "axios";


export const GET_DOGS = "GET_DOGS";
export const GET_BY_NAME = "GET_BY_NAME";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const TEMPERAMENT_FILTER = 'TEMPERAMENT_FILTER';


export function getDogs() {
    return async function (dispatch) {
      const response = await axios("http://localhost:3001/dogs"); //respuesta del llamado a la api todos los dog
      return dispatch({
        type: "GET_DOGS", // el tipo varia segun el tipo (get,post)
        payload: response.data, //repuesta del llamado todo los DOGS
      });
    };
  }

  export function getByname(name) {
    return async function (dispatch) {
      const response = await axios(`http://localhost:3001/dogs/search?name=${name}`); //respuesta del llamado a la api por nombre
      return dispatch({
        type: "GET_BY_NAME", // el tipo GET
        payload: response.data, //repuesta del llamado todo los dogs
      });
    };
  }

  export const  clearSearch = () => {
    return {type: CLEAR_SEARCH}
  }

  export function getDetails(id) {
    return async function (dispatch) {
      const response = await axios(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: response.data,
      });
    };
  }

  export const cleanDetails = () => {
    return { type: CLEAN_DETAILS };
  };

  export function getTemperaments(temperaments) {
    return async function(dispatch){
    const response = await axios ('http://localhost:3001/temperaments')
      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: response.data,
      })
    } 
  };

  export const temperamentFilter = (filter) => {
    return { type: TEMPERAMENT_FILTER, payload: filter };
  };