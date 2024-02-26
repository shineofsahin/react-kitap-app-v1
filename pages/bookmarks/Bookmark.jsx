import Post from "../../components/post/post";
import Topbar from "../../components/Topbar/topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/rightbar/rightbar";
import BookmarkIcon from "@mui/icons-material/Bookmarks";

import "./bookmark.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Bookmark({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [userid, setUserid] = useState();
  const [SearchText, setSearchText] = useState("");

  useEffect(() => {
    if (!user) return null;
    setUserid(user._id);
  });
  const handleChange = (value) => {
    setSearchText(value);
    handleChange2();
  };

  const handleChange2 = (event) => {
    const Sac = event.target.value;
    setSearchText(Sac);
    console.log(Sac);
    const res = axios
      .get(`http://localhost:5000/api/post/search/${Sac}`)
      .then((resp) => {
        setPosts(resp.data);
      });
  };
  const filterData = (value) => {
    const lowerCaseValue = value.toLowerCase().trim();
    if (!lowerCaseValue) {
      setPosts(posts);
    } else {
      const filteredData = posts.filter((item) => {
        return Object.keys(item).some((key) => {
          return item[key].toString();
        });
      });
      setPosts(filteredData);
      console.log(filteredData);
    }
  };
  useEffect(() => {
    if (!SearchText) {
      const fetchPosts = async () => {
        const res = await axios.get(
          `http://localhost:5000/api/post/kaydedilenler/${user._id}`
        );

        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      };
      fetchPosts();
    }
  }, [posts.length, userid, handleChange]);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="feed">
          <div className="feedWrapper">
            <h2
              style={{
                textAlign: "center",
                marginTop: "1.75rem",
                color: "#0e9174",
              }}
            >
              {" "}
              Kaydedilenler <BookmarkIcon style={{ marginLeft: "5px" }} />
            </h2>
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
          </div>
        </div>
        <Rightbar />
      </div>
    </>
  );
}
