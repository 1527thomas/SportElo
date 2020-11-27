import React from "react";
import { Redirect } from "react-router-dom";

// class ProtectedRoute extends React.Component {
//   render() {
//     const Component = this.props.component;
//     const isAuthenticated = localStorage.getItem("token");
//     return isAuthenticated ? (
//       <Component />
//     ) : (
//       <Redirect to={{ pathname: "/login" }} />
//     );
//   }
// }

function ProtectedRoute({ component }) {
  const isAuthenticated = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));

  return <>{isAuthenticated ? component : <Redirect to={/*landingpage*/} />}</>;
}

export default ProtectedRoute;
