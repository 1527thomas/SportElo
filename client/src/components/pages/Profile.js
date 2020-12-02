import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [userId, setUserId] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    getUserInfo(token).then((res) => {
      setUserId(res.id);
      setDisplayName(res.displayName);
      setEmail(res.email);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const passwordRes = await axios.post(
      "http://localhost:5000/users/password",
      {
        userId,
        password,
      }
    );
    if (passwordRes) {
      alert("Password successfully changed!");
      history.push("/home");
    } else {
      alert("Password change was unsuccessful.");
    }
  };

  return (
    <div className="app__home">
      <h2>Profile Details</h2>
      <div className="profile__container">
        <div className="display_name">
          <h3> Display Name: {displayName}</h3>
        </div>
        <div className="email">
          <h3> Email: {email}</h3>
        </div>
        <form className="passwordChange" onSubmit={submit}>
          <label htmlFor="change-password" className="password_title">
            Change Your Password
          </label>
          <input
            id="change-password"
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Change" />
        </form>
      </div>
    </div>
  );
}

async function getUserInfo(token) {
  const db = "http://localhost:5000/users/";
  try {
    return await axios
      .get(db, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    console.log("GetUserInfo method error: " + err);
  }
}

export default Profile;
