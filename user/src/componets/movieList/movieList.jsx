// Atualize este código com os novos imports e modal funcional
import React, { useEffect, useState } from "react";
import "./movieList.scss";
import axios from "axios";
import MovieCard from "../movie_card/movie_card";
import NavBar from "../navBar/navBar";
import { Pagination, Modal, Box, Button, Typography } from "@mui/material";

const style = {
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

export default function Movielist() {
  const [movie, setMovie] = useState([]);
  const [procurarFilme, setProcurarFilme] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(500);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    console.log(movie)
    setOpen(true);
  };

  useEffect(() => {
    if (procurarFilme.trim()) {
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: "ee5f701910b4a35dabf3c72875909f62",
            language: "pt-BR",
            query: procurarFilme,
            page: page,
          },
        })
        .then((response) => {
          let resultado = response.data.results.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setMovie(resultado);
          setTotalPages(response.data.total_pages);
        });
    } else {
      getMovies();
    }
  }, [page]);

  const procurarFilmes = () => {
    if (!procurarFilme.trim()) return;

    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: "ee5f701910b4a35dabf3c72875909f62",
          language: "pt-BR",
          query: procurarFilme,
        },
      })
      .then((response) => {
        setTotalPages(response.data.total_pages);
        let resultado = response.data.results.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setMovie(resultado);
      });
  };

  const getMovies = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "ee5f701910b4a35dabf3c72875909f62",
        language: "pt-BR",
        page: page,
      },
    }).then((response) => {
      setMovie(response.data.results);
    });
  };

  console.log("ID do usuário logado:", localStorage.getItem("usuarioLogado"));

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  const handleSave = async () => {
    try {
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
      const idUsuario = usuarioLogado?.idUsuario;

      if (!idUsuario) {
        alert("Você precisa estar logado para salvar filmes.");
        return;
      }
  
      const fIlmeUsuario = { 
        idUsuario,
        movieId: selectedMovie.id,
      }
      console.log(selectedMovie)
       await axios.post("http://localhost:3000/salvarFilme", fIlmeUsuario);
    
      alert("Filme salvo com sucesso!");
 
    } catch (error) {
      console.error("Erro ao salvar filme1:", error);
    }
  };
  return (
    <>
      <NavBar
        procurarFilme={procurarFilme}
        setProcurarFilme={setProcurarFilme}
        manipularFilme={() => {
          setPage(1);
          procurarFilmes();
        }}
      />

      <div className="movie-list-container">
        <div className="movie-div-upper" />

        {movie.length === 0 && (
          <div className="no-movies-message">Nenhum filme encontrado!</div>
        )}

        <div className="movie-div-lower">
          <h1 className="result-search-title">
            {procurarFilme.trim()
              ? `Resultado de busca: "${procurarFilme}"`
              : "Filmes"}
          </h1>

          <ul className="movie-list">
            {movie.map((element) => (
              <div key={element.id} onClick={() => handleOpen(element)}>
                <MovieCard
                  title={element.title}
                  overview={element.overview}
                  poster_path={element.poster_path}
                  vote_average={element.vote_average}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>

      <Pagination
        className="pagination"
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        boundaryCount={2}
        siblingCount={1}
        showFirstButton
        showLastButton
        size="large"
        variant="outlined"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
            borderColor: "white",
          },
          "& .Mui-selected": {
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
          },
        }}
      />

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {selectedMovie && (
            <>
              <Typography variant="h6">{selectedMovie.title}</Typography>
              <Typography sx={{ mt: 2 }}>{selectedMovie.overview}</Typography>
              <Typography sx={{ mt: 2 }}>
                Nota: {selectedMovie.vote_average}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handleSave}
              >
                Salvar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
