import React, { useState, useEffect } from 'react';
import {Link, Navigate , Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../../helpers/auth';
import Topbar from "../../components/Topbar/topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import {storage} from '../../firebase';
import { set } from 'mongoose';
import Modal from './Modale'

const Private = ({ history }) => {
  const [image,setImage] = useState(null);
  const [progress,setProgress] = useState(0);
  const [progress2,setProgress2] = useState(0);
  const [urls1,setUrls1] = useState(null);
  const [urls2,setUrls2] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '', 
    city: '',
    picture: '',
    coverPicture: '',
    textChange: 'Güncelle',
    role: '' 
  });
 
  useEffect(() => {
    console.log(formData) 

    loadProfile();
  }, []);
const { name, email, password1, textChange, role, city, picture, coverPicture } = formData;
  const loadProfile = () => {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const { role, name, email, city, picture, coverPicture } = res.data;
        setFormData({ ...formData, role, name, email, city, picture, coverPicture });
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
 const handleChange2 = text => e => {
if(e.target.files[0]){
setImage(e.target.files[0]);
console.log(formData)
console.log(image)

}
 };
 const uploadCancel =  e =>{
  setProgress(0);
  setImage(null);
  setFormData({ ...formData, picture: null })
  setUrls1(null);
} 

const uploadCancel2  = e =>{
  setProgress2(0);
  setImage(null);
  setFormData({ ...formData, coverPicture: null })
  setUrls2(null);
}

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
    setFormData({ ...formData, picture: url })
    setUrls1(url);
    console.log(url)
  });
}
);
   };
   const handleUpload3 = e => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed", snapshot => { const progress2 = Math.round (
      (snapshot.bytesTransferred / snapshot.totalBytes)*100
    );
    setProgress2(progress2)}, error =>  {
      console.log(error);
    },
    () => {
      storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(url => {
        setFormData({ ...formData, coverPicture: url })
        setUrls2(url)
        console.log(url)
      });
    }
    );
       };


  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
 
  const handleSubmit = e => {
    const token = getCookie('token');

    e.preventDefault();
    setFormData({ ...formData, textChange: 'Güncelleniyor..' });
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/user/update`,
        {
          name,
          email,
          city, 
          picture,
          coverPicture,
          password: password1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        updateUser(res, () => {
        
          setFormData({ ...formData, textChange: 'Güncellendi' });
          toast.success('Profil başarıyla güncellendi..');
        window.location.reload()
         
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  

  return (
      <>
    <Topbar />
    <div className='min-h-screen text-gray-900 flex justify-center bg-green-200'  >
      <ToastContainer />
   

     <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-4 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold text-green-600'>
             Profili Düzenle
            </h1>

            <form
              className='w-full flex-1 mt-4 text-gray-800'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative  '>
                <input
                  disabled
                  className='w-full px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-600  text-red-600 focus:outline-none focus:border-gray-400 focus:bg-white text-center'
                  type='text'
                  placeholder='Rol'
                  value={role}
                />
                <input
                  className='w-full px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-600 text-red-600 focus:outline-none focus:border-gray-400 focus:bg-white mt-3 text-center'
                  type='email'
                  placeholder='E-posta'
                  disabled
                  value={email}
                />
                <input
                  className='w-full px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3 text-center'
                  type='text'
                  placeholder='Ad'
                  onChange={handleChange('name')}
                  value={name.toLocaleLowerCase('tr-TR').replace(' ','')}
                />
                <select  value={city}  onChange={handleChange('city')} class="form-select 
      w-full
      py-3
      shadow-lg rounded-lg font-large bg-green-50 border border-gray-500 placeholder-gray-600 text-2xl focus:outline-none focus:border-gray-600 focus:bg-green-100 text-center
      transition
      ease-in-out
      mt-3
     " aria-label="Default select example">
       
        <option value="Adana"> 01 - Adana</option>
<option value="Adıyaman"> 02 - Adıyaman</option>
<option value="Afyon"> 03 - Afyon</option>
<option value="Ağrı"> 04 - Ağrı</option>
<option value="Amasya"> 05 - Amasya</option>
<option value="Ankara"> 06 - Ankara</option>
<option value="Antalya"> 07 - Antalya</option>
<option value="Artvin"> 08 - Artvin</option>
<option value="Aydın"> 09 - Aydın</option>
<option value="Balıkesir"> 10 - Balıkesir</option>
<option value="Bilecik"> 11 - Bilecik</option>
<option value="Bingöl"> 12 - Bingöl</option>
<option value="Bitlis"> 13 - Bitlis</option>
<option value="Bolu"> 14 - Bolu</option>
<option value="Burdur"> 15 - Burdur</option>
<option value="Bursa"> 16 - Bursa</option>
<option value="Çanakkale"> 17 - Çanakkale</option>
<option value="Çankırı"> 18 - Çankırı</option>
<option value="Çorum"> 19 - Çorum</option>
<option value="Denizli"> 20 - Denizli</option>
<option value="Diyarbakır"> 21 - Diyarbakır</option>
<option value="Edirne"> 22 - Edirne</option>
<option value="Elazığ"> 23 - Elazığ</option>
<option value="Erzincan"> 24 - Erzincan</option>
<option value="Erzurum"> 25 - Erzurum</option>
<option value="Eskişehir"> 26 - Eskişehir</option>
<option value="Gaziantep"> 27 - Gaziantep</option>
<option value="Giresun"> 28 - Giresun</option>
<option value="Gümüşhane"> 29 - Gümüşhane</option>
<option value="Hakkari"> 30 - Hakkari</option>
<option value="Hatay"> 31 - Hatay</option>
<option value="Isparta"> 32 - Isparta</option>
<option value="Mersin"> 33 - Mersin</option>
<option value="İstanbul"> 34 - İstanbul</option>
<option value="İzmir"> 35 - İzmir</option>
<option value="Kars"> 36 - Kars</option>
<option value="Kastamonu"> 37 - Kastamonu</option>
<option value="Kayseri"> 38 - Kayseri</option>
<option value="Kırklareli"> 39 - Kırklareli</option>
<option value="Kırşehir"> 40 - Kırşehir</option>
<option value="Kocaeli"> 41 - Kocaeli</option>
<option value="Konya"> 42 - Konya</option>
<option value="Kütahya"> 43 - Kütahya</option>
<option value="Malatya"> 44 - Malatya</option>
<option value="Manisa"> 45 - Manisa</option>
<option value="Kahramanmaraş"> 46 - Kahramanmaraş</option>
<option value="Mardin"> 47 - Mardin</option>
<option value="Muğla"> 48 - Muğla</option>
<option value="Muş"> 49 - Muş</option>
<option value="Nevşehir"> 50 - Nevşehir</option>
<option value="Niğde"> 51 - Niğde</option>
<option value="Ordu"> 52 - Ordu</option>
<option value="Rize"> 53 - Rize</option>
<option value="Sakarya"> 54 - Sakarya</option>
<option value="Samsun"> 55 - Samsun</option>
<option value="Siirt"> 56 - Siirt</option>
<option value="Sinop"> 57 - Sinop</option>
<option value="Sivas"> 58 - Sivas</option>
<option value="Tekirdağ"> 59 - Tekirdağ</option>
<option value="Tokat"> 60 - Tokat</option>
<option value="Trabzon"> 61 - Trabzon</option>
<option value="Tunceli"> 62 - Tunceli</option>
<option value="Şanlıurfa"> 63 - Şanlıurfa</option>
<option value="Uşak"> 64 - Uşak</option>
<option value="Van"> 65 - Van</option>
<option value="Yozgat"> 66 - Yozgat</option>
<option value="Zonguldak"> 67 - Zonguldak</option>
<option value="Aksaray"> 68 - Aksaray</option>
<option value="Bayburt"> 69 - Bayburt</option>
<option value="Karaman"> 70 - Karaman</option>
<option value="Kırıkkale"> 71 - Kırıkkale</option>
<option value="Batman"> 72 - Batman</option>
<option value="Şırnak"> 73 - Şırnak</option>
<option value="Bartın"> 74 - Bartın</option>
<option value="Ardahan"> 75 - Ardahan</option>
<option value="Iğdır"> 76 - Iğdır</option>
<option value="Yalova"> 77 - Yalova</option>
<option value="Karabük"> 78 - Karabük</option>
<option value="Kilis"> 79 - Kilis</option>
<option value="Osmaniye"> 80 - Osmaniye</option>
<option value="Düzce"> 81 - Düzce</option>
    </select>
                <input
                  className='w-full px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3 text-center'
                  type='password'
                  placeholder='Şifre'
                  onChange={handleChange('password1')}
                  value={password1}
                />



               {
                 urls1 ===null ? <button
                 className="w-full bg-green-500 text-white-900 active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-4 "
                 type="button"
                 onClick={() => setShowModal(true)}
               >
                 Profil fotoğrafı yükle
               </button> : <button
        className="w-full bg-red-600 text-white active:bg-red-600  hover:bg-red-700 hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:bg-red-700 focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-4 "
        type="button"
        onClick={() => uploadCancel()}
      >
        Profil fotoğrafını Değiştir
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
                    Profil fotoğrafı yükle
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
                <input   type="file"   onChange={handleChange2('picture')} />
                

<progress value={progress} max="100"/>
{progress === 100 ? setShowModal(false): null }

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
                    Fotoğrafı yükle
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        
      
        {
          urls2===null ?  <button
          className="w-full bg-green-500 text-white-900 active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-4"
          type="button"
          onClick={() => setShowModal2(true)}
        >
          Kapak fotoğrafı yükle
        </button> :  <button
        className="w-full bg-red-600 text-white active:bg-red-700 font-bold hover:bg-red-700 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-4"
        type="button"
        onClick={() => uploadCancel2()}
      >
        Kapak Fotoğrafını Sil
      </button>
        }       
       
      {showModal2 ? (
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
                    Kapak fotoğrafı yükle
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal2(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <input   type="file"   onChange={handleChange2('coverPicture')} />
                

                <progress value={progress2} max="100"/>
                {progress2 === 100 ? setShowModal2(false): null }
                <img src={urls2}  style={{width:'100%', height: '250px'}} />

                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                   
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal2(false)}
                  >
                    Kapat
                  </button>
                  <div
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={ handleUpload3}

                  >
                    Fotoğrafı yükle
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
                onClick={handleUpload2}
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>{textChange}</span>
                </button>
              </div>
              <div className='my-4 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                 
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-500 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-2'
                  href='/homepage'
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
  );
};

export default Private;