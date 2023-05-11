import React from "react";
import logo from "../../assets/logoDogs.png";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({handleChange, handleSubmit, handleClear} ) => {
  return (
    <div className="header is-primary">
      <a href="/home" className="header-item">
        <img src={logo} alt="Dog" className="logoDogs" />
      </a>
      <div className="button-container">
        <form onChange={handleChange}>
          <input
            placeholder="Busqueda"
            type="search"
            className="input-search"
          />
          <button type="submit" onClick={handleSubmit} className="button">
            BUSCAR
          </button>
        </form>
        <button onClick={handleClear} className="button">
          CLEAR
        </button>
        <Link to={`/createDog`}>
          <button className="button">CREATE DOG</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
