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
    const sql = 'SELECT id, nome, sobrenome, datanasc, cpf, email FROM users';
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
  app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    const sql = 'UPDATE users SET nome = ?, email = ?, senha = ? WHERE id = ?';
    db.query(sql, [nome, email, senha, id], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ erro: 'Erro ao atualizar usuário' });
      } else {
        res.json({ mensagem: 'Usuário atualizado com sucesso' });
      }
    });
  });
  
  // ------------------------
  // Rota: DELETE - Excluir um usuário
  // ------------------------
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Erro ao excluir usuário:', err);
        res.status(500).json({ erro: 'Erro ao excluir usuário' });
      } else {
        res.json({ mensagem: 'Usuário excluído com sucesso' });
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
