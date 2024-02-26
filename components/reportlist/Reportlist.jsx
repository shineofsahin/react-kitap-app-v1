import "./Reportlist.css";
import { DeleteOutline, DataArraySharp } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Upper from "../../components/upper/Upper";

import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { setCookie, isAuth, getCookie } from "../../helpers/auth";

export default function Reportlist() {
  const [allpost, setAllpost] = useState([]);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [total, setTotal] = React.useState(0);

  const auth = async (id) => {
    try {
      setCookie("post", id);
      <Link to={`/post/edit/${id}`}></Link>;
    } catch (err) {}
  };

  const submitHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/post/${id}`);
      setAllpost(allpost.filter((item) => item.id !== id));
    } catch (err) {}
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.post("http://localhost:5000/api/post/sikayetler");
      setAllpost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [user]);

  const columns = [
    { field: "_id", headerName: "ID", width: 210 },
    {
      field: "name",
      headerName: "Gönderi sahibi",
      width: 120,
    },
    { field: "kitaptur", headerName: "Türü", width: 90 },
    {
      field: "user",
      headerName: "Gönderi",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="ReportlistUser1">
            <img
              className="ReportlistImg"
              src={params?.row?.img ? params.row.img : PF + "noAvatar.png"}
              alt="Kitap"
            />
            {params.row.desc}
          </div>
        );
      },
    },

    {
      field: "likess",
      headerName: "Beğeni Sayısı",
      width: 120,
      cellStyle: { color: "red", "background-color": "green" },
      renderCell: (params) => {
        return (
          <div className="ReportlistUser1" style={{ alignItems: "center" }}>
            {params.row.likes.length}
          </div>
        );
      },
    },
    {
      field: "stat",
      headerName: "Şikayet Sayısı",
      cellStyle: { color: "red", "background-color": "green" },
      width: 130,
      renderCell: (params) => {
        return (
          <div
            className="ReportlistUser1"
            style={{ alignItems: "center", color: "#ac1111" }}
          >
            {params.row.statuscount.length}
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
            <Link to={`/post/edit/${params.row._id}`}>
              <button className="ReportlistEdit" onClick={auth(params.row._id)}>
                Düzenle
              </button>
            </Link>
            <DeleteOutline
              className="ReportlistDelete"
              onClick={() => submitHandler(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="Reportlist2">
        <Upper allpost={allpost} totals={total} />
        <DataGrid
          rows={allpost}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          checkboxSelection
          onStateChange={() => {
            const total = allpost
              .map((item) => item.statuscount.length)
              .reduce((a, b) => a + b, 0);
            console.log(total);
            setTotal(total);
          }}
        />
      </div>
    </>
  );
}
