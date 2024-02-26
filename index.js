import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Navigate , Routes,Fragment } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Screens/Register';
import Activate from './Screens/Activate';
import Login from './Screens/Login';
import ForgetPassword from './Screens/ForgetPassword';
import ResetPassword from './Screens/ResetPassword';
import Admin from './pages/adminpage/adminpage';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import Profile from './pages/profile/profile';
import Homepage from './pages/homepage/homepage'; 
import Messenger from './pages/messenger/Messenger'; 

import AdminDash from './pages/admindashboard/AdminDashboard';

import Bookmark from './pages/bookmarks/Bookmark'; 

import Followerspage from './pages/followerspage/followerspage'; 
import Plaint from './pages/plaint/plaint'; 
import ProfilEdit from './pages/profileUpdate/profileUpdate';
import PostEdit from './pages/postUpdate/postUpdate';
import {AuthContextProvider} from "./context/AuthContext"
import TimeAgo from 'javascript-time-ago';
import tr from 'javascript-time-ago/locale/tr.json'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(tr)


ReactDOM.render(
  <AuthContextProvider>
<BrowserRouter>
    <Routes>
      <Route path='/' exact render={props => <App {...props} />} />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/register' exact render={props => <Register {...props} />} />
      <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
      <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      
      <PrivateRoute path="/anasayfa" exact component={Homepage} /> 
      <PrivateRoute path="/takipcilerin-paylasimi" exact component={Followerspage} /> 
      <PrivateRoute path="/profil/:username" exact component={Profile} /> 
      <PrivateRoute path="/profil/edit/:username" exact component={ProfilEdit} /> 
      <PrivateRoute path="/post/edit/:_id" exact component={PostEdit} /> 
      <PrivateRoute path="/mesajlar" exact component={Messenger} /> 
      <PrivateRoute path="/kaydedilenler" exact component={Bookmark} /> 

     <AdminRoute path="/admin" exact component={Admin} />
     <AdminRoute path="/adminpanel" exact component={AdminDash} />
     <AdminRoute path="/kullanicilar" exact component={AdminDash}  />
     <AdminRoute path="/gonderiler" exact component={AdminDash}  />
     <AdminRoute path="/gonderi-sikayetler" exact component={AdminDash}  />
     <AdminRoute path="/kullanici-sikayetler" exact component={AdminDash}  />
    
     <AdminRoute path="/sikayetler" exact component={Plaint} />
      <Navigate  to='/' />
    </Routes>
  </BrowserRouter> 
  </AuthContextProvider>
   
  ,
  document.getElementById('root')
);

