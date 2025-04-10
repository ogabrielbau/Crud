import React, { useState } from 'react';
import axios from 'axios';
import './deleteuser.css';

function DeleteUser() {
  const [cpf, setCpf] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);

  const buscarUsuario = async () => {
    if (!/^\d{11}$/.test(cpf)) {
      setMensagem('❗ Digite um CPF válido com 11 números.');
      setUsuario(null);
      setConfirmarExclusao(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:1111/users/cpf/${cpf}`);
      setUsuario(response.data);
      setMensagem('');
      setConfirmarExclusao(true);
    } catch (error) {
      setUsuario(null);
      setConfirmarExclusao(false);
      setMensagem('Usuário não encontrado.');
    }
  };

  const excluirUsuario = async () => {
    try {
      await axios.delete(`http://localhost:1111/users/${usuario.cpf}`);
      setMensagem('✅ Usuário excluído com sucesso!');
      setUsuario(null);
      setCpf('');
      setConfirmarExclusao(false);
    } catch (error) {
      setMensagem('❌ Erro ao excluir o usuário.');
    }
  };

  return (
    <div className="editar-container">
      <h2>Excluir Usuário</h2>
      <div className="buscar">
        <input
          type="text"
          placeholder="Digite o CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <button onClick={buscarUsuario}>Buscar</button>
      </div>

      {usuario && (
        <div className="form-edicao">
          <input type="text" value={usuario.nome} disabled />
          <input type="text" value={usuario.sobrenome} disabled />
          <input type="date" value={usuario.datanasc.split('T')[0]} disabled />
          <input type="text" value={usuario.cpf} disabled />
          <input type="email" value={usuario.email} disabled />
        </div>
      )}

      {confirmarExclusao && (
        <div className="confirmacao">
          <p>Tem certeza que deseja excluir este usuário?</p>
          <button className="confirmar" onClick={excluirUsuario}>Sim, excluir</button>
        </div>
      )}

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

export default DeleteUser;
