import React from 'react';
import './TelaInicial.css';
import somAbertura from '../assets/game-intro-345507.mp3';

export default function TelaInicial({ onStart }) {
  const handleStart = () => {
    const audio = new Audio(somAbertura);
    audio.volume = 1.0;
    audio.play().catch(e => console.warn("Erro ao tocar som:", e));
    onStart();
  };

  return (
    <div className="tela-inicial-cruzadinha">
      <h1 className="titulo">Cruzadinha Lógica</h1>
      <button className="botao-jogar" onClick={handleStart}>
        Jogar
      </button>
    </div>
  );
}
