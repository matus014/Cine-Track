import React, { useState } from "react";
import "../Tela_Cadastro/Cadastrar.css";
import fundo from '../../assets/fundo.png'
import logo from '../../assets/logoReversa.png'

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  const handleCadastro = (e) => {
    e.preventDefault();
    alert("Cadastro realizado com sucesso!"); // Substitua por lógica real de cadastro
  };

  return (
    <div className="container">
      <div className={`cartao ${isLogin ? "login" : "cadastro"}`}>
        
        {isLogin ? (
          //Login
          <div className="secao-formulario">
            <h1 className="titulo-formulario">CineTrack</h1>
            <h2 className="subtitulo-formulario">Encontre facilmente seus filmes favoritos!</h2>
            <form className="area-input">
              <input className="input-formulario" placeholder="Usuário" type="text" />
              <input className="input-formulario" placeholder="Senha" type="password" />
              <button className="botao-formulario" type="submit">ENTRAR</button>
            </form>
            <p className="rodape-formulario">
              Não tem uma conta?
              <span  style={{ color: "blue",   cursor:"pointer"}} onClick={() => setIsLogin(false)}>
                cadastre-se aqui →
              </span>
            </p>
          </div>
        ) : (
          //cadastro
          <div className="secao-formulario">
            <h1 className="titulo-formulario">CRIE SUA CONTA</h1>
            <h2 className="subtitulo-formulario">Cadastre-se</h2>
            <form className="area-input" onSubmit={handleCadastro}>
              <input className="input-formulario" placeholder="Usuário" type="text" />
              <input className="input-formulario" placeholder="Nome" type="text" />
              <input className="input-formulario" placeholder="Email" type="email" />
              <input className="input-formulario" placeholder="Telefone" type="tel" />
              <input className="input-formulario" placeholder="Senha" type="password" />
              <button className="botao-formulario" type="submit">CADASTRAR</button>
            </form>
            <p className="rodape-formulario">
              Já possui conta?
              <span style={{ color: "blue", cursor:"pointer"}}  onClick={() => setIsLogin(true)}>
                entre aqui →
              </span>
            </p>
          </div>
        )}

        {/* Seção da imagem */}
        <div className="secao-imagem">
          <img className="fundo" src={fundo} alt="Fundo" />
          <div className="conteudo-imagem">
            <div className="logo-div">
              <img alt="logo" height="200rem" src={logo} />
            </div>
                  <ul className='mensagem'>
              <li className ="descricao">
              🔎Busca de Filmes: Pesquise por títulos, diretores, gêneros e muito mais.
              </li>
              <li className ="descricao">
              ⭐Avaliação: Dê uma nota aos filmes que assistiu.
              </li>
              <li className ="descricao">
              📋Comentar: Deixe registrado alguma observação sobre o filme.
              </li>
              <li className ="descricao">
              ❤️Favoritos: Crie sua própria lista de filmes favoritos para acessar facilmente.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}