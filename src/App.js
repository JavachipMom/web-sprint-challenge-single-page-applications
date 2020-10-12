import React from "react";
import { Link, Route } from "react-router-dom";
import "./components/styles.css";
import Home from "./components/Home";
import Form from "./components/Form";

const App = () => {
  return (
    <div>
      <header>
        <h1>Lambda Eats</h1>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </header>

      <Route exact path="/" component={Home} />
      <Route path="/pizza" component={Form} />
    </div>
  );
};
export default App;
