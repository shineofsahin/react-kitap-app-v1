import axios from "axios";
import { useEffect, useState } from "react";
import "./chatonline.css";

import React from 'react'

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
      const getFriends = async () => {
        const res = await axios.get("/friends/" + currentId);
        setFriends(res.data);
      };
  
      getFriends();
    }, [currentId]);
  
    useEffect(() => {
      setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
    }, [friends, onlineUsers]); 
  
    const handleClick = async (user) => {
      try {
        const res = await axios.get(
          `/chat/find/${currentId}/${user._id}`
        );
     if(res.data === null){
      const rec = user._id;
        res = await axios.post(
        `http://localhost:5000/api/chat/${currentId}/${rec}`
       )
     } 
        setCurrentChat(res.data);
      } catch (err) { 
        console.log(err);
      }
    };
  
  return (
    <>
 
   {  onlineUsers?.length !== 0 ?  <div className="chatOnline">
        {onlineFriends.map((o) => (
       <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={
              o?.picture
                ?  o.picture
                : PF + "noAvatar.png"
            }
            alt=""
          />
          <div className="chatOnlineBadge"></div> 
        </div>
        <span className="chatOnlineName">{o?.name}</span>
              </div>
     ))}
  </div> :<div className =" chatOnlineText2">
    Şu anlık, aktif takip ettiğiniz kişi yok...
    </div>
   } 
    
   
  </>

  )
}
