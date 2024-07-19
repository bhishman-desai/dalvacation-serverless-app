import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/authentication/signup/Signup';
import Login from './components/authentication/login/Login';
import Navbar from './components/navbar/Navbar';
import SecurityQuestions from './components/authentication/signup/SecurityQuestions';
import ConfirmSignup from './components/authentication/signup/ConfirmSignup';
import CeaserCipher from './components/authentication/signup/CeaserCipher';
import GetSecurityQuestion from './components/authentication/login/GetSecurityQuestion';
import LoginCeaserCypher from './components/authentication/login/LoginCeaserCypher';
import Footer from './components/footer/Footer';
import Home from './components/homePage/Home';
import ExploreRooms from "./components/ExploreRooms";
import Dashboard from './components/admin/Dashboard';
import KommunicateChat from "./components/ChatBot/Chabot";
import AddRoom from './components/room/AddRoom';


function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup/security-questions' element={<SecurityQuestions/>} />
        <Route path='/confirm/signup' element={<ConfirmSignup/>} />
        <Route path='/signup/ceaser-cypher' element={<CeaserCipher/>} />
        <Route path='/login/security-question' element={<GetSecurityQuestion/>} />
        <Route path='/login/ceaser-cypher' element={<LoginCeaserCypher/>} />
        <Route path='/explore-rooms' element={<ExploreRooms/>}/>
        <Route path='/admin/dashboard' element={<Dashboard/>} />
        <Route path='/add-room' element={<AddRoom/>} />
      </Routes>
      <Footer/>
    </Router>
      <KommunicateChat/>
    </div>
  );
}

export default App;
