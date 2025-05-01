import React from 'react';
import './navBar.scss';

export default function NavBar({ procurarFilme, setProcurarFilme, manipularFilme }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      manipularFilme();
    }
  };

  return (
    <nav className='navBar'>
      <h1 className="page-title">Filmes</h1>
      <input
        type="text"
        placeholder="Buscar por nome..."
        className="search-input"
        value={procurarFilme}
        onChange={(e) => setProcurarFilme(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </nav>
  );
}




