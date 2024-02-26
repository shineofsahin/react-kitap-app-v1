import Topbar from "../../components/Topbar/topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import PlaintFeed from "../../components/plaints/plaint";
import Rightbar from "../../components/rightbar/rightbar";
import "./plaint.css"

export default function homepage() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
      <Sidebar />
        <PlaintFeed/>
        <Rightbar/>
      </div>
    </>
  );
}