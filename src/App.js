import React, { useState } from "react";
import "./App.css";

const conclusion = "Logo, os pássaros são animais ovíparos.";

const correctPremises = [
  "Todos os pássaros botam ovos",
  "Animais que botam ovos são ovíparos"
];

const wordPool = [
  "Todos", "os", "pássaros", "botam", "ovos",
  "Animais", "que", "são", "ovíparos"
];

function App() {
  const [selectedWords, setSelectedWords] = useState([]);
  const [premises, setPremises] = useState([]);
  const [result, setResult] = useState("");
  const [verificacao, setVerificacao] = useState([]);

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
    setVerificacao([]); // limpa marcações quando adiciona nova
  };

  const verificar = () => {
    const corretas = correctPremises.map(p => p.toLowerCase().replace(/\s+/g, ""));
    const preenchidas = premises.map(p => p.toLowerCase().replace(/\s+/g, ""));

    const flags = preenchidas.map(p => corretas.includes(p));
    setVerificacao(flags);

    const todas = corretas.every(p => preenchidas.includes(p));
    if (todas) {
      setResult("✅ Premissas corretas! Conclusão válida.");
    } else {
      setResult("❌ Premissas incorretas ou incompletas.");
    }
  };

  return (
    <div className="App">
      <h1>Cruzadinha Lógica</h1>
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

      <button className="verificar" onClick={verificar}>Verificar</button>
      <p className="resultado">{result}</p>
    </div>
  );
}

export default App;
