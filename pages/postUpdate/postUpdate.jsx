import React, { useState, useEffect } from 'react';
import {Link, Navigate , Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { postauthenticate,getCookie, signout } from '../../helpers/auth';
import Topbar from "../../components/Topbar/topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import {storage} from '../../firebase';

const PostUpdate = ({ history }) => {
  const [image,setImage] = useState(null);
  const [progress,setProgress] = useState(0);

  const [urls1,setUrls1] = useState(null);
 
  const [showModal, setShowModal] = React.useState(false);
    const [formData, setFormData] = useState({
        desc: '',
        img: '',
        id: '',
        textChange: 'Güncelle',
      });
      
  useEffect(() => {
    loadPost();
    console.log(img)
  }, []);

  const loadPost = () => {
    const _id = getCookie('post'); 
    const token = getCookie('token'); 
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${_id}`,
      {
        headers: { 
            Authorization: `Bearer ${token}`
          }
      })
      .then(res => {
        const { desc,img,textChange } = res.data;
        setFormData({ ...formData, desc,img});
      })
      .catch(err => {
        toast.error(` ${err.response.statusText}`);
        if (err.response.status === 401) { 
          signout(() => {
            history.push('/login');
          });
        }
      });
  };
 
  const { desc,img } = formData;
  const handleChange2 = text => e => {
    if(e.target.files[0]){
    setImage(e.target.files[0]);
    console.log(formData)
    console.log(image)
    
    }
     };
    
     const handleUpload2 = e => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed", snapshot => {
      const progress = Math.round (
        (snapshot.bytesTransferred / snapshot.totalBytes)*100
      );
      setProgress(progress)
    }, error =>  {
      console.log(error);
    },
    () => {
      storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(url => {
        setImage(url)
        setUrls1(url);
        console.log(url)
      });
    }
    );
       };
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleChange3 = text => e => {
    setImage(e.target.files[0]);
  }
  const handleSubmit = e => {
    const _id = getCookie('post');
    const token = getCookie('token');
    e.preventDefault();
    setFormData({ ...formData, textChange: 'Güncelleniyor..' });
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/post/${_id}`,
        {
         desc,
         img:image,
        },
      )
      .then(res => {
    
        
          setFormData({ ...formData, textChange: 'Güncelle' });
          toast.success('Gönderi başarıyla güncellendi..');
         window.location.reload()
         
      
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  const uploadCancel =  e =>{
    setProgress(0);
    setImage(null);
    setFormData({ ...formData, img: null })
    setUrls1(null);
  } 

    return (
    <>
    <Topbar />
    <ToastContainer />
    <div className='min-h-screen text-gray-900 flex justify-center bg-green-200'  >
     
   

     <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-4 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold text-green-600'>
             Gönderiyi Düzenle
            </h1>

            <form
              className='w-full flex-1 mt-4 text-gray-800'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative  '>


                <textArea
                  className='w-full px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                  placeholder={desc}
                  onChange={handleChange('desc')}
                  value={desc}
                  
                />

  {
    
    urls1 ===null ? 
    <button
        className="w-full bg-green-500 text-white-900 hover:bg-green-600 active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-4 "
        type="button"
        onClick={() => setShowModal(true)}
      >
        Gönderiye Görsel yükle
      </button> :
      <button
      className="w-full bg-red-600 text-white hover:bg-red-700 active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-4 "
      type="button"
      onClick={() => uploadCancel()}
    >
      Görseli Sil
    </button>
  }          
      
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   Görseli Güncelle
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <input   type="file"   onChange={handleChange2('img')} />
                

<progress value={progress} max="100"/>

<img src={urls1}  style={{width:'100%', height: '250px'}}/>
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  
                  </p>
                </div>
            
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Kapat
                  </button>
                  <div
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={ handleUpload2}

                  >
                    Görseli Güncelle
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      
                
                <button
                  type='submit'
                  className='mt-20 tracking-wide font-semibold bg-green-600 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Güncelle</span>
                </button>
              </div>
              <div className='my-4 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                 
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-500 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-2'
                  href='/anasayfa'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-gray-800' />
                  <span className='ml-4'>Anasayfa</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      
      </div>
    </div>

    </>
    )
}

export default PostUpdate;
