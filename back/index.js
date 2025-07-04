const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const favoritosRoutes = require("./routes/favoritosRoutes");

app.use(authRoutes);      // /cadastro, /login
app.use(userRoutes);      // /atualizarFotoPerfil
app.use(favoritosRoutes); // /favoritarFilme, /favoritos/:idUsuario

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
