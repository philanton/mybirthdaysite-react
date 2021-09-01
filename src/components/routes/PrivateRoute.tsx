import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import checkAuth from '../../utils/checkAuth';

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      checkAuth() ?
        <Component {...props} /> :
        <Redirect to="/home" />
    )} />
  );
};

export default PrivateRoute;