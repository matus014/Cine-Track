const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Terraria1.23",
  database: "cine_track",
});

app.use(cors());
app.use(express.json());


app.post("/cadastro", (req, res) => {
  const { nome, usuario, email, telefone, senha } = req.body;
  const SQL = `
    SELECT nameUsuario, email, telefone FROM usuario 
    WHERE nameUsuario = ? OR email = ? OR telefone = ?
  `;
  db.query(SQL, [usuario, email, telefone], (err, results) => {
    if (err) {
      console.error("Erro ao verificar:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    if (results.length > 0) {
      const conflicts = [];
      results.forEach((row) => {
        if (row.usuario === usuario) conflicts.push("nameUsuario");
        if (row.email === email) conflicts.push("email");
        if (row.telefone === telefone) conflicts.push("telefone");
      });
      console.log("Conflitos encontrados:", conflicts);
      return res
        .status(409)
        .json({ error: `Já cadastrado: ${conflicts.join(", ")}` });
    }

    const insertSQL =
      "INSERT INTO usuario (nome, nameUsuario, email, telefone, senha) VALUES (?, ?, ?, ?, ?)";

    db.query(
      insertSQL,
      [nome, usuario, email, telefone, senha],
      (insertErr, result) => {
        if (insertErr) {
          console.error("Erro ao cadastrar:", insertErr);
          return res.status(500).json({ error: "Erro ao cadastrar usuário" });
        }
        return res
          .status(201)
          .json({ message: "Usuário cadastrado com sucesso" });
      }
    );
  });
});



app.get("/VerficarUsuarioExistente", (req, res) => {
  const SQL = "SELECT * FROM usuario";
  db.query(SQL, (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    return res.status(200).json(results);
  });
});



app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  const SQL = "SELECT * FROM usuario WHERE nameUsuario = ? AND senha = ?";
  db.query(SQL, [usuario, senha], (err, results) => {
    if (err) {
      console.error("Erro ao fazer login:", err);
      return res.status(500).json({ error: "Erro no servidor." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuário ou senha inválidos." });
    }

    const user = results[0];
    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        idUsuario: user.idUsuario,
        nome: user.nome,
        nameUsuario: user.nameUsuario,
        email: user.email,
        telefone: user.telefone
      },
    });
  });
});




app.post("/salvarFilme", (req, res) => {

  const { idUsuario, movieId} = req.body;

  const verificarSQL = `
    SELECT * FROM filmes_favoritos 
    WHERE idUsuario = ? AND movieId = ?
  `;

  db.query(verificarSQL, [idUsuario, movieId], (verificarErr, resultados) => {
    if (verificarErr) {
      console.error("Erro ao verificar filme:", verificarErr);
      return res.status(500).json({ error: "Erro ao verificar filme" });
    }

    if (resultados.length > 0) {
      return res.status(409).json({ message: "Filme já está salvo como favorito" });
    }

    const inserirSQL = `
      INSERT INTO filmes_favoritos 
      (idUsuario, movieId) 
      VALUES (?, ?)
    `;

    db.query(
      inserirSQL,
      [idUsuario, movieId],
      (inserirErr, resultado) => {
        if (inserirErr) {
          console.error("Erro ao salvar filme:", inserirErr);
          return res.status(500).json({ error: "Erro ao salvar filme" });
        }

        res.status(201).json({ message: "Filme salvo com sucesso" });
      }
    );
  });
});




app.get("/favoritos/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  const SQL = `
    SELECT * FROM filmes_favoritos WHERE idUsuario = ?
  `;
  db.query(SQL, [idUsuario], (err, results) => {
    if (err) {
      console.error("Erro ao buscar favoritos:", err);
      return res.status(500).json({ error: "Erro ao buscar favoritos" });
    }
    res.status(200).json(results);
  });
});





app.listen(3000, () => {
  console.log("Sservidor rodando  3000");
});
