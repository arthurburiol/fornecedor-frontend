import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaFornecedor() {
  // Declarando uma variavel useState
  const [dados, setDados] = useState([]);

  const listar = async () => {
    let { data } = await axios.get(`http://localhost:4000/fornecedor`);
    setDados(data);
  }

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Fornecedores"
        descrição="Gerencie aqui os Fornecedores da Loja"
        rota="/cadastrofornecedor"
        botao="Novo Fornecedor"
      />

      <div className="container">
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Alterar</th>
                  <th scope="col">CNPJ</th>
                  <th scope="col">Nome</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Endereço</th>
                  <th scope="col">Telefone</th>

                </tr>
              </thead>
              <tbody>
                {dados.map((d, i) => (
                  <tr>
                    <td>
                      <a className="btn btn-dark" href={`/cadastrofornecedor/${d.idfornecedor}`}>
                        Alterar
                      </a>
                    </td>
                    <td>{d.cnpj}</td>
                    <td>{d.nome}</td>
                    <td>{d.email}</td>
                    <td>{d.endereco}</td>
                    <td>{d.telefone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
