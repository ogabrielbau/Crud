require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORTFRONT || 1111;

app.use(cors());
app.use(express.json());

// ------------------------
// Rota: GET - Buscar todos os usuários
// ------------------------
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuários:', err);
        return res.status(500).json({ erro: 'Erro ao buscar usuários' });
      }
      res.json(results);
    });
  });
  
  
  // ------------------------
  // Rota: CREATE - Criar um novo usuário
  // ------------------------
  app.post('/users', (req, res) => {
    const { nome, sobrenome, datanasc, cpf, email } = req.body;
  
    const sql = 'INSERT INTO users (nome, sobrenome, datanasc, cpf, email) VALUES (?, ?, ?, ?, ?)';
    const values = [nome, sobrenome, datanasc, cpf, email];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(500).json({ erro: 'Erro ao criardasd usuário' });
      } else {
        res.status(201).json({ id: result.insertId, nome, sobrenome, datanasc, cpf, email });
      }
    });
  });
  
  // ------------------------
  // Rota: UPDATE - Atualizar um usuário
  // ------------------------
app.put('/users/:cpf', (req, res) => {
  const { cpf } = req.params;
  const { nome, sobrenome, datanasc, email } = req.body;

  const dataFormatada = new Date(datanasc).toISOString().split('T')[0]; // yyyy-mm-dd

  const sql = `
    UPDATE users
    SET nome = ?, sobrenome = ?, datanasc = ?, email = ?
    WHERE cpf = ?
  `;
  const values = [nome, sobrenome, dataFormatada, email, cpf];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    } else {
      res.send('Usuário atualizado com sucesso!');
    }
  });
});

  
  // ------------------------
  // Rota: DELETE - Excluir um usuário
  // ------------------------
  app.delete('/users/:cpf', (req, res) => {
    const cpf = req.params.cpf;
    const sql = 'DELETE FROM users WHERE cpf = ?';
  
    db.query(sql, [cpf], (err, result) => {
      if (err) {
        console.error('Erro ao deletar usuário:', err);
        return res.status(500).send('Erro ao deletar usuário');
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).send('Usuário não encontrado');
      }
  
      res.send('Usuário deletado com sucesso');
    });
  });
// ------------------------
// Rota: GET - Buscar o usuário por CPF
// ------------------------
app.get('/users/cpf/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const sql = 'SELECT * FROM users WHERE cpf = ?';
  db.query(sql, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).json({ erro: 'Erro no servidor' });
    } else if (results.length === 0) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    } else {
      res.json(results[0]);
    }
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});