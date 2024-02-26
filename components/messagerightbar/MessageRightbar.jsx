import "./messagerightbar.css"
import axios from "axios";
import { useEffect, useState,useContext } from "react";
import React from 'react'
import {Link,Routes} from 'react-router-dom'
import Loading from "../Loading/Loading";

export default function MessageRightbar({chat, user, currentId, setCurrentChat, friends }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    
    
    const handleClick = async (user) => {
        console.log(user)
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
 
       { friends?.length !== 0 ? 
       setCurrentChat ?  friends.map((o) => (
       
      <div className="chat1" onClick={() =>handleClick(o)}>
        <div className="asy">
        <img
        className="chatImg1"
        src={ 
            o?.picture 
            ?  o.picture
            :  PF + "noAvatar.png"
        }
        alt=""
      />

        <div className="chatName1">{o?.name}</div>
        </div>
    
        </div> 
        
          )) :
       
       friends.map((o) => (
        <Link to={`/profil/${o?.name}`} style={{color:" rgb(0, 138, 30)"}}> 
      <div className="chat1" >
        <div className="asy">
        <img
        className="chatImg1"
        src={ 
            o?.picture 
            ?  o.picture
            :  PF + "noAvatar.png"
        }
        alt=""
      />

        <div className="chatName1">{o?.name}</div>
        </div>
    
        </div> 
       </Link>
        
          ))
        :
        <div className =" chatOnlineText2">
        Kimseyi takip etmiyorsun..
        </div>
        }
      </>

  )
}
 