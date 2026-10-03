import { useState } from "react";

export function PuzzleRushSurvival() {
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  function startGame() {
    setStarted(true);
    setScore(0);
    setLives(3);
  }

  function simulateCorrect() {
    setScore((current) => current + 1);
  }

  function simulateWrong() {
    setLives((current) => current - 1);
  }

  return (
    <section className="puzzle-rush">
      <div className="training-intro">
        <h2>⚡ Puzzle Rush Survival</h2>

        <p>
          Solve as many puzzles as you can without losing all your lives.
        </p>
      </div>

      {!started ? (
        <div className="trainer-placeholder">
          <h3>Ready?</h3>

          <p>
            You have three lives. How long can you survive?
          </p>

          <button onClick={startGame}>
            Start
          </button>
        </div>
      ) : (
        <>
          <div className="rush-stats">
            <span>❤️ {lives}</span>

            <span>Score: {score}</span>
          </div>

          {lives > 0 && (
            <div className="trainer-placeholder">
              <h3>Puzzle coming next</h3>

              <p>
                The chess puzzle board will go here.
              </p>

              <div>
                <button onClick={simulateCorrect}>
                  Correct
                </button>

                <button onClick={simulateWrong}>
                  Wrong
                </button>
              </div>
            </div>
          )}

          {lives <= 0 && (
            <div className="trainer-feedback">
              <h3>Game Over</h3>

              <p>
                Final score: {score}
              </p>

              <button onClick={startGame}>
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

