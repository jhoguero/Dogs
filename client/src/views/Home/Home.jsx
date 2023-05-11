import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByname, clearSearch, getDogs } from "../../redux/actions";
import Pagination from "../../componets/Pagination/Pagination";
import TemperamentsFilter from "../../componets/TemperamentsFilter/TemperamentsFilter";

import Header from "../../componets/commons/Header";
import Cards from "../../componets/Cards/Cards";
import "./Home.css";

const HomePage = () => {
    const dispatch = useDispatch();
    const PER_PAGE = 8;
    const [page, setPage] = useState(0);
    const allDogs = useSelector((state) =>
    state.allDogs.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
  );
  // formula para paginar el cual hace el calculo dependiendo cuantos pomekemones se tenga por pagina
    

  const [searchString, setSearchString] = useState(""); //seteo de la busqeda de dogs

  function handleChange(e) {
    setSearchString(e.target.value); // setea el target value de la busqueda
  }

  function handleSubmit(e) {
    e.preventDefault(); // para que refresque la pagina al momento de la busqueda
    setPage(0)   // reinicia paginado al momento de hacer la busqueda
    
    dispatch(getByname(searchString)); // va buscar por el string que dispara el evento
    setSearchString("");
  }

  function handlePage(pag) {
    setPage(pag);
  }

  function handleClear() {
    setPage(0)
    dispatch(clearSearch()); // receta el estado allDogs a inicial
  }

  useEffect(() => {
    dispatch(getDogs()); //llamado a los dogs
  }, []);

  return (
    <>
      <Header
        handleChange={handleChange}
        setPage={setPage} 
        handleSubmit={handleSubmit}
        handleClear={handleClear}
      />
      <section className="main-container">
        <Cards allDogs={allDogs} />
        <Pagination page={page} perpage={PER_PAGE} handlePage={handlePage} />
        <div>
          <TemperamentsFilter setPage={setPage} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
