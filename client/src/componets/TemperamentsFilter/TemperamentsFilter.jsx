import React from 'react'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import './TemperamentsFilter.css'
import { temperamentFilter, getTemperaments } from "../../redux/actions"

const TemperamentsFilter = ({ setPage }) => {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    const filter = useSelector((state) => state.filter);  //ejecucion del filter de temepramentos de los perros
    
    useEffect(() => {
        dispatch(getTemperaments()); //llamado a los temperamentos       
      }, []);


    const handleFilter = (temperament) => {
        setPage(0);
        dispatch(temperamentFilter(temperament));
      };
    
  return (
    <div className='temperament-container'>
        {temperaments?.map((t, i) => (
          <button
            key={i}
            onClick={() =>
              filter === t.name? handleFilter("all") : handleFilter(t.name)}
            
            className='button-temperament'
          >
            {t.name.toUpperCase()}
          </button>
        ))}
        
    </div>
  )
}

export default TemperamentsFilter