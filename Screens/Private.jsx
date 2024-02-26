import React, { useState, useEffect } from 'react';
import authSvg from '../assests/accountant.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';


const Private = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    textChange: 'Güncelle',
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
        toast.error(` ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            history.push('/login');
          });
        }
      });
  };
  const { name, email, password1, textChange, role } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    const token = getCookie('token');
    console.log(token);
    e.preventDefault();
    setFormData({ ...formData, textChange: 'Güncelleniyor..' });
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/user/update`,
        {
          name,
          email,
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
          toast.success('Profil başarıyla güncellendi..');
          setFormData({ ...formData, textChange: 'Güncelle' });
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <div className='min-h-screen text-gray-900 flex justify-center bg-no-repeat bg-cover'  style={{backgroundImage:"url('https://images6.alphacoders.com/824/thumb-1920-824913.jpg')"}}>
      <ToastContainer />
     
     <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold text-yellow-600'>
             Profili düzenle
            </h1>

            <form
              className='w-full flex-1 mt-8 text-gray-800'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative  '>
                <input
                  disabled
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500  text-red-600 focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='text'
                  placeholder='Rol'
                  value={role}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-red-600 focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='email'
                  placeholder='E-posta'
                  disabled
                  value={email}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='text'
                  placeholder='Ad'
                  onChange={handleChange('name')}
                  value={name}
                />

                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Şifre'
                  onChange={handleChange('password1')}
                  value={password1}
                />
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-yellow-600 text-gray-800 w-full py-4 rounded-lg hover:bg-yellow-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>{textChange}</span>
                </button>
              </div>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                 
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-yellow-500 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-gray-800' />
                  <span className='ml-4'>Anasayfa</span>
                </a>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-yellow-600 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/coins'
                  target='_self'
                >
                  
                  <span className='ml-4'>Kripto merkezi</span>
                </a>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-yellow-600 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/portfoy'
                  target='_self'
                >
                
                  <span className='ml-4'>Pörfoy sistemi</span>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className='flex-1 bg-yellow-200 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Private;