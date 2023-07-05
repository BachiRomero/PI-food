import { Link } from "react-router-dom";
import { URL } from "./image";

function Landing() {
  return (
    <div>
      <h1>Bienvenidos al PI de food</h1>
      <Link to={"/home"}>
        <img src={URL} alt="food"></img>
        <h3>Ingresar</h3>
      </Link>
      <h3>Created by Basilio Carlos Romero Rojas</h3>
    </div>
  );
}

export default Landing;
