import "./upper.css";
import { useState,useEffect,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from"axios";
import  Percent  from "@mui/icons-material/Percent";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Upper({allpost,totals}) {
  const { user } = useContext(AuthContext); 
  const [alluser, setAlluser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [allchats, setAllchats] = useState([]);
  const [total , setTotal] = useState(0);
  const [total2 , setTotal2] = useState(0);
  const [total3 , setTotal3] = useState(0);
  const [total4 , setTotal4] = useState(0);


  useEffect(()=>{
    const total2 = posts?.map((item) => parseInt(item.confirm))
    .reduce((a, b) => a + b, 0);
  setTotal2(total2);

},[posts])

useEffect(()=>{
 
const total3 = allchats?.map((item) => parseInt(item.last))
.reduce((a, b) => a + b, 0);
setTotal3(total3);
},[allchats])

useEffect(()=>{
 
  const total5 = alluser?.map((item) => item.role==="Üye")
  .reduce((a, b) => a + b, 0);
  setTotal4(total5);
  },[alluser])


  useEffect(() => {
   
    const getUsers = async () => {
      try {
        const userlist = await axios.post("/alluser"); 
        setAlluser(userlist.data); 
      } catch (err) {
        console.log(err);
      }

    };
    getUsers();
    const fetchPosts = async () => {
      const res =  await axios.post("http://localhost:5000/api/post/allpost");
      setPosts(res.data)
      };
    fetchPosts();
    const fetchChats = async () => {
      const res =  await axios.post("http://localhost:5000/api/chat/allchats");
      setAllchats(res.data)
      };
    fetchChats();
  }, [user]);
  
  return (
      <>
{
  allpost ? <div className="upper">
  <div className="upperItem2">
    <span className="upperTitle">Şikayet Edilen Gönderi sayısı</span>
    <div className="upperTextCont">
      <span className="upperText">{allpost.length}</span>
    </div>
  </div>
  <div className="upperItem2">
    <span className="upperTitle">Toplam şikayet sayısı</span>
    <div className="upperTextCont">
      <span className="upperText" style={{textAlign:"center"}}>{totals}</span>
    </div>
  </div>
</div>
 :
  <div className="upper">
      <div className="upperItem2">
        <span className="upperTitle">Toplam Kullanıcı Sayısı:</span>
        <div className="upperTextCont">
          <span className="upperText">{alluser.length}</span>
        </div>
        <span className="upperSub" style={{textAlign:"center"}}><b>Üye</b> Sayısı =  </span>
        <span className="upperSub"> {total4}<ArrowRightIcon fontSize="small" style={{fill:"#036919"}} /><ArrowRightIcon fontSize="small" style={{fill:"#036919"}} />(<Percent fontSize="small" sx={{color:"#036919"}} /><b>{((total4/alluser.length)*100).toFixed(0) }</b>)</span>

      </div>
      <div className="upperItem2">
        <span className="upperTitle">Toplam Gönderi Sayısı:</span>
        <div className="upperTextCont">
          <span className="upperText" >{posts.length}</span>
        </div>
        <span className="upperSub" style={{textAlign:"center"}}><b>Yayınlanan</b> Gönderi Sayısı =  </span>
        <span className="upperSub"> {total2}<ArrowRightIcon fontSize="small" style={{fill:"#036919"}} /><ArrowRightIcon fontSize="small" style={{fill:"#036919"}} />(<Percent fontSize="small" sx={{color:"#036919"}} /><b>{((total2/posts.length)*100).toFixed(0) }</b>)</span>

      </div>
      <div className="upperItem2">
        <span className="upperTitle">Toplam Mesajlaşma Sayısı:</span>
        <div className="upperTextCont">
          <span className="upperText" style={{textAlign:"center"}}>{allchats.length}</span>
        </div>
        <span className="upperSub" style={{textAlign:"center"}}><b>Kapatılan</b> Sohbet Sayısı =  </span>
        <span className="upperSub"> {total3}<ArrowRightIcon fontSize="small" style={{fill:"#036919"}} /><ArrowRightIcon fontSize="small" style={{fill:"#036919"}} />(<Percent fontSize="small" sx={{color:"#036919"}} /><b>{((total3/allchats.length)*100).toFixed(0) }</b>)</span>

      </div>
      
    </div>
    
}
    
    </>
  );
}