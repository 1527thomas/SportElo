import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Button from "@material-ui/core/Button";

function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <nav className="auth_options">
      {userData.user ? (
        <Button onClick={logout}>Log out</Button>
      ) : (
        <>
          <Button onClick={register}>Register</Button>
          <Button onClick={login}>Log in</Button>
        </>
      )}
    </nav>
  );
}

export default AuthOptions;
