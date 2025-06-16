import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import Menu from './componentes/Menu';
import Home from './paginas/Home';
import ListaFornecedor from './paginas/ListaFornecedor';
import FormFornecedor from './paginas/FormFornecedor';
import ListaProduto from './paginas/ListaProduto';
import FormProduto from './paginas/FormProduto';
import LoginSistema from './componentes/LoginSistema';

function AppContent() {
  const location = useLocation();

  const hideMenuPaths = ['/login']; // rotas onde o Menu não aparece

  return (
    <>
      {!hideMenuPaths.includes(location.pathname) && <Menu />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<LoginSistema />} />

        <Route path='/listafornecedor' element={<ListaFornecedor />} />
        <Route path='/cadastrofornecedor' element={<FormFornecedor />} />
        <Route path='/cadastrofornecedor/:id' element={<FormFornecedor />} />

        <Route path='/listaproduto' element={<ListaProduto />} />
        <Route path='/cadastroproduto' element={<FormProduto />} />
        <Route path='/cadastroproduto/:id' element={<FormProduto />} />

        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
