import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import React from "react";
import logo from '../assets/img.webp';

export default function LoginSistema() {
  const navegacao = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = async () => {
      //montar o json do body com todos os campos que precisam ser enviados
      let body = {
          "senha": senha,
          "email": email
      };

      try {
          const resposta = await axios.put(`http://localhost:4000/loginusuario`, body);
          if (resposta.status === 200) {
              const token = resposta.data;
              cookie.set('token', token);
              navegacao('/');
          }
      }
      catch (erro) {
          alert(`Usuário ou Senha inválidos.`);
      }
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow p-4 rounded-5" style={{ width: "22rem" }}>
        <img
          src={logo}
          className="card-img-top mb-3 mx-auto d-block"
          alt="Imagem Login"
          style={{ width: 200 }}
        />
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="e-mail"
              className="form-control"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(evento) => setSenha(evento.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <button className="btn btn-dark w-100"
            onClick={() => login()}>
            Login
          </button>

          <a className="btn" href={`http://localhost:3000/cadastrousuario`}>
            Realizar Cadastro
          </a>
        </div>
      </div>
    </div>
  );
}
