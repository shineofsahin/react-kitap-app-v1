import "./message.css";
import ReactTimeAgo from 'react-time-ago'
import axios from "axios";
import { useEffect, useState,useRef } from "react";
import {Link, Navigate , Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Message({ message, own, currentUser, otherUser, currentChat }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [chatuser, setChatuser] = useState(null);
  const [chatuser1, setChatuser1] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState([0]);
  const [messages, setMessages] = useState([]);
  const [qwe, setQwe] = useState([]);

 

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/messages/${message._id}`);
    } catch (err) {}
  };


  const submitHandler2 = async (e) => {
    e.preventDefault();
    toast.error('Mesaj başarıyla silindi..');
    const packet ={
      newMessage: "Bu mesaj silindi!",
      lastmessagesender:currentUser.name
    }
    setArrivalMessage(arrivalMessage + 1)
    try {  
      await axios.put(`http://localhost:5000/api/messages/edit/${message._id}`).then(res => {       
    }
    
    )
    } catch (err) {console.log(err)}

    try {
      const res2 = await axios.put(`http://localhost:5000/api/chat/${currentChat._id}`,{packet});
      setQwe(res2)
    } catch (err) {console.log(err)}
  };

  return (
    <>
   
    
    {
      own ? 
      <div className= "message own">
      <div className="messageTop">
     
     {message.text === "nullQxs" ? <div className="messageText">  <div className="deleteMessage"> Bu mesaj silindi !</div> </div> : <>
  
  <button class="deleteicon" onClick={submitHandler2} > { currentChat?.last !== "0" ? null:<DeleteIcon fontSize="small" style={{fill:"#ac1111"}}/> }  </button>
<p className="messageText">{message.text}</p></>   }
      
        <Link to={`/profil/${currentUser.name}`}>
        <img
          className="messageOwnImg"
          src={  currentUser?.picture ? currentUser.picture : PF +"noAvatar.png" }   
          alt=""
        />
         </Link>
      </div>
      <ReactTimeAgo  className="messageBottom" date={message.createdAt} locale="tr"/>
    </div> :

    <div className= "message">
    <div className="messageTop">
    <Link to={`/profil/${otherUser?.name}`}>
      <img
        className="messageImg"
        src={ otherUser?.picture ? otherUser.picture : PF +"noAvatar.png"}   
        alt=""
      />
      </Link>
      {
        message.text === "nullQxs" ?<div className="messageText">  <div className="deleteMessage2"> Bu mesaj silindi !</div> </div> :
        <p className="messageText">{message.text}</p>
     }
     
    </div>
    <ReactTimeAgo  className="messageBottom" date={message.createdAt} locale="tr"/>
  </div>
    }
    </>
  );
}