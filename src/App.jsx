

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import SignOut from './pages/SignOut';


function App() {
 

  return (
    <BrowserRouter>
       <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-out' element={<SignOut />} />
      <Route path='/about' element={<About/>} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
