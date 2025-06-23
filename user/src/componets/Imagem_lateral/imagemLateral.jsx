// src/components/ImagemLateral.jsx
import React from "react";
import fundo from "../../assets/fundo.png";
import logo from "../../assets/logoReversa.png";
import "./imagemLateral.scss"; // (você pode mover os estilos relacionados aqui, se quiser)

const ImagemLateral = () => {
  return (
    <div className="secao-imagem">
      <img className="fundo" src={fundo} alt="fundo" />
      <div className="conteudo-imagem">
        <div className="logo-div">
          <img alt="logo" height={"200rem"} src={logo} />
        </div>
        <ul className="mensagem">
          <li className="descricao">
            🔎Busca de Filmes: Pesquise por títulos, diretores, gêneros e muito mais.
          </li>
          <li className="descricao">
            ⭐Avaliação: Dê uma nota aos filmes que assistiu.
          </li>
          <li className="descricao">
            📋Comentar: Deixe registrado alguma observação sobre o filme.
          </li>
          <li className="descricao">
            ❤️Favoritos: Crie sua própria lista de filmes favoritos para acessar facilmente.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImagemLateral;