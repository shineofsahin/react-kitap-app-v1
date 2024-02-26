import React, { useState, useEffect }  from 'react';
import {  toast } from 'react-toastify';
import { signout } from './helpers/auth';
import axios from 'axios';
import logoSvg from './assests/cpu.svg';
import {  isAuth, getCookie } from './helpers/auth';


function Nav({history}) {
  
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password1: '',
  role: ''
});

useEffect(() => {

    loadProfile();

  
}, []);

const loadProfile = () => {
  const token = getCookie('token');
  axios
    .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const { role, name, email } = res.data;
      
      setFormData({ ...formData, role, name, email });
    })
    .catch(err => {
     
      
    });

};
const { name, email, password1, textChange, role } = formData;
  return (
    <div>
 <nav className="bg-yellow-500 ">
        <div className="max-w-7xl mx-auto px-12 sm:px-6 lg:px-8">
          <div className="flex items-center  justify-between h-24">
            <div className="flex items-center">
              <div className="flex-shrink-0   ">
                <a href ="/">
                <img
                  className="h-20 w-20 ml-8"
                  src={logoSvg}
                  alt="logo"
                />
                </a>
              </div>
              <div className="hidden md:block ">
                <div className="ml-8 flex items-baseline ">
                  <a
                    href="/"
                    className=" text-gray-800 ml-6 shadow-lg bg-yellow-600 hover:bg-yellow-700 hover:text-white px-5 py-3 rounded-md font-extrabold text-lg"
                  >
                    Anasayfa
                  </a>
                  <a
                    href="/"
                    className=" text-gray-800 ml-6 shadow-lg bg-yellow-600 hover:bg-yellow-700 hover:text-white px-5 py-3 rounded-md font-extrabold text-lg"
                  >
                    Anasayfa
                  </a>
                  <a
                    href="/"
                    className=" text-gray-800 ml-6 shadow-lg bg-yellow-600 hover:bg-yellow-700 hover:text-white px-5 py-3 rounded-md font-extrabold text-lg"
                  >
                    Anasayfa
                  </a>

                  
                </div>
                
              </div>
            </div>
          
            <div  className="justify-end">
            
                   <a
                    href="/profil"
                    className="text-gray-800 shadow-lg bg-yellow-600 ml-4 hover:bg-yellow-700 hover:text-white px-5 py-3 rounded-md font-bold text-lg"
                  >
                    {name}
                  </a>
                  <a
                  
                    href="/"
                    onClick={() => {
                      toast.error('Başarıyla çıkış yapıldı');
                      signout(() => {
                        history.push('/');
                      });
                    }}
                    className="text-gray-800 shadow-lg ml-4 hover:bg-red-600 hover:text-white px-5 py-3 rounded-md font-extrabold text-lg"
                  >
                    Çıkış yap
                  </a>
                  </div>
            
          </div>
        </div>
      </nav>

    </div>
  );
}
export default Nav;

