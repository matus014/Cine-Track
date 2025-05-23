'use client';

import React, { useEffect, useState } from "react";
import "./movieList.scss"; // Import the CSS file
import axios from "axios";
import MovieCard from "../movie_card/movie_card";
import NavBar from "../navBar/navBar";


export default function Movielist() {
 const [movie, setMovie] = useState([]);


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
    })
  };

  return (
<>
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



