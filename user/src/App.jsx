import { useState } from 'react'
// import './App.css'
import  Cadastrar from'./pages/Tela_Cadastro/Cadastrar'
import Login from './pages/Tela_Login/Login'
import Teste from '../PaginasIncompletas/Tela_LG_CDT_ test/Cadastrar_login'
import NavBar from './componets/navBar/navBar'
import Perfil from './pages/Perfil/Perfil'
import MovieList from './componets/movieList/movieList'
import "./App.css"
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes.jsx';

function App() {
  return (
     <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  
  )
}

export default App
