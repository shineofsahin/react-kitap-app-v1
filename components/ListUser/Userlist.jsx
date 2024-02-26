import "./userlist.css";
import { DeleteOutline, DataArraySharp } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function UserList() {
  const [alluser, setAlluser] = useState([]);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userlist = await axios.post("/alluser");
        setAlluser(userlist.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete/${id}`);
      setAlluser(alluser.filter((item) => item.id !== id));
    } catch (err) {}
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "role", headerName: "Rolü", width: 60 },
    {
      field: "user",
      headerName: "Kullanıcı",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser1">
            <img
              className="userListImg"
              src={
                params?.row?.picture ? params.row.picture : PF + "noAvatar.png"
              }
              alt="pp"
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "city", headerName: "Şehir", width: 90 },
    {
      field: "email",
      headerName: "E-posta",
      width: 200,
    },
    {
      field: "totalratingss",
      headerName: "Ort. oy",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="userListUser1">
            {params.row.totalrating / params.row.voters.length}
          </div>
        );
      },
    },
    {
      field: "totalratin",
      headerName: "Oylayan kişi S.",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="userListUser1">
            {"(" + params.row.voters.length + ")"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "İşlem",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList2">
      <DataGrid
        rows={alluser}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
