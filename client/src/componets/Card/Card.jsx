import { Link } from "react-router-dom";
import "./Card.css";


function Card ({dog}) {
    const {id, image, name, temperament, weight} = dog;

    return (
        <div className="card-container">
            <Link to={`details/${id}`}>
            <div className="img-container">
                <img src={image} alt="imagenDog" className="image"/>
            </div>
            <div className="card-info">
               <h2 className="card-title">{name.toUpperCase()}</h2> 
               <p className="card-subtitle">
                {temperament?.map((t)=>{
                    return t ;
                }).join(", ")}
               </p>
               <p className="card-subtitle">
               {weight.toUpperCase() + " " + "Kg"}
               </p>
            </div>
            </Link>
        </div>
    )
}

export default Card;
