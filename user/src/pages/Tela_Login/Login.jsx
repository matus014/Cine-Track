import React, { useState } from "react";
import "./Login.css";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import ImagemLateral from "../../componets/Imagem_lateral/imagemLateral"; // ajuste se necessário

const Login = () => {
  const [values, setValues] = useState({ usuario: "", senha: "" });
  const [erros, setErros] = useState({});

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleMostrarSenha = () => {
    setMostrarSenha((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErros((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const novosErros = {};

    if (!values.usuario) novosErros.usuario = "Usuário obrigatório";
    if (!values.senha) novosErros.senha = "Senha obrigatória";

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    try {
      const response = await axios.post("http://localhost:3000/login", values);
      alert(response.data.message);

      // Salva o usuário logado no localStorage
      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify({
          idUsuario: response.data.user.idUsuario,
          nome: response.data.user.nome,
          name_usuario: response.data.user.name_Usuario,
          email: response.data.user.email,
          telefone: response.data.user.telefone,
        })
      );
    console.log("Usuário logado:", response.data.user);
      // Redireciona para a página /home
   window.location.href = "/home";
    } catch (error) {
      const msg = error.response?.data?.error || "Erro ao fazer login.";
      alert(msg);
    }
  };

  return (
    <div className="container">
      <div className="cartao">
        <ImagemLateral />

        <div className="secao-formulario-login">
          <h1 className="titulo-formulario-login">CineTrack</h1>
          <h2 className="subtitulo-formulario-login">
            Encontre facilmente seus filmes favoritos!
          </h2>

          <form className="area-input">
            <TextField
              variant="standard"
              className="input-formulario"
              label="Usuário"
              name="usuario"
              onChange={handleChange}
              value={values.usuario}
              error={!!erros.usuario}
              helperText={erros.usuario || ""}
            />
            <TextField
              variant="standard"
              className="input-formulario"
              label="Senha"
              type={mostrarSenha ? "text" : "password"}
              name="senha"
              onChange={handleChange}
              value={values.senha}
              error={!!erros.senha}
              helperText={erros.senha || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleMostrarSenha} edge="end">
                      {mostrarSenha ? <FiEyeOff /> : <FiEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
          <button
            className="botao-formulario-login"
            onClick={handleLogin}
            type="submit"
          >
            ENTRAR
          </button>

          <p className="rodape-formulario-login">
            Não tem uma conta?{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              cadastre-se aqui
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
