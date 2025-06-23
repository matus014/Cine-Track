import React, { useState, forwardRef } from 'react';
import './Cadastrar.css';
import fundo from '../../assets/fundo.png';
import logo from '../../assets/logoReversa.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IMaskInput } from 'react-imask';

const TelefoneMaskCustom = forwardRef(function TelefoneMaskCustom(props, ref) {
  const { onChange, name, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 00000-0000"
      definitions={{
        '0': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name, value } })}
      overwrite
    />
  );
});

const Cadastrar = () => {
  const navigate = useNavigate();

  const [UsuarioExistente, setUsuarioExistente] = useState(false);
  const [EmailExistente, setEmailExistente] = useState(false);
  const [TelefoneExistente, setTelefoneExistente] = useState(false);
  const [erros, setErros] = useState({});
  const [values, setValues] = useState({
    nome: '',
    usuario: '',
    email: '',
    telefone: '',
    senha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'usuario') setUsuarioExistente(false);
    if (name === 'email') setEmailExistente(false);
    if (name === 'telefone') setTelefoneExistente(false);

    setValues((prev) => ({
      ...prev,
      [name]: value
    }));

    setErros((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  const validarCampos = () => {
    const novosErros = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

    if (!values.nome) {
      novosErros.nome = "Nome não pode ficar vazio";
    }
    if (!values.usuario) {
      novosErros.usuario = "Usuário não pode ficar vazio";
    }
    if (!values.email) {
      novosErros.email = "Email não pode ficar vazio";
    } else if (!emailRegex.test(values.email)) {
      novosErros.email = "Email inválido. Ex: nome@exemplo.com";
    }
    if (!values.telefone) {
      novosErros.telefone = "Telefone não pode ficar vazio";
    } else if (!telefoneRegex.test(values.telefone)) {
      novosErros.telefone = "Telefone deve estar no formato (99) 99999-9999";
    }
    if (!values.senha) {
      novosErros.senha = "Senha não pode ficar vazia";
    } else if (values.senha.length < 6) {
      novosErros.senha = "A senha deve ter no mínimo 6 caracteres";
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async () => {
  setUsuarioExistente(false);
  setEmailExistente(false);
  setTelefoneExistente(false);

  if (!validarCampos()) {
    toast.error(" Campos Preenchidos Incorretamente!");
    return;
  }

  try {
    const res = await axios.get("http://localhost:3000/VerficarUsuarioExistente");
    const usuariosExistentes = res.data;

    const usuarioJaExiste = usuariosExistentes.some((u) => u.name_usuario === values.usuario);
    const emailJaExiste = usuariosExistentes.some((u) => u.email === values.email);
    const telefoneJaExiste = usuariosExistentes.some((u) => u.telefone === values.telefone);

    setUsuarioExistente(usuarioJaExiste);
    setEmailExistente(emailJaExiste);
    setTelefoneExistente(telefoneJaExiste);

    if (usuarioJaExiste || emailJaExiste || telefoneJaExiste) return;

    const telefoneSomenteNumeros = values.telefone.replace(/\D/g, '');
    const dadosParaCadastro = {
      ...values,
      telefone: telefoneSomenteNumeros
    };

    await axios.post("http://localhost:3000/cadastro", dadosParaCadastro);

    toast.success("Cadastro realizado com sucesso! Redirecionando para o login...", {
      position: "top-center",
      autoClose: 3000,
    });

    setTimeout(() => {
      navigate("/login");
    }, 3000);

  } catch (error) {
    console.error("Erro no cadastro:", error);
    toast.error("Erro ao realizar cadastro. Tente novamente.");
  }
};




  return (
    <div className="container-Cad">
      <div className="cartao-Cad">
        <div className="secao-formulario-Cad">
          <div className="area-subtitulo-Cad">
            <h1 className="titulo-formulario-Cad">CRIE SUA CONTA</h1>
          </div>

          <form className="area-input-Cad" onSubmit={(e) => e.preventDefault()}>
            <TextField
            variant="standard"

              className="input-formulario"
              label="Nome"
              name="nome"
              onChange={handleChange}
              value={values.nome}
              error={!!erros.nome}
              helperText={erros.nome || ''}
            />
            <TextField
            variant="standard"

              className="input-formulario"
              label="Usuário"
              name="usuario"
              onChange={handleChange}
              value={values.usuario}
              error={UsuarioExistente || !!erros.usuario}
              helperText={
                UsuarioExistente
                  ? "Usuário já cadastrado"
                  : erros.usuario || ''
              }
            />
            <TextField
              variant="standard"

              className="input-formulario"
              label="Email"
              name="email"
              onChange={handleChange}
              value={values.email}
              error={EmailExistente || !!erros.email}
              helperText={
                EmailExistente
                  ? "Email já cadastrado"
                  : erros.email || ''
              }
            />

            <TextField
            variant="standard"

              className="input-formulario"
              label="Telefone"
              name="telefone"
              value={values.telefone}
              onChange={handleChange}
              error={TelefoneExistente || !!erros.telefone}
              helperText={
                TelefoneExistente
                  ? "Telefone já cadastrado"
                  : erros.telefone || ''
              }
              InputProps={{
                inputComponent: TelefoneMaskCustom,
              }}
            />

            <TextField
            variant="standard"

              className="input-formulario"
              label="Senha"
              type="password"
              name="senha"
              onChange={handleChange}
              value={values.senha}
              error={!!erros.senha}
              helperText={erros.senha || ''}
              
            />
          </form>
          <button onClick={handleSubmit} className="botao-formulario-Cad" type="button">
            CADASTRAR
          </button>
          <p className="rodape-formulario-Cad">
            Já possui conta? <Link to="/login">entre aqui</Link>
          </p>
        </div>

        <div className="secao-imagem-Cad">
          <img className="fundo-Cad" src={fundo} alt="fundo" />
          <div className="conteudo-imagem-Cad">
            <div className="logo-div-Cad">
              <img alt="logo" height={"200rem"} src={logo} />
            </div>
            <ul className='mensagem-Cad'>
              <li className="descricao-Cad">🔎Busca de Filmes: Pesquise por títulos, diretores, gêneros e muito mais.</li>
              <li className="descricao-Cad">⭐Avaliação: Dê uma nota aos filmes que assistiu.</li>
              <li className="descricao-Cad">📋Comentar: Deixe registrado alguma observação sobre o filme.</li>
              <li className="descricao-Cad">❤️Favoritos: Crie sua própria lista de filmes favoritos para acessar facilmente.</li>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cadastrar;
