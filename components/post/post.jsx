import "./post.css";
import { useState, useEffect,useContext,useRef } from "react";
import axios from "axios";
import { setCookie , isAuth, getCookie } from '../../helpers/auth';
import {Link} from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Bookmark from '@mui/icons-material/Bookmark';
import Loading from "../Loading/Loading";


export default function Post({ post }) {

  const [like,setLike] = useState(post.likes?.length)
  const [bookmarked,setBookmarked] = useState(post.bookmark?.length)
  const [isBookmarked,setIsBookmarked] = useState(false)
  const [status,setStatus] = useState(post.status?.length)
  const [isLiked,setIsLiked] = useState(false)
  const [isStatus,setIsStatus] = useState(false)
  const [user,setUser] = useState({})   
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const socket = useRef();
  const [isLoading,setIsLoading] = useState(true);
  const [textChange, setTextChange] = useState('Yayınla');

  useEffect(() => { 
    const fetchUser = async () => {
      setIsLoading(true)

      const token = getCookie('token');
      const res = await axios.get(`/user/${post.userId}`, {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      });  
      setUser(res.data);
      setIsLoading(false)

    };
    fetchUser()
  }, [post.userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/post/${post._id}`);
  
    } catch (err) {}
  };

  
  const auth = async (e) => {
    e.preventDefault();
  
    try { 
      setCookie('post', post._id);
      <Link  to={`/post/edit/${post._id}`} ></Link>

    } catch (err) {}
  };

  useEffect(() => {
    
      const likke = async () => {
        setIsLiked(post.likes.includes(currentUser?._id));
    }; 
    likke();
    const statuss = async () => {
      setIsStatus(post.status.includes(currentUser?._id));
  };
  statuss();
  const bookmarks = async () => {
    setIsBookmarked(post.bookmark.includes(currentUser?._id));
};
bookmarks();
  }, [currentUser?._id]);

  const confirmPost = async (id,confirms) => {

    try { 
      if(confirms ==="0"){
        setTextChange('Yayınlandı');
        const stat = "1";
        await axios.put(`http://localhost:5000/api/post/confirm/${id}/${stat}`);
        await axios.put(`http://localhost:5000/api/post/${id}`,{tarih:Date.now()});

      }
    else{
      const stat ="0";
      await axios.put(`http://localhost:5000/api/post/confirm/${id}/${stat}`);
   
    }
    } catch (err) {}
  };

useEffect(() =>{
  socket.current = io("ws://localhost:8900");

},[])

