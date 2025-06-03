import React from "react";
import "./navBar.scss";
import marca from "../../assets/marca.png";
import { Link } from "react-router-dom";

export default function NavBar({ procurarFilme, setProcurarFilme, manipularFilme }) {

  // Exibe mensagem se não houver filmes encontrados
  // Este componente não sabe se há filmes ou não, então a lógica deve estar no componente pai.
  // Sugestão: No componente que renderiza a lista de filmes, faça algo assim:

  // if (filmes.length === 0) {
  //   return <div className="mensagem-centralizada">Nenhum filme encontrado.</div>;
  // }


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      manipularFilme();
    }
  };

  return (
    <nav className="navBar">
      <div className="navBar-Start">
        <Link to="/home" className="navBar-logo">
          <img className="logo-img" src={marca} alt="Logo" />
        </Link>
      </div>
      <div className="navBar-half">
        <ul className="navBar-list">
          <li className="navBar-item">
            <Link to="/home" className="navBar-link">F I L M E S</Link>
          </li>
          <li className="navBar-item">
            <Link to="/favoritos" className="navBar-link">F A V O R I T O S</Link>
          </li>
          <li className="navBar-item">
            <Link to="/perfil" className="navBar-link">P E R F I L</Link>
          </li>
        </ul>
      </div>
      <div className="navBar-end">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="input-filme"
          value={procurarFilme}
          onChange={(e) => setProcurarFilme(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </nav>
  );
}

/* 







      <h1 className="titulo">Filmes</h1>
     
















//----------------------search-----------------//

//----------------------search-----------------//


   */
//----------------------search-----------------//
