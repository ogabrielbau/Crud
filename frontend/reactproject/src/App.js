import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Inserir from './pages/insere';
import listar from './pages/listar';
// futuramente: import Listar from './pages/Listar' etc

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inserir" element={<Inserir />} />
        <Route path="/listar" element={<listar />} />
      </Routes>
    </Router>
  );
}

export default App;
