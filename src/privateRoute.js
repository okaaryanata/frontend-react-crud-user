import React from "react";
import { Redirect, Route } from "react-router-dom";
import * as Api from "../src/api/Api";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = Api.checkCookie();

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
