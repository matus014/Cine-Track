import React from 'react';
import './Cadastrar.css'; // Import the CSS file
import fundo from '../../assets/fundo.png'
import logo from '../../assets/logoReversa.png'
const Cadastrar=()=>{
    return (
<div class="container">

  <div class="cartao">
   <div class="secao-formulario">
    <h1 class="titulo-formulario">
     CRIE SUA CONTA
    </h1>
    <div class="area-subtitulo">
    <h2 class="subtitulo-formulario">
     Cadastre-se
    </h2>
    </div>
    <form class="area-input">
     <input class="input-formulario" placeholder="Usuario" type="text"/>
     <input class="input-formulario" placeholder="Nome" type="text"/>
     <input class="input-formulario" placeholder="Email" type="email"/>
     <input class="input-formulario" placeholder="Telefone" type="tel"/>
     <input class="input-formulario" placeholder="Senha" type="password"/>
     <button class="botao-formulario" type="submit">
      CADASTRAR
     </button>
    </form>
    <p class="rodape-formulario">
     Já possui conta?
     <a href="#">
      entre aqui
     </a>
    </p>
   </div>
   <div class="secao-imagem">
    <img class="fundo" src={fundo}/>
    <div class="conteudo-imagem">
     <div class="logo-div">
     <img alt="logo" height={"200rem"} src={logo}/> 
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
};

export default Cadastrar;