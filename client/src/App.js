import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Alert from "./components/layout/alert";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing}></Route>
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
