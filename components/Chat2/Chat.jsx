import "./chat.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import React from "react";

export default function Chat({ chat, currentUser, messages }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = chat.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      if (friendId !== null) {
        try {
          const res = await axios(
            "http://localhost:5000/api/?userId=" + friendId
          ); //...
          if (res === null) {
            setUser(null);
          } else {
            setUser(res.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    getUser();
  }, [currentUser, chat]);

  return (
    <>
      <div className="chat">
        <img
          className="chatImg"
          src={user?.picture ? user.picture : PF + "noAvatar.png"}
          alt=""
        />

        <div>
          {user?.name ? (
            <div className="chatName">{user?.name}</div>
          ) : (
            <div
              className="chatName"
              style={{ color: "#ac1111", fontWeight: "bolder" }}
            ></div>
          )}

          {chat.lastmessagesender === "" && chat.text === "" ? (
            <div className="chatName1">Sohbet oluşturuldu.</div>
          ) : chat.lastmessagesender === "" &&
            chat.text === "Konuşma sonlandırıldı." ? (
            <div className="chatName2">Sohbet Kapatıldı.</div>
          ) : chat?.lastmessagesender === currentUser.name ? (
            <div className="chatLastMessage">
              <b>Sen</b>: {chat?.text} -{" "}
              <ReactTimeAgo
                className="chatLastMessageDate"
                date={chat?.updatedAt}
                locale="tr"
              />{" "}
            </div>
          ) : (
            <>
              <div className="chatLastMessage">
                <b>{chat?.lastmessagesender}</b>: {chat?.text} -{" "}
                <ReactTimeAgo
                  className="chatLastMessageDate"
                  date={chat?.updatedAt}
                  locale="tr"
                />{" "}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
