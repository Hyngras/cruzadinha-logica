import React, { useState } from "react";
import "./App.css";
import TelaInicial from './pages/TelaInicial';
import NomeJogador from './pages/NomeJogador';
import premissas from './data/premissas.json';
import somAcerto from './assets/acerto-notification-337658.mp3';
import somErro from './assets/erro-sound-effect-319090.mp3';

const stopwords = ['os', 'as', 'um', 'uma', 'o', 'a', 'que', 'de', 'do', 'da', 'dos', 'das'];

function limparFrase(frase) {
  return frase
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .split(' ')
    .filter(palavra => !stopwords.includes(palavra))
    .join(' ');
}

function App() {
  const [tela, setTela] = useState('inicio');
  const [nomeJogador, setNomeJogador] = useState('');
  const [rodadaAtual, setRodadaAtual] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [premises, setPremises] = useState([]);
  const [verificacao, setVerificacao] = useState([]);
  const [result, setResult] = useState("");
  const [pontos, setPontos] = useState(0);
  const [rodadaFinalizada, setRodadaFinalizada] = useState(false);

  const dados = premissas[rodadaAtual];
  const conclusion = dados?.conclusao || '';
  const correctPremises = dados?.premissasCorretas || [];
  const wordPool = dados?.palavras || [];

  const handleWordClick = (word) => {
    setSelectedWords([...selectedWords, word]);
  };

  const handleUndo = () => {
    setSelectedWords(selectedWords.slice(0, -1));
  };

  const handleConfirmPremise = () => {
    if (selectedWords.length === 0) return;
    setPremises([...premises, selectedWords.join(" ")]);
    setSelectedWords([]);
    setVerificacao([]);
  };

  const verificar = () => {
    const corretas = correctPremises.map(p => limparFrase(p));
    const preenchidas = premises.map(p => limparFrase(p));
    const flags = preenchidas.map(p => corretas.includes(p));
    setVerificacao(flags);

    const todas = corretas.every(p => preenchidas.includes(p));

    const som = new Audio(todas ? somAcerto : somErro);
    som.play();

    if (todas) {
      setResult("✅ Premissas corretas! Conclusão válida.");
      setPontos(pontos + 1);
    } else {
      setResult("❌ Premissas incorretas ou incompletas.");
    }

    setRodadaFinalizada(true);
  };

  const proximaRodada = () => {
    if (rodadaAtual + 1 < premissas.length) {
      setRodadaAtual(rodadaAtual + 1);
      setPremises([]);
      setSelectedWords([]);
      setVerificacao([]);
      setResult("");
      setRodadaFinalizada(false);
    } else {
      setTela('fim');
    }
  };

  if (tela === 'inicio') return <TelaInicial onStart={() => setTela('nome')} />;

  if (tela === 'nome') return (
    <NomeJogador onContinuar={(nome) => {
      setNomeJogador(nome);
      setTela('jogo');
    }} />
  );

  if (tela === 'fim') {
    return (
      <div className="App">
        <h1>Parabéns, {nomeJogador}!</h1>
        <p>Você finalizou o jogo com <strong>{pontos}</strong> ponto(s).</p>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="info-box">
        <p><strong>Jogador:</strong> {nomeJogador}</p>
        <p><strong>Rodada:</strong> {rodadaAtual + 1} / {premissas.length}</p>
        <p><strong>Pontuação:</strong> {pontos}</p>
      </div>

      <div className="jogo-box">
        <div className="jogo-conteudo-central">
          <p><strong>Conclusão:</strong> {conclusion}</p>

          <div className="words-pool">
            {wordPool.map((word, index) => (
              <button key={index} onClick={() => handleWordClick(word)}>
                {word}
              </button>
            ))}
          </div>

          <div className="current-sentence">
            <h3>Premissa em construção:</h3>
            <p>{selectedWords.join(" ") || "(clique nas palavras)"}</p>
            <button onClick={handleUndo}>↩ Desfazer</button>
            <button onClick={handleConfirmPremise}>✅ Confirmar Premissa</button>
          </div>

          <div className="premises-wrapper">
            <div className="premises">
              <h3>Premissas escolhidas:</h3>
              <ul>
                {premises.map((p, idx) => (
                  <li key={idx}>
                    {verificacao.length > 0 && (
                      <span style={{ marginRight: "8px", fontWeight: "bold" }}>
                        {verificacao[idx] ? "✅" : "❌"}
                      </span>
                    )}
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {!rodadaFinalizada && (
            <button className="verificar" onClick={verificar}>Verificar</button>
          )}

          {rodadaFinalizada && result.startsWith("✅") && (
            <button className="botao-proxima" onClick={proximaRodada}>➡ Próxima Rodada</button>
          )}

          {rodadaFinalizada && result.startsWith("❌") && (
            <>
            </>
          )}

        <div className="botoes-acao">
          <button className="botao-tentar" onClick={verificar}>🔁 Tentar Novamente</button>
          <button className="botao-proxima" onClick={proximaRodada}>Pular Rodada ➡</button>
        </div>

          <p className="resultado">{result}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
