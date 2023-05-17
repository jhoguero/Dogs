import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import './Pagination.css'

const Pagination = ({ handlePage, page, perpage, }) => {
  const pages = useSelector((state) => {
    return state.allDogs.length
  }); //busca el largo de perro y ajusta la cantidad de pagina segun el search.
  const [count, setCount] = useState(0); //el conteo empieza en cero

  const [paginate, setPaginate] = useState([]); //declaro estado local(arreglo donde estan las paginas)

  useEffect(() => {
    setCount(Math.floor(pages / perpage)+1); //es la divicion de la cantidad de perros dividido 8
  }, [perpage, pages]);

  useEffect(() => {
    const arrayPage = [];
    for (let i = 0; i < count; i++) {
      arrayPage.push(i); //lleno la casilla del paginado que es el estado local (paginate)
    }
    setPaginate(arrayPage);
  }, [count]);

  return (
    <div className="pag-container">
      {page > 0 && (
        <button onClick={() => handlePage(page - 1)} className="button">&#9664;</button>
      )}
      {paginate.map((p) => (
        <button key={p} onClick={() => handlePage(p)} className="button">
          {p + 1}
        </button>
      ))}
      {page < paginate.length -1 && (
        <button onClick={() => handlePage(page + 1)} className="button">&#9654;</button>
      )}
    </div>
  );
};

export default Pagination;
