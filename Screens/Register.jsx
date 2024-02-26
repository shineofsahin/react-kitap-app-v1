import React, { useState } from 'react';
import authSvg from '../assests/united.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {/* authenticate,*/ isAuth } from '../helpers/auth';
import {  Navigate  } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: '',
        textChange: 'Kaydol'
      });

      const { name, email, password1,city, password2, textChange } = formData;
      
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Kayıt olunuyor...' });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            city,
            password: password1
          })

          .then(res => {
            console.log(name)
            console.log(email)
            console.log(city)
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'E-posta yollandı...'
            });

            toast.success(res.data.message);
          })
          .catch(err => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Hata!'
            });
            console.log(err.response);
            toast.warning(err.response.data.errors);
          });
      } else {
        toast.error("Şifreler eşleşmiyor lütfen şifreleri aynı girin");
      }
    } else {
      toast.warning('Tüm alanları doldurun...');
    }
  };

return (
    <div className='min-h-screen shadow-lg bg-green-100 text-gray-900 flex justify-center bg-no-repeat bg-cover' style={{backgroundImage:"url('https://wallpapercave.com/wp/wp6282029.jpg')"}}>
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
      
      <div className='max-w-screen-xl m-0 sm:m-20 bg-green shadow sm:rounded-2xl flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-green-100 rounded-t-full'>
          <div className=' flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold text-green-600'>
             Elden ele Kitaba 
            </h1>
            <h1 className='text-2xl xl:text-3xl font-extrabold text-green-700'>
             Kaydol
            </h1>
            <form
              className='w-full flex-1 mt-6 text-black-500'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <input
                  className='w-full px-8 py-4 shadow-lg rounded-lg font-medium bg-green-50 border border-gray-500 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-600 focus:bg-white'
                  type='text'
                  placeholder='Kullanıcı adı'
                  onChange={handleChange('name')}
                  value={name.toLocaleLowerCase('tr-TR').replace(' ','')}
                />
                <input
                  className='w-full px-8 py-4  shadow-lg rounded-lg font-medium bg-green-50 border border-gray-500 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-600 focus:bg-white mt-3'
                  type='email'
                  placeholder='E-posta'
                  onChange={handleChange('email')}
                  value={email}
                />
                <input
                  className='w-full px-8 py-4  shadow-lg rounded-lg font-medium bg-green-50 border border-gray-500 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-600 focus:bg-white mt-2'
                  type='password'
                  placeholder='Şifre'
                  onChange={handleChange('password1')}
                  value={password1}
                />
                <input
                  className='w-full px-8 py-4 shadow-lg rounded-lg font-medium bg-green-50 border border-gray-500 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-600 focus:bg-white mt-3'
                  type='password'
                  placeholder='Şifre onayla'
                  onChange={handleChange('password2')}
                  value={password2}
                />
                 <select  value={city}  onChange={handleChange('city')} class="form-select 
      w-full
      py-3
      shadow-lg rounded-lg font-large bg-green-50 border border-gray-500 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-600 focus:bg-green-100
      transition
      ease-in-out
      mt-3
     " aria-label="Default select example">
        <option selected type='city'>Şehir Belirtilmedi...     </option>
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

                <button
                  type='submit'
                  className='mt-4 tracking-wide shadow-lg font-semibold bg-green-600 text-gray-900 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus fa 1x w-9  -ml-5' />
                  <span className='ml-3 '>{textChange}</span>
                </button>
              </div>
              <div className='my-8 border-b text-center bg-green-100'>
                <div className='leading-none px-2 inline-block text-sm text-green-700 tracking-wide font-medium bg-green-100 transform translate-y-1/2'>
                   Hesabın var mı ? Giriş yap
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full  max-w-xs font-bold shadow-sm shadow-lg rounded-lg py-3
           bg-green-500 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:te hover:bg-green-600 focus:shadow-outline mt-2'
                  href='/login'
                  target='_self'
                >
                 
                  <span >Giriş yap</span>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className='flex-1 bg-green text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-auto bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Register