import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// A custom private route component
const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/" replace />}
    />
  );
};

export default PrivateRoute;
