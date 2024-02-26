import React from "react";
import "./topbar.css";
import { useState,useEffect,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Topbar() {

  const { user } = useContext(AuthContext); 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Elden ele kitap/Admin</span>
        </div>
        <div className="topRight">
         
          <div className="topbarIconContainer">
          </div>
          <img  src={ user.picture ? user.picture : PF + "noAvatar.png"} alt="" className="topAvatar" />
          <div style={{fontWeight:"500", marginLeft:"15px"}}>
          {user.name.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}