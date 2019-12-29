import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./privateRoute";
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Pages
const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={props => <Register {...props} />}
            />
            <PrivateRoute
              path="/"
              name="Dashboard"
              render={props => <Dashboard {...props} />}
              component={Dashboard}
            ></PrivateRoute>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
