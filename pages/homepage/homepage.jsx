import Topbar from "../../components/Topbar/topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import "./homepage.css"
/*import { io } from "socket.io-client";
import { useEffect, useState, useContext,useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

*/

export default function Homepage() {

  


  return (    
    <>
      <Topbar />
      <div className="homeContainer">
      <Sidebar />
        <Feed />
        <Rightbar/>
      </div>
    </>
  );
}