import { useState } from 'react'
import Movielist from '../../componets/movieList/movieList'
import NavBar from '../../componets/navBar/navBar'
import './Home.css'
// import './App.css'



function Home() {
  return (
    <div className="home-container">
    <Movielist /> 
    </div>
  )
}

export default Home
