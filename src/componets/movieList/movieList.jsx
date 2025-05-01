'use client';

import React, { useEffect, useState } from "react";
import "./movieList.scss"; // Import the CSS file
import axios from "axios";
import MovieCard from "../movie_card/movie_card";
import NavBar from "../navBar/navBar";


export default function Movielist() {
 const [movie, setMovie] = useState([]);


const page = 10 //pagina
//criar  metodo para navegar  pagina



useEffect(() =>{
    getMovies();
}, []);

  const getMovies = () => {
    axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params:{
            api_key:'ee5f701910b4a35dabf3c72875909f62',
            language: 'pt-BR'
        },
        
    }).then(response =>{
        setMovie(response.data.results);
        console.log(response.data.results)
    })
  };




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

  return (
<>
    <NavBar
    procurarFilme={procurarFilme}
    setProcurarFilme={setProcurarFilme}
    manipularFilme={procurarFilmes}
  />
    <ul className="movie-list">
      {movie.map((element) => (
        <MovieCard
        key={element.id}
        title={element.title}
        overview={element.overview}
        poster_path={element.poster_path}
        vote_average={element.vote_average}/>
      ))}
    </ul>
    </>
  );
}



