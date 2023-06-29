import Home from "./pages/home/home";
import Detail from "./pages/detail/detail";
import Create from "./pages/create/create";
import { Route } from "react-router-dom";
import Landing from "./pages/landing/landing";

//import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route path="/home/:id" component={Detail} />
      <Route path="/create" component={Create} />
    </div>
  );
}

export default App;
