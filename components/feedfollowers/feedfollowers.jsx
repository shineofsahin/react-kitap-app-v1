import Post from "../post/post";
import Share from "../share/share";
import "./feedfollowers.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feedfollowers({username}) {
   const [posts, setPosts] = useState([]);
   const { user } = useContext(AuthContext);
   const [userid, setUserid] = useState();
   const [SearchText,setSearchText] = useState('');
   const [profil,setProfil] = useState('');

   useEffect(() => {
    if (!user) return null;
    setUserid(user._id)
  }, )

  const handleChange2 = (event) =>{
    const Sac = event.target.value;
    setSearchText(Sac)
     console.log(Sac)
     const res =  axios.get(`http://localhost:5000/api/post/search/${Sac}`).then(resp =>{
       setPosts(
        resp.data
       )
     }
      
    
     );
    
        }
    useEffect(() => { 
   
    const fetchPosts = async () => {
        const res = username
        ? setProfil("1") || await axios.get("http://localhost:5000/api/post/profil/" + username)
        : setProfil("0") || await axios.get("http://localhost:5000/api/post/timeline/" + userid);
    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );

    };
    fetchPosts();
    }, [username, userid]);

  return (
    <div className="feed">
      <div className="feedWrapper"> 
      {(!username || username === user.name) && <Share />}
  {  profil==="1"? null :
  <div style ={{  placeContent:"center"}} className="searchbars">
  <input
        type = "text"
        placeholder="Kitap adı, şehir ya da kullanıcı ara..."
        className="searchInputs"
        onChange = {  handleChange2}
      />
    
  </div>
  
  }

      {posts.length === 0 ? <h2 style={{textAlign:"center", marginTop:"1.75rem",color:"#0e9174"}
      }> Gönderi bulunamadı...</h2>:  posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
       
      </div>
    </div>
  );
}