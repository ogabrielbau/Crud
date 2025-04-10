import { useState } from 'react';
import './insert.css';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    datanasc: '',
    cpf: '',
    email: ''
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1111/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMensagem('Usuário cadastrado com sucesso!');
        setFormData({
          nome: '',
          sobrenome: '',
          datanasc: '',
          cpf: '',
          email: ''
        });
      } else {
        setMensagem('Erro ao cadastrar usuário.');
      }
    } catch (error) {
      console.error(error);
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Usuário</h2>

        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <label>Sobrenome</label>
        <input
          type="text"
          name="sobrenome"
          value={formData.sobrenome}
          onChange={handleChange}
          required
        />

        <label>Data de Nascimento</label>
        <input
          type="date"
          name="datanasc"
          value={formData.datanasc}
          onChange={handleChange}
          required
        />

        <label>CPF</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Cadastrar</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
}

export default App;
