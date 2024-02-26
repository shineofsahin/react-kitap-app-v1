import "./booklist.css";
import { DeleteOutline } from "@mui/icons-material";
import  {DataGrid}  from '@mui/x-data-grid';

import { Link } from "react-router-dom";
import React,{ useState,useEffect,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from"axios";
import { setCookie , isAuth, getCookie } from '../../helpers/auth';
import CheckTwoToneIcon from '@mui/icons-material/Check'
import CloseTwoTone from '@mui/icons-material/Close'
import Chart from "../Chart/Chart"
export default function BookList() {
  const [allpost, setAllpost] = useState([]);
  const { user } = useContext(AuthContext); 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  




  const auth = async (id) => {
    try { 
      setCookie('post', id);
      <Link  to={`/post/edit/${id}`} ></Link>

    } catch (err) {}
  };
  const confirmPost = async (id,confirms) => {
    try { 
      if(confirms ==="0"){
        const stat = "1";
        await axios.put(`http://localhost:5000/api/post/confirm/${id}/${stat}`);
        setAllpost(allpost);
      }
    else{
      const stat ="0";
      await axios.put(`http://localhost:5000/api/post/confirm/${id}/${stat}`);
      setAllpost(allpost);
    }
    } catch (err) {}
  };
  const submitHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/post/${id}`);
      setAllpost(allpost.filter((item) => item._id !== id));
    } catch (err) {}
  };
 
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
            <div className="bookListUser1">
              <img className="bookListImg"src={ params?.row?.img ? params.row.img : PF + "noAvatar.png"} alt="Kitap" />
              {params.row.desc}
            </div>
          );  
        },
      },
  
    {
      field: "likess",
      headerName: "Beğeni Sayısı",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="bookListUser1" style={{alignItems:"center"}}>
          {params.row.likes.length}
          </div>
        );
      },
    },
    {
      field: "confirms",
      headerName: "Paylaşım durumu",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="bookListUser1" style={{alignItems:"center"}}>
          {params.row.confirm === "0" ? <CloseTwoTone sx={{color:"#ac1111"}} />  :  <CheckTwoToneIcon sx={{color:"#01773e"}}/> }
          </div>
        );
      },
    },
  

    {
      field: "action",
      headerName: "İşlem",
      width: 270,
      renderCell: (params) => { 
        return (
          <>
            {params.row.confirm==="0" ? 
            <button className="bookListDeploy"  onClick={() =>confirmPost(params.row._id,params.row.confirm)}>Yayınla</button>
            :
            <button  className="bookListUndeploy" onClick={() =>confirmPost(params.row._id,params.row.confirm)}>Yayından Kaldır</button>
            }

            <Link to={`/post/edit/${params.row._id}` }>
              <button className="bookListEdit" onClick={auth(params.row._id)}>Düzenle</button>
            </Link>
            <DeleteOutline
              className="bookListDelete"
              onClick={() => submitHandler(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="bookList2">
      <DataGrid
        rows={allpost}
        disableSelectionOnClick
        columns={columns}
        getRowId ={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
      <Chart title="Kitap Gönderileri" data={allpost} grid dataKey="likes.length"/>
    </div>
  );
}