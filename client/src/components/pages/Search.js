import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Search() {
  const [results, setResults] = useState([]);
  const [player, setPlayer] = useState("");
  const [userId, setUserId] = useState("");

  const handleAddPlayer = async (event) => {
    event.preventDefault();
    addPlayerToUser(userId, player)
      .then((res) => {
        if (res) {
          alert("Player added!");
        } else {
          alert("You've already added this player.");
        }
      })
      .catch((err) => {
        console.log("addplayer error: " + err);
      });
  };

  const onPlayerChange = (e, values) => {
    e.preventDefault();
    setPlayer(values);
  };

  useEffect(() => {
    getSearchResults().then((res) => {
      setResults(res);
    });
    const token = localStorage.getItem("auth-token");
    checkPlayerId(token).then((res) => {
      setUserId(res);
    });
  }, [userId]);

  return (
    <div className="app__home">
      <Autocomplete
        id="search_player"
        options={results}
        getOptionLabel={(option) => option.name}
        style={{ padding: 15 }}
        onChange={onPlayerChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for your favorite athletes in our database"
            variant="outlined"
          />
        )}
      />
      <div className="button__container">
        <Button
          style={{ float: "right", marginRight: 15 }}
          variant="contained"
          onClick={handleAddPlayer}
        >
          Add Player
        </Button>
      </div>
    </div>
  );
}

async function checkPlayerId(token) {
  const db = "http://localhost:5000/users/";
  try {
    return await axios
      .get(db, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        return res.data.id;
      })
      .catch((err) => {
        console.log("Getting token: " + err);
      });
  } catch (err) {
    console.log("CheckPlayerId method error: " + err);
  }
}

async function addPlayerToUser(userId, player) {
  const db = "http://localhost:5000/users/addPlayer";
  try {
    return await axios
      .post(db, {
        params: {
          userId: userId,
          player: player,
        },
      })
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    console.log("AddPlayerToUser method error: " + err);
  }
}

async function getSearchResults() {
  const searchUrl = "http://localhost:5000/players";
  try {
    return await axios
      .get(searchUrl)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("Search result error: " + err);
      });
  } catch (err) {
    console.log("GetSearchResults method error: " + err);
  }
}

export default Search;
