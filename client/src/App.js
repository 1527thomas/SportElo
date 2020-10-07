import React, { useState } from "react";
import "./App.css";
import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState([
    {
      athletename: "Stephen Curry",
      imageUrl:
        "https://image-cdn.essentiallysports.com/wp-content/uploads/20200725130552/stephen-curry-gsw-2-scaled.jpg",
    },
    {
      athletename: "Lebron James",
      imageUrl:
        "https://image-cdn.essentiallysports.com/wp-content/uploads/20200702112824/lebron-james-flexing-1600x901.jpg",
    },
  ]);

  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      <h1>Hello World</h1>
      {/* Header */}

      {posts.map((post) => (
        <Post athletename={post.athletename} imageUrl={post.imageUrl} />
      ))}

      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;
