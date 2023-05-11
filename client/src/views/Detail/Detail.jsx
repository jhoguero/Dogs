import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { cleanDetails, getDetails } from "../../redux/actions"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";


import './Detail.css'


function DetailsPage() {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const { id } = useParams();
  
    useEffect(() => {
      dispatch(getDetails(id));
    }, []);
  
    useEffect(() => {
      return () => {
        dispatch(cleanDetails());
      };
    }, []); // array de dependencia

  
    if (details.id) {
      return (
        <div className="detail-wrapper">
          <div>
            <Link to={`/home`}>
              <button className="to-home">HOME</button>
            </Link>
          </div>
          <div className="container-detail">
            <section className="img">
              <img
                src={details.image}
                alt={`${details.name} sprite`}
                className="dog-img"
              />
            </section>
            <section className="info-dog">
              <h1 className="dog-name">{`${details.name[0].toUpperCase()}${details.name.slice(
                  1
                )}`}</h1>
              
              <div className="details">
                <p>Name: {details.name}</p>
                <p>Height: {details.height}</p>
                <p>Weight: {details.weight}</p>
                <p>Temperament: {details.temperament.join(", ")}</p>
                <p>Life_span: {details.life_span}</p>
              </div>
            </section>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
  
  export default DetailsPage;