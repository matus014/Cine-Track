import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../../componets/movie_card/movie_card";
import NavBar from "../../componets/navBar/navBar";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./Favoritos.scss";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1c1c1c",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
  color: "#fff",
};

export default function Favoritos() {
  const [filmesIds, setFilmesIds] = useState([]);
  const [filmesCompletos, setFilmesCompletos] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);
  const [procurarFilme, setProcurarFilme] = useState("");

  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  const fetchFavoritos = () => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!user?.idUsuario) {
      alert("Você precisa estar logado para acessar os favoritos.");
      return;
    }

    axios
      .get(`http://localhost:3000/favoritos/${user.idUsuario}`)
      .then((res) => setFilmesIds(res.data))
      .catch((err) => console.error("Erro ao buscar favoritos:", err));
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  useEffect(() => {
    const fetchFilmesCompletos = async () => {
      const promises = filmesIds.map((filme) =>
        axios.get(`https://api.themoviedb.org/3/movie/${filme.movieId}`, {
          params: {
            api_key: "ee5f701910b4a35dabf3c72875909f62",
            language: "pt-BR",
          },
        })
      );

      try {
        const results = await Promise.all(promises);
        const filmes = results.map((res) => res.data);
        setFilmesCompletos(filmes);
      } catch (error) {
        console.error("Erro ao buscar dados dos filmes na TMDb:", error);
      }
    };

    if (filmesIds.length > 0) {
      fetchFilmesCompletos();
    } else {
      setFilmesCompletos([]);
    }
  }, [filmesIds]);

  const handleRemove = async () => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!user?.idUsuario || !selectedMovie?.id) return;

    try {
      await axios.delete("http://localhost:3000/removerFilme", {
        data: {
          idUsuario: user.idUsuario,
          movieId: selectedMovie.id,
        },
      });

      alert("Filme removido dos favoritos!");
      handleClose();
      fetchFavoritos();
    } catch (error) {
      console.error("Erro ao remover filme dos favoritos:", error);
    }
  };

  const manipularBusca = () => {
    // Aqui é só chamar o set, a filtragem já é automática na renderização
    setProcurarFilme(procurarFilme.trim());
  };

  const filmesFiltrados = filmesCompletos.filter((filme) =>
    filme.title.toLowerCase().includes(procurarFilme.toLowerCase())
  );

  return (
    <>
      <NavBar
        procurarFilme={procurarFilme}
        setProcurarFilme={setProcurarFilme}
        manipularFilme={manipularBusca}
      />

      <div className="movie-list-container">
        <div className="favoritos-div-upper" />

        {filmesFiltrados.length === 0 ? (
          <div className="favoritos-no-movies-message">
            Nenhum filme encontrado!
          </div>
        ) : (
          <div className="favoritos-div-lower">
            <h1 className="favoritos-search-title">
              {procurarFilme
                ? `Favoritos encontrados para: "${procurarFilme}"`
                : "Meus Filmes Favoritos"}
            </h1>

            <ul className="favoritos-list">
              {filmesFiltrados.map((filme) => (
                <div key={filme.id} onClick={() => handleOpen(filme)}>
                  <MovieCard
                    title={filme.title}
                    overview={filme.overview}
                    poster_path={filme.poster_path}
                    vote_average={filme.vote_average}
                  />
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {selectedMovie && (
            <>
              <Typography variant="h6">{selectedMovie.title}</Typography>
              <Typography sx={{ mt: 2 }}>{selectedMovie.overview}</Typography>
              <Typography sx={{ mt: 2 }}>
                Nota: {selectedMovie.vote_average}
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 3 }}
                onClick={handleRemove}
              >
                Remover dos Favoritos
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
