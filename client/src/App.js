import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import LandingPage from "./components/pages/LandingPage";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import Search from "./components/pages/Search";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import Profile from "./components/pages/Profile";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <ProtectedRoute path="/home" component={<Home />} />
              <ProtectedRoute path="/search" component={<Search />} />
              <ProtectedRoute path="/profile" component={<Profile />} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
