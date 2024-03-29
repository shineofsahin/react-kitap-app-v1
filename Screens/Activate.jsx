import React, { useState, useEffect } from 'react';
import authSvg from '../assests/book-stack.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { /*authenticate, */isAuth } from '../helpers/auth';
import {/* Link,*/ Navigate  } from 'react-router-dom';

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    show: true
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }

    console.log(token, name);
  }, [match.params]);
  const { name, token/*, show */} = formData;

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/activation`, {
        token
      })
      .then(res => {
        setFormData({
          ...formData,
          show: false
        });

        toast.success(res.data.message);
      })
      .catch(err => {
        
        toast.error(err.response.data.errors);
      });
  };

  return (
    <div className='min-h-screen shadow-lg bg-no-repeat bg-cover text-gray-900 flex justify-center'  style={{backgroundImage:"url('https://wallpapercave.com/wp/wp6282029.jpg')"}}>
      {isAuth() ? <Navigate  to='/' /> : null} 
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              HOŞGELDİN!<h1 className='text-green-700 text-center'>{ name} </h1>
            </h1>

            <form
              className='w-full flex-1 mt-8 text-green-500'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                
                <button
                  type='submit'
                  className='mt-5 tracking-wide shadow-lg font-semibold bg-green-600 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Hesabı aktif et</span>
                </button>
              </div>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-4 inline-block text-sm text-green-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Ve giriş sayfasına dön
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full shadow-lg max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-green-500 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-3'
                  href='/login'
                  target='_self'
                >
                 
                  <span className='ml-4'>Giriş yap</span>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className='flex-1 bg-green-200 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-auto bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Activate;