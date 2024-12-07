import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Loginmypage from "./pages/Loginmypage";
import Country from "./pages/Country";
import Mycloth from "./pages/Mycloth";
import Clothregister from "./pages/Clothregister";
import GoogleCallback from "./pages/GoogleCallback";
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google/callback" element={<GoogleCallback />} />
        <Route path="/loginmypage" element={<Loginmypage />} />

        {/* 로그인 필요 라우트 */}
        <Route
          path="/country"
          element={
            <ProtectedRoute>
              <Country />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mycloth"
          element={
            <ProtectedRoute>
              <Mycloth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clothregister"
          element={
            <ProtectedRoute>
              <Clothregister />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
