import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Loginmypage from './pages/Loginmypage';
import Country from './pages/Country';
import Mycloth from './pages/Mycloth';
import Clothregister from './pages/Clothregister';

/*import './App.css';*/

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} /> {/*로그인 페이지*/}
        <Route path='/signup' element={<Signup />} /> {/*회원가입 페이지*/}
        <Route path='/loginmypage' element={<Loginmypage />} /> {/*로그인 하고 난 후 홈페이지*/}
        <Route path='/country' element={<Country />} />  {/*국가 페이지*/}     
        <Route path='/mycloth' element={<Mycloth />} />  {/*내 옷 페이지*/}
        <Route path='/clothregister' element={<Clothregister />} />  {/*옷 등록 페이지*/}
      </Routes>
    </div>
  );
}

export default App;
