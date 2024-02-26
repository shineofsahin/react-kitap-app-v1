import "./rightbar.css";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Report, ReportOff } from "@mui/icons-material";
import { isAuth } from "../../helpers/auth";
import { io } from "socket.io-client";
import ChatOnline from "../ChatOnline/ChatOnline";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import ReactTimeAgo from "react-time-ago";
import { format } from "date-fns";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [usernames, setUsernames] = useState();
  const [followed, setFollowed] = useState();
  const [reported, setReported] = useState();
  const [dates, setDates] = useState();

  const [alluser, setAlluser] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const socket = useRef();

  useEffect(() => {
    if (!user) return null;
    setUsernames(user.name);
  }, [user]);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", currentUser?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser?.followings?.filter((f) =>
          users.some((u) => u.userId === f)
        )
      );
    });
  }, [currentUser]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "http://localhost:5000/api/friends/" + user?._id
        );
        setFriends(friendList?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user?._id]);
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

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:5000/api/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:5000/api/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };
  const handleClick2 = async () => {
    try {
      if (reported) {
        await axios.put(`http://localhost:5000/api/${user._id}/unreport`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNREPORT", payload: user._id });
      } else {
        await axios.put(`http://localhost:5000/api/${user._id}/report`, {
          userId: currentUser._id,
        });
        dispatch({ type: "REPORT", payload: user._id });
      }
      setReported(!reported);
    } catch (err) {}
  };

  const deleteClick = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete/${user._id}`);
      window.location.reload(); // anasayfaya yonlendir.
    } catch (err) {}
  };
  const HomeRightbar = () => {
    return (
      <>
        {/*
<h4 className="leftbarTitle">TÜM KULLANICILAR (Deneme süreci nedeniyle gösterilmektedir)</h4>
        <div className="leftbarFollowings">
          <div className="leftbarFollowing">
          {alluser.map((user) => (
            
            <Link
              to={"/profil/" + user.name}
              style={{ textDecoration: "none" }}
            >
              <div className="leftbarFollowing">
                <img
                  src={
                    user.picture
                      ? user.picture
                      : PF + "noAvatar.png" 
                  }
                  alt=""
                  className="leftbarFollowingImg"
                />
                <span className="leftbarFollowingName">{user.name}</span>
              </div>
            </Link>
          ))}
          </div>
        
       
        
        </div>

        */}

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <div className=" chatOnlineText">Aktif Arkadaşlar</div>
            {onlineUsers?.length !== 0 ? (
              <Link to={`/mesajlar`} style={{ color: " rgb(0, 138, 30)" }}>
                <ChatOnline
                  onlineUsers={onlineUsers}
                  currentId={currentUser?._id}
                />{" "}
              </Link>
            ) : (
              <div className=" chatOnlineText2">
                Şu anlık aktif takip ettiğiniz kişi yok...
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    useEffect(() => {
      setFollowed(currentUser?.followings?.includes(user?._id));
      setReported(currentUser?.report2?.includes(user?._id));
    }, [user, currentUser?.followings, currentUser?.report2]);
    return (
      <>
        {usernames !== currentUser?.name &&
          (followed ? (
            <button className="rightbarUnFollowButton1" onClick={handleClick}>
              {"  Takipten Çık"}{" "}
              <div style={{ marginLeft: "8px" }}>
                {" "}
                <GroupRemoveIcon />
              </div>
            </button>
          ) : (
            <button className="rightbarFollowButton1" onClick={handleClick}>
              {"  Takip Et"}{" "}
              <div style={{ marginLeft: "8px" }}>
                {" "}
                <GroupAddIcon />
              </div>
            </button>
          ))}
        {usernames !== currentUser?.name &&
          (reported ? (
            <button className="rightbarUnReportButton" onClick={handleClick2}>
              {"  Şikayetten Vazgeç"}{" "}
              <div style={{ marginLeft: "8px", color: "white" }}>
                {" "}
                <ReportOff />
              </div>
            </button>
          ) : (
            <button className="rightbarReportButton" onClick={handleClick2}>
              {"  Şikayet Et"}{" "}
              <div style={{ marginLeft: "8px" }}>
                {" "}
                <Report />
              </div>
            </button>
          ))}
        {isAuth().role === "admin" && (
          <button className="rightbarAdminDeleteButton" onClick={deleteClick}>
            {"Kullanıcıyı sil"}
          </button>
        )}

        <h4 className="rightbarTitle">Kullanıcı bilgileri</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Rolü:</span>
            <span className="rightbarInfoValue">
              <b>
                {user?.role === "admin" ? (
                  <span style={{ color: "#ac1111" }}>
                    <b>Admin</b>
                  </span>
                ) : (
                  <span style={{ color: "#036919" }}>
                    <b>Üye</b>
                  </span>
                )}{" "}
              </b>
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Şehir:</span>
            <span className="rightbarInfoValue">
              <b>{user.city} </b>
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Takip:</span>
            <span className="rightbarInfoValue">
              <b>{user?.followings?.length}</b>
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Takipçi:</span>
            <span className="rightbarInfoValue">
              <b>{user?.followers?.length}</b>
            </span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ortalama yıldız:</span>
            <span className="rightbarInfoValue">
              <b>
                {" "}
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={
                        index <= user.totalrating / user?.voters?.length
                          ? "on"
                          : "off"
                      }
                    >
                      <i class="fa-solid fa-star"></i>
                    </button>
                  );
                })}
              </b>
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">Takip Ettikleri:</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            {friends.length === 0 ? (
              <b>
                <h5
                  style={{
                    textAlign: "center",
                    marginTop: "1rem",
                    color: "#0e9174",
                  }}
                >
                  {" "}
                  Kullanıcı kimseyi takip etmiyor..
                </h5>{" "}
              </b>
            ) : (
              friends.map((friend) => (
                <Link
                  to={"/profil/" + friend.name}
                  style={{ textDecoration: "none" }}
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        friend.picture ? friend.picture : PF + "noAvatar.png"
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">{friend.name}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
