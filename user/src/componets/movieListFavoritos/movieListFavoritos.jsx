import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Favoritos.scss";
import MovieCard from "../movie_card/movie_card";
import NavBar from "../navBar/navBar";
import { Typography } from "@mui/material";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!user?.idUsuario) {
      alert("Você precisa estar logado para acessar os favoritos.");
      return;
    }

    axios
      .get(`http://localhost:3000/favoritos/${user.idUsuario}`)
      .then((res) => setFavoritos(res.data))
      .catch((err) => console.error("Erro ao buscar favoritos:", err));
  }, []);

  return (
    <>
      <NavBar />
      <div className="favoritos-container">
        <Typography variant="h4" color="white" align="center">
          Meus Favoritos
        </Typography>

        {favoritos.length === 0 ? (
          <Typography color="white" align="center" sx={{ mt: 4 }}>
            Você ainda não salvou nenhum filme.
          </Typography>
        ) : (
          <div className="favoritos-grid">
            {favoritos.map((f) => (
              <div
                key={f.movie_id}
                className="favorito-item"
                onClick={() => window.open(`/movie/${f.movie_id}`, "_blank")}
              >
                <MovieCard
                  title={f.title}
                  overview={f.overview}
                  poster_path={f.poster_path}
                  vote_average={f.vote_average}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}