


import { 
  GET_BY_NAME, 
  GET_DOGS, 
  CLEAR_SEARCH,
  GET_DETAILS,
  CLEAN_DETAILS,
  GET_TEMPERAMENTS,
  TEMPERAMENT_FILTER
} from "../actions";



let initialState = {
  allDogs: [],
  dogCopy: [],
  dogOrder: [],
  details: {},
  temperaments: []
}; //objetos




//funcion para ejecutar dependiendo de la accion solicitada
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload, // devuelve una araid con todos los pokemon
        dogCopy: action.payload, // la copia del filtrado y no alterar el original
        dogOrder: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        allDogs: action.payload, // devuelve una araid con el dog llamado por el nombre
      };
      case CLEAR_SEARCH:
    return {...state,
        allDogs: state.dogOrder
    }
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case CLEAN_DETAILS:
      return { ...state, details: {} 
    };

    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload.slice(0, 20) };

    case TEMPERAMENT_FILTER:
      if (action.payload === "all") {
        return {
          ...state,
          allDogs: state.dogCopy,
          filter: action.payload,
        };
      } else {
        return {
          ...state,
          filter: action.payload,
          allDogs: state.dogCopy.filter((d) => {
            return d.temperament.filter((t) => t === action.payload).length;
          }),
        };
      }
      
    default:
      return state;
  }
}
export default rootReducer;