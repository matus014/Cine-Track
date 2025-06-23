const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'nome_do_banco',
  password: 'sua_senha',
  port: 5432,
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido ou expirado.' });

    req.user = user;
    next();
  });
}

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const usuario = result.rows[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome, email: usuario.email }, 
    JWT_SECRET, 
    {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Erro ao autenticar:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
      [nome, email, senhaHash]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.get('/public', (req, res) => {
  res.send('Rota pública acessada com sucesso!');
});

app.get('/private', authenticateToken, (req, res) => {
  res.send(`Olá, ${req.user.nome}! Você acessou uma rota protegida.`);
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});