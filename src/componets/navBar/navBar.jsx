import React from "react";
import "./navBar.scss";
import marca from "../../assets/marca.png";

export default function NavBar({ procurarFilme, setProcurarFilme, manipularFilme }) {


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      manipularFilme();
    }
  };

  return (
    <nav className="navBar">
      <div className="navBar-Start">
        <a href="#home" className="navBar-logo"> 
        <img className="logo-img" src={marca}/>
        </a>
      </div>
      <div className="navBar-half">
        <ul className="navBar-list">
          <li className="navBar-item">
            <a href="#home" className="navBar-link">Home</a>
          </li>
          <li className="navBar-item">
            <a href="#filmes" className="navBar-link">Filmes</a>
          </li>
          <li className="navBar-item">
            <a href="#series" className="navBar-link">Séries</a>
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
        onKeyDown={manipularFilme}
      />
      </div>
    
    </nav>
  );
}

/* 







      <h1 className="titulo">Filmes</h1>
     
















//----------------------search-----------------//
  const [procurarFilme, setProcurarFilme] = useState('');

  const procurarFilmes = () => {
    if (!procurarFilme.trim()) return;

    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: 'ee5f701910b4a35dabf3c72875909f62',
        language: 'pt-BR',
        query: procurarFilme
      }
    }).then(response => {
      const sorted = response.data.results.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setMovie(sorted);
    });
  };
//----------------------search-----------------//

<NavBar
    procurarFilme={procurarFilme}
    setProcurarFilme={setProcurarFilme}
    manipularFilme={procurarFilmes}
  />
   */
//----------------------search-----------------//
