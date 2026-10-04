import { useState } from "react";
import "./App.css";

function App() {
  const [range, setRange] = useState("");
  const [number, setNumber] = useState(null);
  const [options, setOptions] = useState([]);
  const [attempts, setAttempts] = useState(3);
  const [message, setMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function startGame() {
    if (!range) return;

    const max = Number(range);

    // Generate random answer
    const answer = Math.floor(Math.random() * max) + 1;

    // Generate 3 different wrong options
    const choices = new Set([answer]);

    while (choices.size < 4) {
      const random = Math.floor(Math.random() * max) + 1;
      choices.add(random);
    }

    // Shuffle choices
    const shuffled = [...choices].sort(() => Math.random() - 0.5);

    setNumber(answer);
    setOptions(shuffled);
    setAttempts(3);
    setGameStarted(true);
    setGameOver(false);
    setMessage("");
  }

  function checkAnswer(selectedNumber) {
    if (gameOver) return;

    if (selectedNumber === number) {
      setMessage("🎉 Correct! You won!");
      setGameOver(true);
      return;
    }

    const remaining = attempts - 1;
    setAttempts(remaining);

    if (remaining === 0) {
      setMessage(`❌ Game Over! The number was ${number}`);
      setGameOver(true);
    } else {
      setMessage(`❌ Wrong! ${remaining} attempt(s) left`);
    }
  }

  function resetGame() {
    setRange("");
    setNumber(null);
    setOptions([]);
    setAttempts(3);
    setMessage("");
    setGameStarted(false);
    setGameOver(false);
  }

  return (
    <div className="app">

      {/* Toast */}
      {message && (
        <div className="toast">
          {message}
        </div>
      )}

      <div className="game-card">

        <h2>Guess the Random Number Generated</h2>

        {!gameStarted ? (
          <>
            <p className="subtitle">
              Select a range and start guessing!
            </p>

            <input
              type="number"
              placeholder="Enter maximum number"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />

            <button className="start-btn" onClick={startGame}>
              Start Game
            </button>
          </>
        ) : (
          <>
            <p className="question">
              Guess the number between <b>1</b> and <b>{range}</b>
            </p>

            {!gameOver && (
              <p className="attempts">
                Attempts left: <b>{attempts}</b>
              </p>
            )}

            <div className="options">
              {options.map((option) => (
                <button
                  key={option}
                  className="option-btn"
                  onClick={() => checkAnswer(option)}
                  disabled={gameOver}
                >
                  {option}
                </button>
              ))}
            </div>

            {gameOver && (
              <button className="reset-btn" onClick={resetGame}>
                Play Again
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;