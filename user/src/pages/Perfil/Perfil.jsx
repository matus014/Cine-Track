import React from "react";
import "./Perfil.css";
import NavBar from "../../componets/navBar/navBar";

const PerfilPage = () => {
  const perfil = {
    name: "????????",
    username: "????????",
    phone: "(11) 4002-8922",
    email: "pedrinhoMilGrausMatadorDeDragoesGame@gmail.com",
    favoriteGenres: ", terrocomédiar, drama, açãocomécomédia, terror, drama, açãocomédror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãodia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, açãocomédia, terror, drama, ação",
    perfilImage: "https://placehold.co/80x80/png?text=perfil+Image&font=Arial",
  };

  return (
    <div className="perfil-container">

    <NavBar/>

    <div className="container-perfil">
    <div className="card">
        <div className="div-image-perfil">
            <img
        src={perfil.perfilImage}
        className="perfil-image"
      />
      <h2 className="perfil-title">{perfil.name}</h2>
      </div>
      
      <div>
    
        <p className="titulo-dado">Usuário</p>
        <hr className="perfil-hr" />
        
        <p className="dado-perfil">{perfil.username}</p>
        <p className="titulo-dado">Dados</p>
        <hr className="perfil-hr" />
        
        <p className="dado-perfil">Telefone: {perfil.phone}</p>
        <p className="dado-perfil">Email: {perfil.email}</p>
        <p className="titulo-dado">Gêneros favoritos</p>
        <hr className="perfil-hr" />
        
        <p className="dado-perfil">{perfil.favoriteGenres}</p>
            
      </div>
    </div>
    </div>
    </div>
  );
};

export default PerfilPage;