import { Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loginmypage" element={<Loginmypage />} />
        <Route path="/country" element={<Country />} />
        <Route path="/mycloth" element={<Mycloth />} />
        <Route path="/clothregister" element={<Clothregister />} />
      </Routes>
    </div>
  );
}

export default App;
