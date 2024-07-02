import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/authentication/signup/Signup';
import Login from './components/authentication/login/Login';
import Navbar from './components/navbar/Navbar';
import SecurityQuestions from './components/authentication/signup/SecurityQuestions';
import ConfirmSignup from './components/authentication/signup/ConfirmSignup';
import CeaserCipher from './components/authentication/signup/CeaserCipher';
import GetSecurityQuestion from './components/authentication/login/GetSecurityQuestion';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup/security-questions' element={<SecurityQuestions/>} />
        <Route path='/confirm/signup' element={<ConfirmSignup/>} />
        <Route path='/signup/ceaser-cypher' element={<CeaserCipher/>} />
        <Route path='/login/security-question' element={<GetSecurityQuestion/>} />
      </Routes>
    </Router>
  );
}

export default App;
