import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { getFirebaseIsAuthenticated } from "../../redux/selector/firebaseSelectors";

import { routes } from ".";

export interface RouteWithLayoutProps {
  layout: any;
  component: any;
  path?: string;
}

export const RouteWithLayout = (props: RouteWithLayoutProps & RouteProps) => {
  const { layout: Layout, component: Component, path, ...rest } = props;

  const firebaseIsAuthenticated = useSelector(getFirebaseIsAuthenticated);

  return (
    <Route
      {...rest}
      render={(matchProps) =>
        firebaseIsAuthenticated ? (
          <Redirect to={{ pathname: routes.home.path }} />
        ) : (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )
      }
    />
  );
};

export const PrivateRouteWithLayout = (props: RouteWithLayoutProps | any) => {
  const { layout: Layout, component: Component, path, ...rest } = props;

  const firebaseIsAuthenticated = useSelector(getFirebaseIsAuthenticated);

  return (
    <Route
      {...rest}
      render={(matchProps) => {
        const { location } = matchProps;
        return firebaseIsAuthenticated ? (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: routes.signIn.path,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
