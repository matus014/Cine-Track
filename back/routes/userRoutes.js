const express = require("express");
const router = express.Router();
const db = require("../db");

router.put("/fotoPerfil", (req, res) => {
  const { idUsuario, fotoPerfil } = req.body;

  const SQL = "UPDATE usuario SET fotoPerfil = ? WHERE idUsuario = ?";
  db.query(SQL, [idUsuario, fotoPerfil], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao atualizar imagem de perfil---" });
    res.status(200).json({ message: "Foto de perfil atualizada com sucesso---" });
  });
});

module.exports = router;
