import React, { useEffect, useState } from "react";
import "./movieList.scss";
import axios from "axios";
import MovieCard from "../movie_card/movie_card";
import NavBar from "../navBar/navBar";
import { Pagination } from "@mui/material";

export default function Movielist() {
  const [movie, setMovie] = useState([]);
  const [procurarFilme, setProcurarFilme] = useState('');
  const [page, setPage] = useState(1);  
  const [totalPages, setTotalPages] = useState(500);

  useEffect(() => {
    if (procurarFilme.trim()) {
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'ee5f701910b4a35dabf3c72875909f62',
          language: 'pt-BR',
          query: procurarFilme,
          page: page
        }
      }).then(response => {
        let resultado = response.data.results.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setMovie(resultado);
        setTotalPages(response.data.total_pages);

      });
    } else {
      getMovies();

    }
    // eslint-disable-next-line
  },[page]);


  const procurarFilmes = () => {
    if (!procurarFilme.trim()) return;

    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: 'ee5f701910b4a35dabf3c72875909f62',
        language: 'pt-BR',
        query: procurarFilme,
      }
    }).then(response => {

      setTotalPages(response.data.total_pages);

      let resultado = response.data.results.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      console.log(re);
      setMovie(resultado);
    });
  };




  const getMovies = () => {
    axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/discover/movie',
      params: {
        api_key: 'ee5f701910b4a35dabf3c72875909f62',
        language: 'pt-BR',
        page: page
      },
    }).then(response => {
      setMovie(response.data.results);
       // Atualiza o total de páginas
      console.log(response.data);
    })
  };


  return (
    <>
      <NavBar
        procurarFilme={procurarFilme}
        setProcurarFilme={setProcurarFilme}
        manipularFilme={() => {
          setPage(1); // Reset page to 1 when searching
          procurarFilmes();
        }}
      />

      <div className="movie-list-container">
        <div className="movie-div-upper"> 
          <h1 className="result-search-title">
            {procurarFilme.trim() ? `Resultado de busca: "${procurarFilme}"` : "Filmes"}
          </h1>
        </div>
        {movie.length === 0 && (
          <div className="no-movies-message">
            Nenhum filme encontrado!
          </div>
        )}
        <ul className="movie-list">
          {movie.map((element) => (
            <MovieCard
              key={element.id}
              title={element.title}
              overview={element.overview}
              poster_path={element.poster_path}
              vote_average={element.vote_average}
            />
          ))}
        </ul>
      </div>
      {/* Pagination component from Material-UI */}
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
          '& .MuiPaginationItem-root': {
            color: 'white',
            borderColor: 'white',
          },
          '& .Mui-selected': {
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
          },
        }}
      />
    </>
  );
}