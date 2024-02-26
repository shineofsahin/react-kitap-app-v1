import "./widget.css";
import { Visibility } from "@mui/icons-material";
import { useState,useEffect,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from"axios";
import ReactTimeAgo from 'react-time-ago'

export default function Widget() {

  const { user } = useContext(AuthContext); 
  const [alluser, setAlluser] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
   
    const getUsers = async () => {
      try {
        const userlist = await axios.post("/alluser"); 
        setAlluser( userlist.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })); 
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, [user]);
  
  return (
    <div className="widget">
      <span className="widgetTitle">En Son Üyeler</span>
      <ul className="widgetList">
      {alluser.map((user2) => (
          <li className="widgetListItem">
          <img
          src={ user2.picture ? user2.picture : PF + "noAvatar.png"}
          alt="Kullanici pp" className="widgetImg" />
          <span className="widgetUsername" style={{color:"#ac1111"}}>{user2.role}</span>
          <div className="widgetUser">
          <span className="widgetUsername">{user2.name}</span>
          </div>
          <span className="widgetUsername" style={{color:"#1c8018"}}>{user2.city}</span>
          <span className="widgetUsername">{user2.email}</span>
          <ReactTimeAgo  className="widgetUserTitle" date={user2.createdAt} locale="tr"/>
          <button className="widgetButton">
          <Visibility className="widgetIcon" />
          Gizle
          </button>
        </li>
      ))}
      </ul>
    </div>
  );
}