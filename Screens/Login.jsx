import React, { useState } from 'react';
import authSvg from '../assests/book-keeper.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Navigate  } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Giriş yap'
  });
  const { email, password1,/*textChange */} = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const sendGoogleToken = tokenId => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('Google ile giriş hatası', error.response);
      });
  };
  
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/');//Admin değilse yönlendirilecek kısım
    });
  };
  

  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
        userID,
        accessToken
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('Facebook ile giriş hatası', error.response);
      });
  };
  const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const responseFacebook = response => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken)
  };

  const handleSubmit = e => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Giriş yapılıyor.' });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1
        })
        .then(res => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Giriş yapıldı'
            });
            isAuth() && isAuth().role === 'admin'
              ? history.push('/admin')
              : history.push('/');
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Giriş yap'
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.warning('Lütfen tüm alanları doldurun..');
    }
  };
  return (
    <div className='min-h-screen  bg-no-repeat bg-cover text-gray-900 shadow-lg flex justify-center' style={{backgroundImage:"url('https://wallpapercave.com/wp/wp6282029.jpg')"}}>
      {isAuth() ? <Navigate  to='/' /> : null}
      <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover/>
      <div className='max-w-screen-xl m-0 sm:m-20  bg-green shadow sm:rounded-r-3xl flex justify-center flex-1 '>
      <div className='flex-1 bg-green rounded-r-3xl  text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-auto bg-center bg-no-repeat  '
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-green-100   rounded-b-full'>
        <h1 className='text-2xl xl:text-3x1 font-extrabold text-green-600 text-center'>
             Elden Ele Kitap Platformuna
            </h1>
            <h1 className='text-2xl xl:text-3x1 font-extrabold text-green-700 text-center'>
             Hoşgeldin!
            </h1>
        <div className='mt-12 flex flex-col items-center '>
                <a
                  className='w-full max-w-xs shadow-lg font-bold shadow-sm rounded-lg py-4
           bg-green-500 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-green-600 focus:shadow-sm focus:shadow-outline '
                  href='/register'
                  target='_self'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-5 text-gray-800' />
                  <span className='ml-3'>Kaydol</span>
                </a>
              </div>
              <div className='my-12 border-b bg-green-100 text-center'>
                <div className='leading-none px-4 inline-block text-sm text-green-700 tracking-wide font-medium bg-green-100 transform translate-y-1/2'>
                  Hesabın var mı? Giriş yap
                </div>
              </div>
          <div className='mt-8 flex flex-col items-center'>
            
            <div className='w-full flex-1 mt-6 text-gray-900'>
        
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                
                <input
                
                  className='w-full px-8 py-4 rounded-lg shadow-lg font-medium bg-green-100 border border-gray-600 placeholder-gray-600 text-sm focus:outline-none focus:text-gray-800 focus:placeholder-opacity-50 focus:bg-white'
                  type='email'
                  placeholder='E-posta'
                  onChange={handleChange('email')}
                  value={email}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg shadow-lg font-medium bg-green-100 border border-gray-600 placeholder-gray-600 text-sm focus:outline-none focus:text-gray-800 focus:placeholder-opacity-50 focus:bg-white mt-4'
                  type='password'
                  placeholder='Şifre'
                  onChange={handleChange('password1')}
                  value={password1}
                />
                <button
                  type='submit'
                  className='mt-4 tracking-wide shadow-lg font-semibold bg-green-500 text-gray-900 w-full py-3 rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-4  -ml-5' />
                  <span className='ml-3'>Giriş yap</span>
                </button>
                <Link
                  to='/users/password/forget'
                  className='no-underline  hover:underline text-blue-700 text-md text-center right-0 absolute  mt-2'
                >
                  Şifremi unuttum
                </Link>
              </form>
            </div>
          </div>
          <div className='my-12 border-b bg-green-100 text-center'>
                <div className='leading-none px-4 inline-block text-sm text-green-700 tracking-wide font-bold bg-green-100 transform translate-y-1/2'>
                Sosyal medya hesaplarınla giriş yap
                </div>
              </div>
         
          <div className='mt-2 flex flex-row place-content-center '>
          <div  className=' pr-4  '>
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='w-12 max-w-xs font-bold shadow-lg rounded-full  py-1 bg-red-700  text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-red-800 focus:shadow-sm focus:shadow-outline'
                    >
                      <div className=' p-2 rounded-full  '>
                        <i className='fab fa-google ' />
                      </div>
                   
                    </button>
                  )}
                ></GoogleLogin>
                 </div>
                <div>

               
                 <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={renderProps => (
                    < button
                      onClick={renderProps.onClick}
                      className='w-12 max-w-xs font-bold shadow-lg rounded-full py-1 bg-blue-700 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:bg-blue-800 focus:shadow-sm focus:shadow-outline'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-facebook-f' />
                      </div>
                    </button>
                  )}
                />
                 </div>
                </div>
                
          </div>
      </div>
    </div>
  );
};

export default Login;