import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Inserir from './pages/insere';
import Listar from './pages/showusers';
import Editar from './pages/edituser';
import DeleteUser from './pages/deleteuser'; // <-- alterado para a pasta pages

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insere" element={<Inserir />} />
        <Route path="/listar" element={<Listar />} />
        <Route path="/editar" element={<Editar />} />
        <Route path="/deletar" element={<DeleteUser />} /> {/* nova rota adicionada */}
      </Routes>
    </Router>
  );
}

export default App;
