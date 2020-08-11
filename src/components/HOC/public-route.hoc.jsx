import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({
  component: Component,
  authenticated,
  ...otherProps
}) => {
  return (
    <Route
      {...otherProps}
      render={(props) =>
        authenticated === true ? (
          <Redirect to="/chat" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
