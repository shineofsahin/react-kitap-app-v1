import Topbar from "../../components/Topbar/topbar";
import Chat from "../../components/Chat2/Chat";
import MessageRightbar from "../../components/messagerightbar/MessageRightbar";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import "./Messenger.css";
import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import StarRating from "./StarRating";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function Messenger() {
  const { user, dispatch } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [chatCurr, setChatCurr] = useState([]);
  const [asd, setAsd] = React.useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messages2, setMessages2] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [qwe, setQwe] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [otheruser, setOtheruser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allOnlineUsers, setAllOnlineUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [son, setSon] = React.useState(true);
  const [sondurum, setSondurum] = useState();
  const [isRating, setIsRating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [followed, setFollowed] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);

  const scrollRef = useRef();
  const socket = useRef();
  const [onlineOtherUsers, setOnlineOtherUsers] = React.useState(false);
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getNotification", (data) => {
      setNotif((prev) => [...prev, data]);
    });
  }, []);
  console.log(notif);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const kullanici2 = currentChat?.members?.find(
      (member) => member !== user._id
    );
    const getUser = async () => {
      setIsLoading(true);
      if (kullanici2 !== null) {
        try {
          const res = await axios(
            "http://localhost:5000/api/?userId=" + kullanici2
          ); //...
          if (res === null) {
            setOtheruser(res.data);
            setIsLoading(false);
          } else {
            setOtheruser(res.data);
            setIsLoading(false);
          }
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getUser();
  }, [currentChat]);

  useEffect(() => {
    setFollowed(user?.followings?.includes(otheruser?._id));
  }, [otheruser]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user?.followings?.filter((f) => users.some((u) => u.userId === f))
      );
      setAllOnlineUsers(users.map((n) => n.userId));
    });
  }, [user]);

  useEffect(() => {
    const getChat = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/chat/" + user._id
        );
        setChats(
          res.data.sort((p1, p2) => {
            return new Date(p2.updatedAt) - new Date(p1.updatedAt);
          })
        );
        setAsd(true);
      } catch (err) {
        console.log(err);
      }
    };
    getChat();
  }, [user?._id, messages, arrivalMessage]);

  useEffect(() => {
    const getCurrChat = async () => {
      if (currentChat?._id && currentChat?.last === "1") {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/chat/get/" + currentChat?._id
          );
          setChatCurr(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getCurrChat();
    const getCurrChat2 = async () => {
      if (
        chatCurr?.deletelist?.length === 2 ||
        chatCurr?.deletelist?.length >= 2
      ) {
        try {
          const res4 = await axios.put(
            "http://localhost:5000/api/chat/deletes/" + currentChat?._id
          );
          setQwe(res4);
          setCurrentChat(null);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getCurrChat2();
  }, [isDeleting, chats]);

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
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, messages, arrivalMessage]);

  useEffect(() => {
    const likke = async () => {
      setIsRating(otheruser?.voters?.includes(user?._id));
    };
    likke();
  }, [otheruser?._id]);

  useEffect(() => {
    const getMessages2 = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/messages/" + currentChat?._id
        );
        setMessages2(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages2();
  }, [currentChat, arrivalMessage, newMessage]);

  const handleOver = async () => {
    if (son === true) {
      setSon(false);
    } else {
      setSon(true);
    }

    try {
      setSondurum("1");

      const packet2 = {
        lasts: sondurum,
        newMessage: "Konuşma sonlandırıldı.",
        lastmessagesender: "",
      };
      const res2 = await axios.put(
        `http://localhost:5000/api/chat/over/${currentChat._id}`,
        { packet2 }
      );
      setQwe(res2);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:5000/api/${otheruser._id}/unfollow`, {
          userId: user._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:5000/api/${otheruser._id}/follow`, {
          userId: user._id,
        });
        dispatch({ type: "FOLLOW", payload: otheruser._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };
  const handleDelete = async () => {
    try {
      const packet3 = {
        deletes: user._id,
      };
      const res2 = await axios.put(
        `http://localhost:5000/api/chat/delete/${currentChat._id}`,
        { packet3 }
      );
      setQwe(res2);
      setIsDeleting(!isDeleting);
    } catch (err) {
      console.log(err);
    }
    console.log(isDeleting);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      chatId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const packet = {
        newMessage: newMessage,
        lastmessagesender: user.name,
        lasts: sondurum,
      };
      const res2 = await axios.put(
        `http://localhost:5000/api/chat/${currentChat._id}`,
        { packet }
      );
      setQwe(res2);
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await axios.post("/messages", message);

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {}
  };
  useEffect(() => {
    setOnlineOtherUsers(allOnlineUsers?.includes(otheruser?._id));
  }, [allOnlineUsers, otheruser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?._id, messages2, newMessage, arrivalMessage]);

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      {
        handleSubmit(e);
      }
    }
  };
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className=" chatText">Sohbetler</div>
            <hr style={{ marginBottom: "0" }} />
            {chats.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Chat chat={c} currentUser={user} messages={messages} />
                <hr style={{ width: "75%", margin: "auto" }} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              isLoading ? (
                <Loading type="menu" />
              ) : (
                <>
                  <div className="otheruser">
                    <img
                      className="otherImg"
                      src={
                        otheruser?.picture
                          ? otheruser.picture
                          : PF + "noAvatar.png"
                      }
                      alt=""
                    />
                    <Link
                      to={`/profil/${otheruser?.name}`}
                      style={{ marginBottom: "auto", marginTop: "auto" }}
                    >
                      {otheruser?.name ? (
                        <div className="otherName">
                          {otheruser?.name.toUpperCase()}
                        </div>
                      ) : (
                        <div className="otherName" style={{ color: "#ac1111" }}>
                          Silindi
                        </div>
                      )}
                    </Link>
                    {otheruser?.city ? (
                      <div className="otherCity">- {otheruser?.city}</div>
                    ) : (
                      <div className="otherCity">- Şehir Belirtilmedi</div>
                    )}
                    <div className="otherStar">
                      {otheruser
                        ? [...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                              <button
                                type="button"
                                key={index}
                                className={
                                  index <=
                                  otheruser?.totalrating /
                                    otheruser?.voters?.length
                                    ? "on"
                                    : "off"
                                }
                              >
                                <i class="fa-solid fa-star"></i>
                              </button>
                            );
                          })
                        : null}
                      {otheruser ? "(" + otheruser?.voters?.length + ")" : null}
                    </div>
                    {otheruser ? (
                      <>
                        {onlineOtherUsers ? (
                          <>
                            {" "}
                            <div className="otherStatus">Çevrim içi</div>
                            <div className="otherOnline"></div>
                          </>
                        ) : (
                          <>
                            <div className="otherStatus">Çevrim dışı</div>
                            <div className="otherOnline2"></div>
                          </>
                        )}
                      </>
                    ) : null}

                    <div className="otherFollow">
                      {user?.name !== otheruser?.name &&
                        otheruser?.name &&
                        (followed ? (
                          <button
                            className="rightbarUnFollowButton"
                            onClick={handleClick}
                          >
                            {"  Takipten Çık    "}
                            <div style={{ marginLeft: "8px" }}>
                              {" "}
                              <GroupRemoveIcon />
                            </div>
                          </button>
                        ) : (
                          <button
                            className="rightbarFollowButton"
                            onClick={handleClick}
                          >
                            {"  Takip Et    "}{" "}
                            <div style={{ marginLeft: "8px" }}>
                              {" "}
                              <GroupAddIcon />
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                </>
              )
            ) : null}

            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.sender === user._id}
                        currentUser={user}
                        otherUser={otheruser}
                        currentChat={currentChat}
                        isRating={isRating}
                      />
                    </div>
                  ))}
                </div>
                {currentChat?.last === "0" && otheruser !== null ? (
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="Mesaj yaz.."
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => handleKeypress(e)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      <SendIcon />
                    </button>
                    <button
                      className="chatSubmitButton"
                      style={{ backgroundColor: "#ac1111", color: "white" }}
                      onClick={handleOver}
                    >
                      <b>Bitir</b>
                    </button>
                  </div>
                ) : isRating && otheruser !== null ? (
                  <div className="rating-styles">
                    <span className="rating-styles">
                      Kullanıcı değerlendirildi. Teşekkürler{" "}
                    </span>

                    <button
                      className="chatSubmitButton"
                      style={{
                        backgroundColor: "#ac1111",
                        color: "white",
                        marginLeft: "5px",
                      }}
                      onClick={handleDelete}
                    >
                      <DeleteIcon /> <b>{chatCurr?.deletelist?.length}/2 </b>
                    </button>
                  </div>
                ) : otheruser !== null ? (
                  <>
                    {" "}
                    <span className="rating-styles">
                      Sohbet kapatıldı. Lütfen kullanıcıyı değerlendirin:
                    </span>
                    <StarRating otheruser={otheruser} currentUser={user} />
                  </>
                ) : (
                  <span className="rating-styles">Kullanıcı silindi..</span>
                )}
              </>
            ) : (
              <div className="fancy3">
                <span className="noConversationText2">
                  Yeni sohbet başlatmak için sohbetlere ya da takip ettiğiniz
                  kişilere tıklayın...
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <div className=" chatText">Aktif Arkadaşlar</div>
            <hr />
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user?._id}
              setCurrentChat={setCurrentChat}
            />
            <div className=" chatFollowing">
              <div>
                <MessageRightbar
                  currentId={user?._id}
                  friends={friends}
                  setCurrentChat={setCurrentChat}
                />
              </div>

              <hr />
              <div className=" chatText2">Takip Ettiklerin</div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
