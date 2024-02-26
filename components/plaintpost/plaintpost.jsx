import "./plaintpost.css";
import { MoreVert } from "@material-ui/icons";
import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { setCookie , isAuth, getCookie } from '../../helpers/auth';
//import { format } from "timeago.js";  
import {Link} from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'
/*import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import WarningIcon from "@material-ui/icons/Warning";
import ArrowRight from "@material-ui/icons/ArrowRight";*/
import { AuthContext } from "../../context/AuthContext";


export default function Plaintpost({ post }) {

  const [like,setLike] = useState(post.likes.length)
  const [status,setStatus] = useState(post.status.length)
  const [isLiked,setIsLiked] = useState(false)
  const [isStatus,setIsStatus] = useState(false)
  const [sat,setSat] = useState()
  const [user,setUser] = useState({})   
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [checked, setChecked] = React.useState(false);

  useEffect(() => { 
    const fetchUser = async () => {
      const token = getCookie('token');
      const res = await axios.get(`/user/${post.userId}`, {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      });  
      setUser(res.data);
      console.log(post.statuscount)
    };
    fetchUser()
  }, [post.userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/post/${post._id}`);
      window.location.reload();
    } catch (err) {}
  };
  const auth = async (e) => {
    e.preventDefault();
    try { 
      setCookie('post', post._id);

    } catch (err) {}
  };

  useEffect(() => {
      const likke = async () => {
        setIsLiked(post.likes.includes(user._id));
    };
    likke();
    const statuss = async () => {
      setIsStatus(post.status.includes(user._id));
  };
  statuss();
  }, [currentUser._id, post.likes,post.statuscount]);


 

  const likeHandler =()=>{
    try {
      axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
   
  }
  const warnHandler =()=>{
    try {
      axios.put("/post/" + post._id + "/stat", { userId: currentUser._id });
    } catch (err) {}
    setStatus(isStatus ? status - 1 : status + 1);
    setIsStatus(!isStatus);
   window.location.reload()
  }


  return (
    <>
  
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profil/${user.name}`}>
            <img
              className="postProfileImg"
              src={ user.picture
                ?  user.picture
                : PF + "noAvatar.png"}
              alt=""
            /> 
            </Link>
            <Link to={`/profil/${user.name}`}> 
            <div className="postUsername">
              {user.name}
            </div>
            </Link>
            
            <span className="postCity">
              {user.city}
            </span>
           
            <ReactTimeAgo  className="postDate" date={post.createdAt} locale="tr"/>
          </div>
          
           {( post.userId === currentUser._id) || isAuth().role === 'admin' ?  <div class="dropdown">
  <button class="dropbtn"> x</button>
  <div class="dropdown-content" >
    <button  class="dropbtn" onClick={auth} >
    <Link   to={`/post/edit/${post._id}`} >   Güncelle
            </Link>
    </button>
 
            <button class="dropbtn" onClick={submitHandler} style = {{backgroundColor:"#7a2e2e", color :"white", alignItems:"center"}}>  Sil</button>
        
     </div>
</div> : <div class="dropdown">
  <button class="dropbtn">x </button>
  <div class="dropdown-content" >
  { (post.statuscount.includes(currentUser._id)) ?
    <button  class="dropbtn" >
    <div onClick={warnHandler}> Şikayeti Kaldır !</div>
    
    </button>:
    <button  class="dropbtn" >
    <div onClick={warnHandler}> Şikayet Et!</div>
    
    </button>
}
     </div>
</div> }
 
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={ post.img} alt="" />
        </div>
      
        <div className="postBottom">
          <div className="postBottomLeft">
              Şikayette bulunanlar  :   
        {
          post.statuscount.map((number) =>
         <>
       +  <Link   to={`/profil/${number}`} >{number} 
            </Link>
           <tab></tab>
         </>
         
          
        )
        }
              


 
         
          </div>
        </div>
      </div>
    </div>
    </>
  );
}