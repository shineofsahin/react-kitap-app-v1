import Upper from "../../components/upper/Upper";
import "./main.css";
import Widget from "../../components/widgetsm/Widget";
import { AuthContext } from "../../context/AuthContext";
import axios from"axios";
import React,{ useState,useEffect,useContext } from "react";
import Chart from "../../components/Chart/Chart";


export default function Main() {
  const { user } = useContext(AuthContext); 
  const [allpost, setAllpost] = useState([]);
  useEffect(() => {
   
    const getPosts = async () => {
      try {
        const postlist = await axios.post("/post/allpost"); 
        setAllpost(postlist.data); 
      } catch (err) {
        console.log(err);
      }

    };
    getPosts();
  }, [user]);
  return (
    <div className="main">
      <Upper />
      <div className="mainWidgets">
        <Widget/>
      </div>
      
      <Chart title="Kitap Gönderileri" data={allpost} grid dataKey="likes.length"/>
    </div>
  );
}