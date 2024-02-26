import Post from "../post/post";
import Share from "../share/share";
import "./feed.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../Loading/Loading";

export default function Feed({username,socket}) {
   const [posts, setPosts] = useState([]);
   const { user } = useContext(AuthContext);
   const [userid, setUserid] = useState();
   const [SearchText,setSearchText] = useState('');
   const [isLoading,setIsLoading] = useState(true);

   useEffect(() => {
    if (!user) return null;
    setUserid(user._id)
  }, )
  const handleChange = value =>{
    setSearchText(value);
    handleChange2();
      }

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
      const filterData = value =>{
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
          setPosts(posts)
        }
        else{
          const filteredData =posts.filter(item => {
            return Object.keys(item).some(key => {
            return item[key].toString();
            })
          })
          setPosts(filteredData);
          console.log(filteredData)
        }
      }
    useEffect(() => { 
     if(!SearchText  ){
      const fetchPosts = async () => {
        setIsLoading(true)

        const res =  await axios.post("http://localhost:5000/api/post/allpost");
        setPosts(
          res.data.sort((p1, p2) => {
            if(p1?.tarih && p1?.confirm==="1" && p2?.tarih && p2?.confirm==="1" ){
              return new Date(p2.tarih) - new Date(p1.tarih);
            }
            else{
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            }
            
          })
        );
        setIsLoading(false)

        };
      fetchPosts();
     }
    
    }, [SearchText,posts.length ]);

    
  return (
    <>
     
    
    <div className="feed">
      
      <div className="feedWrapper">

      
      {(!username || username === user.name) && <Share />}

       <div style ={{  placeContent:"center"}} className="searchbars">
       <input
             type = "text"
             placeholder="Kitap adı, şehir ya da kullanıcı ara..."
             className="searchInputs"
             onChange = {  handleChange2}
           />
         
       </div>     
       {
        posts.map((p) => (
          <Post key={p._id} post={p} />
        ))
      }
        
      </div>
    </div>
    
    </>

  );
}