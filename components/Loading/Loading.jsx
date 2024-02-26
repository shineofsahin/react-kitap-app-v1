import React from "react";
import "./loading.css";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Loading({ type }) {
  const COUNTER = 1;
  const FeedSkeleton = () => (
    <div className="postSk">
         
         <div className="postSkInfo1">
        <div className="postSkDetail1">
        <div className="postSkAvatar"></div> 
          <div className="postSkText se"></div><ArrowRightIcon fontSize="small" style={{fill:"#036919",marginTop:"auto",marginBottom:"auto"}} />
          <div className="postSkText se"></div><ArrowRightIcon fontSize="small" style={{fill:"#036919",marginTop:"auto",marginBottom:"auto"}} />
          <div className="postSkText se"></div>
        
        </div>
      </div>
   
      <div className="postSkInfo1">
        <div className="postSkDetail">
          <div className="postSkText"></div>
          <div className="postSkText sm"></div>
        </div>
      </div>
      <div className="postSkImg"></div>
    </div>
  );

  const TopSkeleton = () => (
    <div className="topSk">
      <div className="topSkIcon"></div>
      <div className="topSkIcon"></div>
      <div className="topSkIcon"></div>
      <div className="topSkImg"></div>
    </div>
  );

  const MenuSkeleton = () => (
  
    <div className="postSkInfo1">
        <div className="postSkDetail1">
        <div className="postSkAvatar"></div> 
          <div className="postSkText se"></div><div  style={{fill:"#036919",marginTop:"auto",marginBottom:"auto"}} >-</div>
          <div className="postSkText se"></div>
          <div className="postSkText st"></div>
          <div className="postSkText onl"></div> 
          <div className="postSkText foll"></div> 

        </div>
      </div>
    
  );
/*
  const Circle = () => (
    <div className="circle">
      <CircularProgress />
    </div>
  );
*/
  const CustomLoading = () => (
    <div className="custom">
      <div className="balls">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
      
    </div>
  );

  if (type === "feed") return Array(COUNTER).fill(<FeedSkeleton />);
  if (type === "top") return <TopSkeleton />;
  if (type === "menu") return <MenuSkeleton />;
  if (type === "custom") return <CustomLoading />;
}