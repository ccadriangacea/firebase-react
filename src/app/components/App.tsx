import React from "react";
import { Redirect, Switch } from "react-router-dom";

import { Account } from "../../components/Account";
import { Error, NotFound } from "../../components/Error";
import { Home } from "../../components/Home";
import { Landing } from "../../components/Landing";
import { Settings } from "../../components/Settings";
import { SignIn } from "../../components/SignIn";
import { SignUp } from "../../components/SignUp";
import { Dashboard, Minimal } from "../../layouts";
import { routes } from "../routes";
import { RouteWithLayout, PrivateRouteWithLayout } from "../routes/RouteWithLayout";

export const App: React.FC = () => {
  return (
    <Switch>
      <RouteWithLayout exact path={routes.landing.path} component={Landing} layout={Minimal} />
      <PrivateRouteWithLayout exact path={routes.signUp.path} component={SignUp} layout={Minimal} />
      <RouteWithLayout exact path={routes.signIn.path} component={SignIn} layout={Minimal} />
      <PrivateRouteWithLayout exact path={routes.home.path} component={Home} layout={Dashboard} />
      <PrivateRouteWithLayout exact path={routes.account.path} component={Account} layout={Dashboard} />
      <PrivateRouteWithLayout exact path={routes.settings.path} component={Settings} layout={Dashboard} />
      <RouteWithLayout exact path={routes.error.path} component={Error} layout={Minimal} />
      <RouteWithLayout exact path={routes.notFound.path} component={NotFound} layout={Minimal} />
      <Redirect to="/not-found" />
    </Switch>
  );
};
