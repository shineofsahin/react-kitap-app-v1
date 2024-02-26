import React, { useState } from 'react';
import authSvg from '../assests/searching.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';



const ForgetPassword = ({history}) => {
  const [formData, setFormData] = useState({
    email: '',
    textChange: 'Değiştir'
  });
  const { email /*, textChange */} = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'E-posta yollanıyor' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email
        })
        .then(res => {
          
            setFormData({
              ...formData,
              email: '',
            });
            toast.success(`E-postanıza şifre yenileme bağlantısı gönderildi. Lütfen e-posta kutunuzu kontrol edin..`);
          
        })
        .catch(err => {
        console.log(err.response)
        toast.warning(err.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        
        });
    } else {
      toast.info('E-posta alanı boş bırakılamaz.');
    }
  };
  return (
    <div className='min-h-screen shadow-lg bg-green-100 text-gray-900 flex justify-center bg-no-repeat bg-cover' style={{backgroundImage:"url('https://wallpapercave.com/wp/wp6282029.jpg')"}}>
 <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-r-3xl flex justify-center flex-1'>
      <div className='flex-1 bg-green-200 text-center border-green-200 hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-auto bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Şifremi unuttum*
            </h1>
            <h4 className=' xl:text-sm	text-red-600 mt-2'>
              * Aşağıdaki bölüme E-posta adresini girerek şifre yenileme bağlantısı alabilirsin. 
            </h4>
            <div className='w-full flex-1 mt-8 text-gray-800'>
              
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  className='w-full px-8 py-4 shadow-lg rounded-lg font-medium bg-green-100 border border-gray-400 placeholder-gray-700 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='email'
                  placeholder='E-posta'
                  onChange={handleChange('email')}
                  value={email}
                />
                <button
                  type='submit'
                  className='mt-8 tracking-wide shadow-lg font-semibold bg-green-500 text-gray-900 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
              
                  <span className='ml-3'>Şifre yenileme bağlantısı gönder</span>
                </button>
              </form>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-4 inline-block text-sm text-green-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                 Şifreni biliyor musun ?
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs shadow-lg font-bold shadow-sm rounded-lg py-4
           bg-green-500 text-gray-900 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline mt-4'
                  href='/login'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 2x w-3  -ml-3 text-gray-900' />
                  <span className='ml-4'>Giriş sayfasına dön</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default ForgetPassword;