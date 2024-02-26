import Topbar from "../../components/Topbar/topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminFeed from "../../components/adminfeed/adminfeed";
import Rightbar from "../../components/rightbar/rightbar";
import "./adminpage.css"

export default function adminpage() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
      <Sidebar />
        <AdminFeed/>
        <Rightbar/>
      </div>
    </>
  );
}