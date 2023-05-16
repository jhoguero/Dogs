import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";



import LandingPage from "./views/Landing/Landing";
import HomePage from "./views/Home/Home";
import CreateDog from "./componets/CreateDog/CreateDog";
import DetailsPage from "./views/Detail/Detail";


function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/createDog" component={CreateDog} />
            <Route exact path="/details/:id" component={DetailsPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
