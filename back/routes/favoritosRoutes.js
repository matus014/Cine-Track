const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/favoritos", (req, res) => {
  const { idUsuario, movieId } = req.body;

  const verificarSQL = `SELECT * FROM filmes_favoritos WHERE idUsuario = ? AND movieId = ?`;
  db.query(verificarSQL, [idUsuario, movieId], (err, resultados) => {
    if (err) return res.status(500).json({ error: "Erro ao verificar filme--" });
    if (resultados.length > 0)
      return res.status(409).json({ message: "Filme já está salvo como favorito---" });

    const inserirSQL = `INSERT INTO filmes_favoritos (idUsuario, movieId) VALUES (?, ?)`;
    db.query(inserirSQL, [idUsuario, movieId], (err) => {
      if (err) return res.status(500).json({ error: "Erro ao salvar filme" });
      res.status(201).json({ message: "Filme salvo com sucesso" });
    });
  });
});

router.get("/favoritos/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  const SQL = `SELECT * FROM filmes_favoritos WHERE idUsuario = ?`;
  db.query(SQL, [idUsuario], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar favoritos" });
    res.status(200).json(results);
  });
});

module.exports = router;
