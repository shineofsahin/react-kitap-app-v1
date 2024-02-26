import "./profile.css";
import Topbar from "../../components/Topbar/topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feedfollowers from "../../components/feedfollowers/feedfollowers";
import Rightbar from "../../components/rightbar/rightbar";
import {useState, useEffect } from "react";
import axios from "axios";
import { isAuth, getCookie } from '../../helpers/auth';
import {useParams } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

export default function Profile() {
  const [users,setUsers] = useState({})   

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;


  useEffect(() => {  
    const fetchUser = async () => {
      const token = getCookie('token'); 
      const res = await axios.get(`http://localhost:5000/api/?username=${username}`);   
      setUsers(res.data);
 
    };
    fetchUser()
    

  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        
        <Sidebar user2={users} />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src= {  users.coverPicture 
                  ? /*PF + */users.coverPicture
                  : PF + "noAvatar.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={ /*PF + */ users.picture
                  ? users.picture
                  : PF + "noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{users.name}</h4>
                <span className="profileInfoDesc">{users.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
          <Feedfollowers username={username} />
            <Rightbar user={users}/>
          </div>
        </div>
      </div>
    </>
  );
}