const bookmarkHandler =()=>{
  try {
    axios.put("/post/" + post._id + "/bookmark", { userId: currentUser._id });
  } catch (err) {}
  setBookmarked(isBookmarked ? bookmarked - 1 : bookmarked + 1);
  setIsBookmarked(!isBookmarked);

}
  

  const likeHandler =(type)=>{
    try {
      axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    socket.current.emit("sendNotification", {
      senderName: currentUser._id,
      receiverName: user._id,
      type,
    });
    
  }
  const warnHandler =()=>{
    try {
      axios.put("/post/" + post._id + "/stat", { name: currentUser.name });
    } catch (err) {}
    setStatus(isStatus ? status - 1 : status + 1);
    setIsStatus(!isStatus);
   
  }
  

  return (
    <>
  {
    post?.confirm === "1"  ? 
   
    <div className="post">
     
    <div className="postWrapper">
    {isLoading ? 
      <Loading type="feed" />:
      <> <div className="postTop">
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
        <Link to={`/profil/${user?.name}`}> 
        <div className="postUsername">
          {user?.name}
        </div>
        </Link>
        <div className="postUsername">
         
          {[...Array(5)].map((star, index) => {
      index += 1;
      return (
        <button
          type="button"
          key={index}
          className={index <= (user.totalrating/user?.voters?.length) ? "on" : "off"}
        >
          <i class="fa-solid fa-star"></i>
        </button>
      );
    })}
     {"("+user?.voters?.length+")"}
        </div>
        <ArrowRightIcon fontSize="large" style={{fill:"#036919"}} />
        <span className="postCity">
          {user.city}
        </span>
        <ArrowRightIcon fontSize="large" style={{fill:"#036919"}} />

        <span className="postCity">
          {post.kitaptur}
        </span>
        <ArrowRightIcon fontSize="medium" style={{fill:"#036919"}} />
{post?.tarih ?   <ReactTimeAgo  className="postDate" date={post.tarih} locale="tr"/>:  <ReactTimeAgo  className="postDate" date={post.createdAt} locale="tr"/> }
      </div>
       {
         isBookmarked ?<button className ="bookmark"  onClick={bookmarkHandler}>< Bookmark/> </button> :   <button className ="bookmark" onClick={bookmarkHandler}><BookmarkBorderIcon/> </button>
       }
     

{( post.userId === currentUser?._id) || isAuth().role === 'admin' ?  <div class="dropdown">
<button class="dropbtn"> <MoreVertIcon style={{fill:"#036919"}}/> </button>
<div class="dropdown-content" >
<button  class="dropbtns" onClick={auth} >
<Link  to={`/post/edit/${post._id}`}   > <EditIcon style={{fill:"#036919",marginRight:"5px"}}/>Güncelle </Link> 
     
</button>

        <button class="dropbtns" onClick={submitHandler}> <DeleteIcon style={{fill:"#ac1111",marginRight:"5px"}}/> Sil </button>
    
 </div>
</div> : <div class="dropdown">
<button class="dropbtn"> <MoreVertIcon style={{fill:"#036919"}}/></button>
<div class="dropdown-content" >
{ isStatus ?
<button  class="dropbtns" >
<div onClick={warnHandler}><WarningAmberIcon style={{fill:"#22990a",marginRight:"5px"}}/> Şikayeti <b>Kaldır</b> !</div>

</button>:
<button  class="dropbtns" >
<div onClick={warnHandler}> <WarningIcon style={{fill:"#ad8e03",marginRight:"5px"}}/> Şikayet Et!</div>

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
        <img className="likeIcon" src={`${PF}like.png`} onClick={() =>likeHandler(1)} alt="" />
        <span className="postLikeCounter">{like}</span>
      </div>
    </div></>
     }  
     
    </div>
  </div>
  
  
  :
  
 
  (user?._id === currentUser?._id) || isAuth().role === 'admin' ? <>
  
  <div className="post2"> 
  
    <div className="postWrapper">
    {
         isLoading ? 
         <Loading type="feed" />:
         <>
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
          <Link to={`/profil/${user?.name}`}> 
          <div className="postUsername">
            {user?.name}
          </div>
          </Link>
          <div className="postUsername">
           
            {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (user.totalrating/user?.voters?.length) ? "on" : "off"}
          >
            <i class="fa-solid fa-star"></i>
          </button>
        );
      })}
       {"("+user?.voters?.length+")"}
          </div>
          <ArrowRightIcon fontSize="large" style={{fill:"#036919"}} />
          <span className="postCity">
            {user.city}
          </span>
          <ArrowRightIcon fontSize="large" style={{fill:"#036919"}} />

          <span className="postCity">
            {post.kitaptur}
          </span>
          <ArrowRightIcon fontSize="medium" style={{fill:"#036919"}} />

          <ReactTimeAgo  className="postDate" date={post.createdAt} locale="tr"/>
        </div>
       

{( post.userId === currentUser?._id) || isAuth().role === 'admin' ?  <div class="dropdown">
<button class="dropbtn"> <MoreVertIcon style={{fill:"#036919"}}/> </button>
<div class="dropdown-content" >
  <button  class="dropbtns" onClick={auth} >
  <Link  to={`/post/edit/${post._id}`}   > <EditIcon style={{fill:"#036919",marginRight:"5px"}}/>Güncelle </Link> 
       
  </button>

          <button class="dropbtns" onClick={submitHandler}> <DeleteIcon style={{fill:"#ac1111",marginRight:"5px"}}/> Sil </button>
      
   </div>
</div> : <div class="dropdown">
<button class="dropbtn"> <MoreVertIcon style={{fill:"#036919"}}/></button>
<div class="dropdown-content" >
{ isStatus ?
  <button  class="dropbtns" >
  <div onClick={warnHandler}><WarningAmberIcon style={{fill:"#22990a",marginRight:"5px"}}/> Şikayeti <b>Kaldır</b> !</div>
  
  </button>:
  <button  class="dropbtns" >
  <div onClick={warnHandler}> <WarningIcon style={{fill:"#ad8e03",marginRight:"5px"}}/> Şikayet Et!</div>
  
  </button>
}
   </div>
</div> }

      </div>
      <div className="postCenter">
        <span className="postText">{post?.desc }</span>
      {textChange ==="Yayınla" ?  <span className="postText2">YÖNETİCİ ONAYINA SUNULDU, HENÜZ YAYINLANMADI...</span>:null}
        {isAuth().role==="admin" ? <button className="postText3"  onClick={() =>confirmPost(post._id,post.confirm)}>{textChange}</button>:null}
        <img className="postImg" src={ post.img} alt="" />
      </div>
      </> }
    </div>
  
  </div></> :null
  }
    
    
    </>
  );
}