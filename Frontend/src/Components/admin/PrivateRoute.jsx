// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
  return localStorage.getItem("valid") ? children : <Navigate to="/"/>
}


PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired 
  };
  
export default PrivateRoute