import Topbar from "../../components/AdminTopbar/Topbar";
import Sidebar from "../../components/AdminSidebar/Sidebar";
import Listuser from "../../components/ListUser/Userlist";
import Main from "../../components/Main/Main";
import ListPost from "../../components/booklist/Booklist";
import Reportlist from "../../components/reportlist/Reportlist";
import Reportuser from "../../components/Reportuser/Reportuser";



import AdminRoute from '../../Routes/AdminRoute';
import { BrowserRouter as Router, Routes } from "react-router-dom";

import "./AdminDashboard.css";

export default function AdminDashboard() {

    return (
      <>
      <Topbar />
      <div className="container11">
      <Sidebar/>
      <Routes>
        <AdminRoute exact path="/adminpanel">
          <Main/>
         
        </AdminRoute>

        <AdminRoute  path="/kullanicilar">
          <Listuser/>
        </AdminRoute>

        <AdminRoute  path="/gonderiler">
          <ListPost/>
        </AdminRoute>

        <AdminRoute  path="/gonderi-sikayetler">
          <Reportlist/>          
        </AdminRoute>

        <AdminRoute  path="/kullanici-sikayetler">
          <Reportuser/>          
        </AdminRoute>

        
        </Routes>
      </div>
      </>
    );
  }