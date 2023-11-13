

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import SignOut from './pages/SignOut';
import PrivateRoute from './components/PrivateRoute';
import ViewAllUsers from './pages/ViewAllUsers';



export default function App() {
  return (
    <BrowserRouter>
      <Header />
     
      <Routes>
       
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/' element={<About />} />
        <Route path='/sign-out' element={<SignOut/>} />
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/allusers' element={<ViewAllUsers />} />
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
