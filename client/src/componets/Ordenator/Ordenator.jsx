import {useSelector, useDispatch } from "react-redux";
import { filterDog } from "../../redux/actions";

import './Ordenator.css'


const Ordenator = ({ setPage }) => {
    const searchDog = useSelector((state)=>state.allDogs)
    const dispatch = useDispatch();
    const handleFilter = (e) =>{
      setPage(0)
      dispatch(filterDog(e.target.name))
    }

  

  return (
    <div className='sort'>
        {searchDog.length > 1 && <button name='aToZ' onClick={handleFilter} className='button'>&#10607; A-Z</button>}
        {searchDog.length > 1 && <button name='zToA' onClick={handleFilter} className='button'>&#10607; Z-A</button>}
        {searchDog.length > 1 && <button name="weightDesc" onClick={handleFilter} className='button'>&#8643; WEIGHT</button>}
        {searchDog.length > 1 && <button name="weightAsc" onClick={handleFilter} className='button'>&#8639; WEIGHT</button>}
    </div>
  )
}

export default Ordenator