import "./Landing.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logoDogs.png";

const LandingPage = () => {
  return (
    <section className="landing-wrapper">
      <div className="container">
        <img src={logo} alt="Dog" className="logoDog" />
        <Link className="styleBotton" to="/home">
          Ingresar
        </Link>
      </div>
    </section>
  );
};

export default LandingPage;
