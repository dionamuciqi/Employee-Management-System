import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("valid"));
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("valid"));
  }, [location]);

  return isAuthenticated ? children : <Navigate to="/adminlogin" state={{ from: location }} replace /> ;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
