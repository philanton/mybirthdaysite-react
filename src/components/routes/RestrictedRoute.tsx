import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import checkAuth from '../../utils/checkAuth';

interface RestrictedRouteProps extends RouteProps {
  component: any;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      !checkAuth() ?
        <Component {...props} /> :
        <Redirect to="/home" />
    )} />
  );
};

export default RestrictedRoute;