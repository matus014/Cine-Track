const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

router.post("/cadastro", async (req, res) => {
  const { nome, usuario, email, telefone, senha } = req.body;
  const senhaHash = await bcrypt.hash(senha, 10);

  const SQL = `SELECT nameUsuario, email, telefone FROM usuario WHERE nameUsuario = ? OR email = ? OR telefone = ?`;

  db.query(SQL, [usuario, email, telefone], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });

    const conflicts = [];
    results.forEach(row => {
      if (row.nameUsuario === usuario) conflicts.push("nameUsuario");
      if (row.email === email) conflicts.push("email");
      if (row.telefone === telefone) conflicts.push("telefone");
    });

    if (conflicts.length > 0)
      return res.status(409).json({ error: `Já cadastrado: ${conflicts.join(", ")}` });

    const insertSQL = `INSERT INTO usuario (nome, nameUsuario, email, telefone, senha) VALUES (?, ?, ?, ?, ?)`;
    db.query(insertSQL, [nome, usuario, email, telefone, senhaHash], (insertErr) => {
      if (insertErr) return res.status(500).json({ error: "Erro ao cadastrar usuário" });
      res.status(201).json({ message: "Usuário cadastrado com sucesso" });
    });
  });
});

router.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) return res.status(400).json({ error: "Usuário e senha são obrigatórios." });

  const SQL = "SELECT * FROM usuario WHERE nameUsuario = ?";
  db.query(SQL, [usuario], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro no servidor." });
    if (results.length === 0) return res.status(401).json({ error: "Usuário não encontrado." });

    const user = results[0];
    bcrypt.compare(senha, user.senha, (err, senhaValida) => {
      if (err) return res.status(500).json({ error: "Erro ao verificar a senha." });
      if (!senhaValida) return res.status(401).json({ error: "Senha incorreta." });

      const token = jwt.sign({
        id: user.idUsuario,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        foto: user.fotoPerfil
      }, JWT_SECRET, { expiresIn: "1h" });

      res.json({
        token,
        user: {
          idUsuario: user.idUsuario,
          nome: user.nome,
          nameUsuario: user.nameUsuario,
          email: user.email,
          telefone: user.telefone,
        }
      });
    });
  });
});

module.exports = router;
