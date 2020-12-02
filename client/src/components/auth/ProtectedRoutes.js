import React from "react";
import { Redirect } from "react-router-dom";

function ProtectedRoute({ component }) {
  const isAuthenticated = localStorage.getItem("auth-token");

  return <>{isAuthenticated ? component : <Redirect to="/" />} </>;
}

function checkIfRealUser(token) {

}

export default ProtectedRoute;