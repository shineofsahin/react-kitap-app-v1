import React from 'react';
import { Link/*, Navigate  */} from 'react-router-dom';
import { signout } from './helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../src/context/AuthContext";
import { useContext} from "react";


function App({ history }) {
  const { user } = useContext(AuthContext);
 

  return (
    <div>
   
    <div className='min-h-screen bg-green-200 text-gray-900 flex justify-center bg-no-repeat bg-cover' style={{backgroundImage:"url('https://wallpapercave.com/wp/wp6282029.jpg')"}}>

            <ToastContainer /> 
          
             
        <div className='lg:w-1/2 xl:w-8/12 p-6 sm:p-12'>
      
          <div className='mt-12 flex flex-col items-center'>
          
            <div className='w-full flex-1 text-gray-800'>
              
          
              <div className='mx-auto max-w-xs relative '>
                <Link
                  to='/login'
                  className=' tracking-wide font-semibold bg-green-700 text-gray-100 w-full py-4 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <span className='ml-3'>Giriş yap</span>
                </Link>
                <Link
                  to='/register'
                  className='mt-5 tracking-wide font-semibold bg-green-700 text-gray-100 w-full py-4 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                 
                  <span className='ml-3'>Kaydol</span>
                </Link>
                <Link
                  to='/anasayfa'
                  className='mt-5 tracking-wide font-semibold bg-green-700 text-gray-100 w-full py-4 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <span className='ml-3'>Anasayfa</span>
                </Link> 
                <Link
                 to={`/profil`}
                  className='mt-5 tracking-wide font-semibold bg-green-700 text-gray-100 w-full py-4 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <span className='ml-3'>Profil</span>
                </Link>
                <Link
                  to='/adminpanel'
                  className='mt-5 tracking-wide font-semibold bg-green-700 text-gray-100 w-full py-4 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  
                  <span className='ml-3'>Admin paneli</span>
                </Link>
               
                <button
                  onClick={() => {
                    signout(() => {
                      toast.error('Başarıyla çıkış yapıldı');
                      history.push('/login');
                   
                    });
                  }}
                  className='mt-5 tracking-wide font-semibold bg-green-700 text-gray-900 w-full py-4 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <span className='ml-3'>Çıkış yap</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      
    </div>
    </div>
  );
}

export default App;