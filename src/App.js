import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Chat from "./pages/chat/chat-page.component";
import Signup from "./pages/signup/signup-page.component";
import Login from "./pages/login/login-page.component";
import { auth } from "./firebase/firebase.utils";
import PublicRoute from "./components/HOC/public-route.hoc";
import PrivateRoute from "./components/HOC/private-route.hoc";
import Loading from "./components/loading/loading.component";
import Header from "./components/header/header.component";

import "./App.scss";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    });
  }, [authenticated, loading]);

  return loading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Header loggedIn={authenticated} />
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            authenticated ? <Redirect to="/chat" /> : <Redirect to="/login" />
          }
        />
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chat}
        />
        <PublicRoute
          path="/signup"
          authenticated={authenticated}
          component={Signup}
        />
        <PublicRoute
          path="/login"
          authenticated={authenticated}
          component={Login}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
