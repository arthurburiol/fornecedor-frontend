import { useEffect, useState } from "react";
import axios from "axios";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    Produtos();
    Fornecedores();
    buscarEstoque(); 
  }, []);

  const Produtos = async () => {
    const { data } = await axios.get("http://localhost:4000/produto");
    setProdutos(data);
  };

  const Fornecedores = async () => {
    const { data } = await axios.get("http://localhost:4000/fornecedor");
    setFornecedores(data);
  };

  const buscarEstoque = async () => {
    const { data } = await axios.get("http://localhost:4000/estoque");
    setEstoque(data);
  };

  const nomeProduto = (produto_id) => {
    const produto = produtos.find((p) => p.id === produto_id);
    return produto ? produto.nome : "Produto não encontrado";
  };

  const nomeFornecedor = (fornecedor_id) => {
    const fornecedor = fornecedores.find((f) => f.id === fornecedor_id);
    return fornecedor ? fornecedor.nome : "Fornecedor não encontrado";
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3 mt-3 text-dark">Estoque de Produtos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Valor</th>
            <th>Fornecedor</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map((item) => {
            const produto = produtos.find((p) => p.id === item.produto_id);
            return (
              <tr key={item.id}>
                <td>{nomeProduto(item.produto_id)}</td>
                <td>{produto ? `R$ ${produto.valor_unitario}` : "—"}</td>
                <td>{produto ? nomeFornecedor(produto.fornecedor_id) : "—"}</td>
                <td>{item.quantidade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

