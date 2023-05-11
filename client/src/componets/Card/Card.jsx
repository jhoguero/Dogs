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
            <div className="info">
               <h2>{name.toUpperCase()}</h2> 
               <p>
                {temperament?.map((t)=>{
                    return t ;
                }).join(", ")}
               </p>
               <p>
               {weight.toUpperCase() + " " + "Kg"}
               </p>
            </div>
            </Link>
        </div>
    )
}

export default Card;
