import { useState } from 'react'
import Movielist from '../../componets/movieList/movieList'
import NavBar from '../../componets/navBar/navBar'
import fundo_home from"../../assets/fundo.png"
import './Home.css'
// import './App.css'



function Home() {
  return (
    <div
      className="home-container"
      style={{backgroundImage: `url(${fundo_home})`,backgroundSize: 'cover',height: 'max-content',}}>
      <Movielist />
    </div>
  )
}

export default Home
