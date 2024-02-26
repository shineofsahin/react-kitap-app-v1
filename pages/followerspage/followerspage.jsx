import Topbar from "../../components/Topbar/topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feedfollowers from "../../components/feedfollowers/feedfollowers";
import Rightbar from "../../components/rightbar/rightbar";

export default function followerspage() {
    return (
      <>
        <Topbar />
        <div className="homeContainer">
        <Sidebar />
        <Feedfollowers/>
        <Rightbar/> 
        </div>
      </>
    );
  }