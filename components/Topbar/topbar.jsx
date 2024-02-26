import "./topbar.css";
import { Search, Chat, Notifications } from "@material-ui/icons";
import { signout, isAuth } from "../../helpers/auth";
import { toast } from "react-toastify";
import { Link, Navigate , Route } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import logo2 from "../../assests/book-keeper.png";
import Notification from "../../assests/notification-bell.png";
import Message from "../../assests/comment.png";
import { io } from "socket.io-client";

import SearchBar from "./SearchBar";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [username, setUsername] = useState();
  const [picture, setPicture] = useState();
  const [alluser, setAlluser] = useState([]);
  const [notif, setNotif] = useState([]);
  const socket = useRef();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/post/profil/" + user.name
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  /*
  const likeHandler = () => {
    try {
      axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
  };*/

  useEffect(() => {
    if (!user) return null;
    setUsername(user.name);
    setPicture(user.picture);
  }, [user]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userlist = await axios.post("/alluser");
        setAlluser(userlist.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [user]);

  return (
    <div className="topbarContainer">
      <Link to="/anasayfa" style={{ textDecoration: "none" }}>
        <img src={logo2} style={{ width: "35px", heigth: "35px" }} />
      </Link>

      <div className="topbarLeft">
        <Link to="/anasayfa" style={{ textDecoration: "none" }}>
          <span className="logo2">Elden Ele Kitap </span>
        </Link>
      </div>

      <SearchBar placeholder="Kullanıcı Ara" data={alluser} />

      <div className="topbarRight">
        <div className="topbarLink">
          <Link to="/anasayfa" style={{ textDecoration: "none" }}>
            <span style={{ textDecoration: "none", color: "white" }}>
              {" "}
              Anasayfa
            </span>
          </Link>
        </div>
        {isAuth().role === "admin" ? (
          <div className="topbarLink">
            <Link to="/adminpanel" style={{ textDecoration: "none" }}>
              <span style={{ textDecoration: "none", color: "black" }}>
                {" "}
                Admin
              </span>
            </Link>
          </div>
        ) : null}
        <div className="topbarLink">
          <Link to="/takipcilerin-paylasimi" style={{ textDecoration: "none" }}>
            <span style={{ textDecoration: "none", color: "white" }}>
              {" "}
              Takipçilerin paylaşımı
            </span>
          </Link>
        </div>

        <div className="topbarIcons">
          <Link to="/mesajlar" style={{ textDecoration: "none" }}>
            <div className="topbarIconItem">
              <img
                src={Message}
                alt=""
                style={{ width: "30px", heigth: "30px", marginLeft: "20px" }}
              />
            </div>
          </Link>
          <div className="topbarIconItem">
            <img
              src={Notification}
              alt=""
              style={{ width: "30px", heigth: "30px", marginLeft: "5px" }}
            />
            <span className="topbarIconBadge">{posts.length}</span>
          </div>
        </div>
        <div className="topbarRight3">
          <div class="dropdown">
            <button class="dropbtnsa">
              {" "}
              <Link to={`/profil/${user?.name}`}>
                <img
                  src={user?.picture ? user?.picture : PF + "/noAvatar.png"}
                  alt="PP"
                  className="topbarImg"
                />
              </Link>{" "}
            </button>

            <div class="dropdown-content">
              <Link to={`/profil/${username}`}> Profil </Link>

              <Link to={`/profil/edit/${username}`}> Profili Düzenle</Link>

              <button
                style={{ color: "8f0d0d" }}
                onClick={() => {
                  signout(() => {
                    toast.error("Başarıyla çıkış yapıldı");
                    window.location.reload();
                  });
                }}
              >
                ÇIKIŞ
              </button>
            </div>
          </div>
          <div
            className="topbarRight"
            style={{ marginTop: "auto", marginBottom: "auto" }}
          >
            {username}
          </div>
        </div>
      </div>
    </div>
  );
}
