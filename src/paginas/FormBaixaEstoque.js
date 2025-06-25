import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormBaixaEstoque() {
  const navegacao = useNavigate();
  const { id } = useParams();
  const [quantidade, setQuantidade] = useState('');
  const [produto, setProduto] = useState('');

  const buscarProdutos = async () => {
      const { data } = await axios.get(`http://localhost:4000/produto/${id}`);
      setProduto (data.nome);
  };

  useEffect(() => {
    buscarProdutos();
  });

  const salvar = async () => {
    try {
      if (!id || !quantidade || quantidade <= 0) {
        alert("Informe o produto e uma quantidade válida.");
        return;
      }

      await axios.put(`http://localhost:4000/estoque/baixa/${id}`, {
        quantidade: parseInt(quantidade),
      });

      alert("Baixa realizada com sucesso!");
      navegacao("/estoque");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.mensagem || "Erro ao realizar a baixa de estoque.");
    }
  };

  return (
    <div className="container mt-4">
      <TituloCadastro titulo="Baixa de Estoque" />

      <div className="row mt-4">
        <div className="col-md-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            salvar();
          }}>
            <div className="mb-3">
              <label className="form-label">Produto</label>
              <input
                type="text"
                className="form-control"
                value={produto}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Quantidade a retirar</label>
              <input
                type="number"
                className="form-control"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>

            <div className="d-flex gap-2 mb-5">
              <button type="submit" className="btn btn-danger">Realizar Baixa</button>
              <button type="button" className="btn btn-secondary" onClick={() => navegacao("/estoque")}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}