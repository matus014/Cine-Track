import React from 'react';
import './Cadastrar.css';
import fundo from '../../assets/fundo.png'
import logo from '../../assets/logoReversa.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Cadastrar = () => {
  const [form, setForm] = useState({
    usuario: '',
    nome: '',
    email: '',
    telefone: '',
    senha: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/cadastrar', form)
      .then(response => {
        console.log('Cadastro realizado com sucesso:', response.data);

      })
      .catch(error => {
        console.error('Erro ao cadastrar:', error);
        // Tratar erro, exibir mensagem ao usuário, etc.
      });
  }

  return (
    <div className="container-Cad">
      <div className="cartao-Cad">
        <div className="secao-formulario-Cad">
          <h1 className="titulo-formulario-Cad">
            CRIE SUA CONTA
          </h1>
          <div className="area-subtitulo-Cad">
            <h2 className="subtitulo-formulario-Cad">
              Cadastre-se
            </h2>
          </div>
          {/*-------------area inputs----------------------*/}
          <form className="area-input-Cad">
            <input
              className="input-formulario"
              placeholder="Nome"
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
            />
            <input
              className="input-formulario"
              placeholder="Usuario"
              type="text"
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
            />
            <input
              className="input-formulario"
              placeholder="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              className="input-formulario"
              placeholder="Telefone"
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
            />
            <input
              className="input-formulario"
              placeholder="Senha"
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
            />
            <button  onSubmit={handleSubmit} className="botao-formulario" type="submit">
              CADASTRAR
            </button>
          </form>
          {/*---------------area login/cadastro-------------*/}
          <p className="rodape-formulario-Cad">
            Já possui conta?
            <Link to="/login">
              entre aqui
            </Link>
          </p>
          {/* --------------------------- */}
        </div>
        <div className="secao-imagem-Cad">
          <img className="fundo" src={fundo} />
          <div className="conteudo-imagem-Cad">
            <div className="logo-div-Cad">
              <img alt="logo" height={"200rem"} src={logo} />
            </div>
            <ul className='mensagem'>
              <li className="descricao-Cad">
                🔎Busca de Filmes: Pesquise por títulos, diretores, gêneros e muito mais.
              </li>
              <li className="descricao-Cad">
                ⭐Avaliação: Dê uma nota aos filmes que assistiu.
              </li>
              <li className="descricao-Cad">
                📋Comentar: Deixe registrado alguma observação sobre o filme.
              </li>
              <li className="descricao-Cad">
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