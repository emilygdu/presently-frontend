import { Box } from '@mantine/core';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import MyPresents from './components/myPresents/MyPresents';
import FindUser from './components/findUser/FindUser';
import FindPresent from './components/findPresent/FindPresent';
import Login from './components/login+register/Login';
import Register from './components/login+register/Register';
import Help from './components/help/Help';
import { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import { useUser } from "./UserContext";
import AccountDetails from './components/accountDetails/AccountDetails';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState();

  const { currentUser } = useUser();

  const [searchedUser, setSearchedUser] = useState()

  useEffect(() => {
    if (!location.pathname.startsWith('/geschenkeFinden')) return;
    
    if (searchedUser != undefined) {
      navigate(`/geschenkeFinden/${searchedUser?.id}`)
      return;
    }
    navigate('/geschenkeFinden')
  }, [searchedUser])

  useEffect(() => {
    if(token == undefined){
      navigate('/login')
    }
  }, [token])

  return (
    <Box>
      {(!location.pathname.startsWith('/login') && !location.pathname.startsWith('/register')) && <Navbar/>}
      <Routes>
        <Route path="/register" element={<Register setToken={setToken}/>}/>
        <Route path="/login" element={<Login setToken={setToken}/>}/>
        <Route path="/meineWuensche" element={<MyPresents token={token}/>}/>
        <Route path="/geschenkeFinden" element={<FindUser setSearchedUser={setSearchedUser}/>}/>
        <Route path="/geschenkeFinden/:userId" element={<FindPresent searchedUser={searchedUser}/>}/>
        <Route path="/help" element={<Help />}/>
        <Route path="/accountDetails" element={<AccountDetails />}/>
      </Routes>
    </Box>
  );
}

export default App;
