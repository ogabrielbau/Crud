import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Sistema CRUD</h1>
      <div className="crud-buttons">
        <Link to="/insere" className="btn criar">Criar</Link>
        <Link to="/listar" className="btn ler">Ler</Link>
        <Link to="/atualizar" className="btn atualizar">Atualizar</Link>
        <Link to="/deletar" className="btn deletar">Deletar</Link>
      </div>
    </div>
  );
}

export default Home;
