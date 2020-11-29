import Axios from "axios";
import React, { useState, useEffect } from "react";
import "../../App.css";
import Post from "../Post";

function Home() {
    //should fetch DB to get user.followeredPlayers

    const [athlete, setAthlete] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        checkPlayerId(token).then(userIdRes => {
            getUsersAthletes(userIdRes).then(athleteRes => {
                setAthlete(athleteRes);
            })
        })
        .catch(err => {
            console.log("Home rerender of CheckPlayerId error: " + err);
        })
    }, [])

    return (
        <div className="app__home">
            {athlete ? athlete.map((athlete) => (
                <Post key={athlete._id} athletename={athlete.name} />
            )) : <> </>}
        </div>
        
    );
}

async function checkPlayerId(token) {
    const db = "http://localhost:5000/users/";
    try {
        return await Axios.get(db, {
            headers: {
                "x-auth-token": token
            }
        })
        .then(res => {
            return res.data.id;
        })
        .catch(err => {
            console.log("Getting token: " + err);
        })
    }
    catch (err) {
        console.log("CheckPlayerId method error: " + err)
    }
}

async function getUsersAthletes(userId) {
    const dbPlayers = "http://localhost:5000/users/getPlayers";
    try {
        return await Axios.get(dbPlayers, {
            params: {
                userId: userId
            }
        })
        .then(res => {
            return res.data;
        })
    }
    catch (err) {
        console.log("GetUsersAthletes method error: " + err);
    }
}

export default Home;
