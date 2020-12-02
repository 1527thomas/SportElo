import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/Button';

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
        <Button variant="light" onClick={logout}>Log out</Button>
 //       <button onClick={logout}>Log out</button>
      ) : (
        <>
        
          <Button variant="light" active onClick={register}>Register</Button>
          <Button variant="light" active onClick={login}>Log in</Button>
        

        </>
      )}
    </nav>
  );
}

export default AuthOptions;
