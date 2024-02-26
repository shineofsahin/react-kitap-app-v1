import "./Sidebar.css";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmarks";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Following from "../messagerightbar/MessageRightbar";

import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import ChatOnline from "../ChatOnline/ChatOnline";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Sidebar({ user2 }) {
  const { user } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const [usernames, setUsernames] = useState();
  const [friends, setFriends] = useState([]);
  const [isLoading2, setIsLoading2] = useState(true);
  const [Active, setActive] = useState(0);

  useEffect(() => {
    if (!user) return null;

    setUsernames(user.name);
  }, [user]);

  const handleClick = (number) => {
    setActive(number);
  };

  useEffect(() => {
    const getFriends = async () => {
      setIsLoading2(true);
      try {
        const friendList = await axios.get(
          "http://localhost:5000/api/friends/" + user?._id
        );
        setFriends(friendList?.data);
        setIsLoading2(false);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user?.followings?.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to={`/anasayfa`} style={{ color: "black" }}>
            <li className="sidebarListItem">
              <HomeIcon style={{ marginRight: "15px" }} />
              <span className="sidebarListItemText"> Anasayfa</span>
            </li>
          </Link>
          <Link to={`/takipcilerin-paylasimi`} style={{ color: "black" }}>
            <li className="sidebarListItem">
              <GroupIcon style={{ marginRight: "15px" }} />
              <span className="sidebarListItemText">
                {" "}
                Takipçilerin paylaşımları
              </span>
            </li>
          </Link>
          <Link to={`/profil/${user?.name}`} style={{ color: "black" }}>
            <li className="sidebarListItem">
              <AssignmentIndIcon style={{ marginRight: "15px" }} />
              <span className="sidebarListItemText"> Profil</span>
            </li>
          </Link>
          <Link to={`/mesajlar`} style={{ color: "black" }}>
            <li className="sidebarListItem">
              <QuestionAnswerIcon style={{ marginRight: "15px" }} />
              <span className="sidebarListItemText"> Sohbetler</span>
            </li>
          </Link>
          <Link to={`/kaydedilenler`} style={{ color: "black" }}>
            <li className="sidebarListItem">
              <BookmarkIcon style={{ marginRight: "15px" }} />
              <span className="sidebarListItemText"> Kaydedilenler</span>
            </li>
          </Link>
          <Link to={`/profil/${user?.name}`} style={{ color: "black" }}>
            <li className="sidebarListItem">
              <LiveHelpIcon style={{ marginRight: "15px" }} />
              <span className="sidebarListItemText"> Sorular</span>
            </li>
          </Link>
        </ul>
        <button className="sidebarButton">Daha fazla..</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {user2 ? (
            <div className="chatOnline">
              <div className="chatOnlineWrapper">
                <div className=" chatOnlineText">Aktif Arkadaşlar</div>
                {onlineUsers?.length !== 0 ? (
                  <ChatOnline onlineUsers={onlineUsers} currentId={user?._id} />
                ) : (
                  <div className=" chatOnlineText2">
                    Şu anlık aktif takip ettiğiniz kişi yok...
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className=" chatOnlineText" style={{ marginBottom: "10px" }}>
                Takip ettiklerin
              </div>
              {isLoading2 ? (
                <Loading type="custom" />
              ) : (
                <Following currentId={user?._id} friends={friends} />
              )}{" "}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
