const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const favoritosRoutes = require("./routes/favoritosRoutes");

app.use(authRoutes);
app.use(userRoutes);
app.use(favoritosRoutes);

module.exports = app;
