import React, { useEffect, useState } from 'react';
import './listar.css';

function Listar() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await fetch('http://localhost:1111/users');
        const data = await response.json();
        console.log('Dados recebidos:', data); // <--- Adicione isso para debugar
        setUsuarios(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }

    fetchUsuarios();
  }, []);

  return (
    <div className="listar-container">
      <h2>Usuários Cadastrados</h2>
      <div className="tabela">
        <div className="tabela-header">
          <span>Nome</span>
          <span>Sobrenome</span>
          <span>Data Nasc.</span>
          <span>Email</span>
          <span>CPF</span>
        </div>
        {usuarios.length > 0 ? (
          usuarios.map((u) => (
            <div key={u.id} className="tabela-row">
              <span>{u.nome}</span>
              <span>{u.sobrenome}</span>
              <span>{new Date(u.datanasc).toLocaleDateString('pt-BR')}</span>
              <span>{u.email}</span>
              <span className="cpf-blur">{u.cpf}</span>
            </div>
          ))
        ) : (
          <p className="mensagem-vazia">Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Listar;
