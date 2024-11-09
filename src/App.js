import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clothregister from './pages/Clothregister';
import Mycloth from './pages/Mycloth';

function App() {
  return (
    <Router>
      <div>
        <h1>Moipzy</h1>
        <Routes>
          <Route path="/clothregister" element={<Clothregister />} />
          <Route path="/mycloth" element={<Mycloth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
