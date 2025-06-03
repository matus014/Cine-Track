
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home/Home.jsx';
import Cadastro from '../pages/Tela_Cadastro/Cadastrar.jsx';
import Login from '../pages/Tela_Login/Login.jsx';
import Perfil from '../pages/Perfil/Perfil.jsx';
import NavBar from '../componets/navBar/navBar.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redireciona a rota "/" para /cadastro */}
      
      <Route path="/home" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}