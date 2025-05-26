import React, { useState } from 'react';
import './TelaInicial.css';

export default function NomeJogador({ onContinuar }) {
  const [nome, setNome] = useState('');

  const handleSubmit = () => {
    if (nome.trim() === '') return;
    onContinuar(nome);
  };

  return (
    <div className="tela-inicial-cruzadinha">
      <h1 className="titulo">Qual é o seu nome?</h1>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="input-nome"
      />
      <button className="botao-jogar" onClick={handleSubmit}>
        Começar Jogo
      </button>
    </div>
  );
}
