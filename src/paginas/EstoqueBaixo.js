import React, { useEffect, useState } from "react";
import axios from "axios";

function EstoqueBaixo() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/estoquebaixo")
      .then((res) => {
        setProdutos(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar estoque baixo:", err);
        setErro("Erro ao buscar dados do estoque");
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Produtos com Estoque Baixo</h2>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      {produtos.length === 0 ? (
        <div className="alert alert-info">
          Nenhum produto com estoque baixo encontrado.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Fornecedor</th>
                <th>Estoque Atual</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((item) => (
                <tr key={item.produto_id}>
                  <td>{item.produto_id}</td>
                  <td>{item.nome_produto}</td>
                  <td>{item.nome_fornecedor}</td>
                  <td>{item.estoque_atual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EstoqueBaixo;
