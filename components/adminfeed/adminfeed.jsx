import Post from "../post/post";
import Share from "../share/share";
import "./adminfeed.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Adminfeed({username}) {
   const [posts, setPosts] = useState([]);
   const { user } = useContext(AuthContext);
   const [userid, setUserid] = useState();
   useEffect(() => {
    if (!user) return null;
    setUserid(user._id)
  }, )

    useEffect(() => { 
    
    const fetchPosts = async () => {
    const res =  await axios.post("http://localhost:5000/api/post/allpost");
    console.log(res.data)
    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );

    };
    fetchPosts();
    }, [username, userid]);

  return (
    <div className="feed">
      <div className="feedWrapper"> 
      {(!username || username === user.name) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}