import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import Menu from './componentes/Menu';
import Home from './paginas/Home';
import ListaFornecedor from './paginas/ListaFornecedor';
import FormFornecedor from './paginas/FormFornecedor';
import ListaProduto from './paginas/ListaProduto';
import FormProduto from './paginas/FormProduto';
import FormEstoque from './paginas/FormEstoque';
import FormBaixaEstoque from './paginas/FormBaixaEstoque';
import ListaUsuario from './paginas/ListaUsuario';
import FormUsuario from './paginas/FormUsuario';
import PaginaSegura from './componentes/PaginaSegura';
import Api from './servico/Api';
import { useEffect } from 'react';
import LoginSistema from './paginas/LoginSistema';

function AppContent() {

  useEffect(() => {
    Api.setTokenAxios();
  }, []);

  const location = useLocation();

  const hideMenuPaths = ['/login']; // rotas onde o Menu não aparece

  return (
    <>
      {!hideMenuPaths.includes(location.pathname) && <Menu />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/listaestoque' element={<Home />} />
        <Route path='/gerenciaestoque' element={<PaginaSegura> <FormEstoque /> </PaginaSegura> } /> --aqui é dada a entrada de um produto no estoque
        <Route path="/baixaestoque/:id" element={<PaginaSegura> <FormBaixaEstoque /> </PaginaSegura> } />-- aqui é a baixa do estoque

        <Route path='/login' element={<LoginSistema />} />
        <Route path='/listausuario' element={<PaginaSegura> <ListaUsuario /> </PaginaSegura> } />
        <Route path='/cadastrousuario' element={<FormUsuario />} />
        <Route path='/cadastrousuario/:id' element={<PaginaSegura> <FormUsuario /> </PaginaSegura> } />

        <Route path='/listafornecedor' element={<PaginaSegura> <ListaFornecedor /> </PaginaSegura>} />
        <Route path='/cadastrofornecedor' element={<PaginaSegura> <FormFornecedor /> </PaginaSegura>} />
        <Route path='/cadastrofornecedor/:id' element={<PaginaSegura> <FormFornecedor /> </PaginaSegura>} />

        <Route path='/listaproduto' element={<PaginaSegura> <ListaProduto /> </PaginaSegura> } />
        <Route path='/cadastroproduto' element={<PaginaSegura> <FormProduto /> </PaginaSegura> } />
        <Route path='/cadastroproduto/:id' element={<PaginaSegura> <FormProduto /> </PaginaSegura> } />

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
