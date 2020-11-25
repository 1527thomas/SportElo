import React, { useState } from "react";
import "../../App.css";
import Post from "../Post";

function Home() {
    //should fetch DB to get user.followeredPlayers
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
        <div className="app__home">
            {posts.map((post) => (
                <Post key={post.athletename} athletename={post.athletename} imageUrl={post.imageUrl} />
            ))}
            
        </div>
        
    );
}

export default Home;
