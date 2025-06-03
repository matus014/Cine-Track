import React from "react";
import "./Login.css"; // Import the CSS file
import fundo from "../../assets/fundo.png";
import logo from "../../assets/logoReversa.png";





const Login = () => {
  return (
    <div class="container">
      <div class="cartao">
        <div class="secao-imagem">
          <img class="fundo" src={fundo} />
          <div class="conteudo-imagem">
            <div class="logo-div">
              <img alt="logo" height={"200rem"} src={logo} />
            </div>
            <ul className="mensagem">
              <li className="descricao">
                🔎Busca de Filmes: Pesquise por títulos, diretores, gêneros e
                muito mais.
              </li>
              <li className="descricao">
                ⭐Avaliação: Dê uma nota aos filmes que assistiu.
              </li>
              <li className="descricao">
                📋Comentar: Deixe registrado alguma observação sobre o filme.
              </li>
              <li className="descricao">
                ❤️Favoritos: Crie sua própria lista de filmes favoritos para
                acessar facilmente.
              </li>
            </ul>
          </div>
        </div>
        <div className="secao-formulario">
          <h1 className="titulo-formulario">CineTrack</h1>
          <h2 className="subtitulo-formulario">
            Encontre facilmente seus filmes favoritos!
          </h2>
          <form className="area-input">
            <input
              className="input-formulario"
              placeholder="Usuário"
              type="text"
            />
            <input
              className="input-formulario"
              placeholder="Senha"
              type="password"
            />
            <button className="botao-formulario" type="submit" onAbort={(e) => e.preventDefault()}>
              ENTRAR
            </button>
          </form>
          <p className="rodape-formulario">
            Não tem uma conta? 
            
            <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setIsLogin(false)} >
             cadastre-se aqui →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
