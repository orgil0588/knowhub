import React, { Component, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Quiz from "./Pages/Quiz";
import QuizDetails from "./Pages/QuizDetails";

export default class App extends Component {
  state = {
    token: null,
    router: null,
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.router.history.push("/");
    window.location.reload();
  };
  handleLogin = (token) => {
    this.setState({ token });

    localStorage.setItem("token", token);
    this.router.history.push("/quiz");
  };

  render() {
    return (
      <div className="w-full flex justify-center font-mono bg-black">
        <div className="container mx-4 w-full sm:mx-auto ">
          <Router ref={(router) => (this.router = router)}>
            <Navbar onLogout={this.handleLogout} />
            <Switch>
              {" "}
              <Route exact path="/" component={LandingPage} />
              <Route path="/register" component={Register} />
              <Route exact path="/quiz" component={Quiz} />
              <Route path="/quiz/:id" component={QuizDetails} />
              <Route
                path="/login"
                render={() => <Login onLogin={this.handleLogin} />}
              />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
