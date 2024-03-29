import React, { useState, useEffect } from 'react';
import authSvg from '../assests/books.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const ResetPassword = ({match}) => {
  const [formData, setFormData] = useState({
      password1: '',
      password2: '',
      token: '',
    textChange: 'Yenile'
  });
    const { password1, password2,  token } = formData;
    
    useEffect(() => {
        let token = match.params.token
        if(token) {
            setFormData({...formData, token,})
        }
        
    }, [])
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
    const handleSubmit = e => {
      console.log(password1, password2)
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {
      setFormData({ ...formData, textChange: 'Yenileniyor' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
            newPassword: password1,
            resetPasswordLink: token
        })
        .then(res => {
          console.log(res.data.message)
            setFormData({
              ...formData,
               password1: '',
              password2: ''
            });
            toast.success(res.data.message);
          
        })
        .catch(err => {
          toast.error('Bir şeyler yanlış gitti lütfen tekrar deneyin');
        });
    } else {
      toast.error('Şifreler eşleşmiyor..');
    }
  };
  return (
    <div className='min-h-screen bg-green-100 text-gray-900 flex justify-center bg-no-repeat bg-cover' style={{backgroundImage:"url('https://wallpapercave.com/wp/wp6282029.jpg')"}}>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
      <div className='flex-1 bg-green-200 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-auto  bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Şifreyi yenile
            </h1>
            
            <div className='w-full flex-1 mt-8 text-gray-700'>
              
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='password'
                  placeholder='Şifre'
                  onChange={handleChange('password1')}
                  value={password1}
                  />
                  <input
                  className='w-full mt-4 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='password'
                  placeholder='Şifreyi onayla'
                  onChange={handleChange('password2')}
                  value={password2}
                />
                <button
                  type='submit'
                  className='mt-8 tracking-wide font-semibold bg-green-700 text-gray-800 w-full py-4 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <span className='ml-3'>Onayla</span>
                </button>
                <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-green-500 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-3'
                  href='/login'
                  target='_self'
                >
                  <span className='ml-4'>Giriş sayfasına dön</span>
                </a>
              </div>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ResetPassword;