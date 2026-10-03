export function GuessTheEvaluation() {
  return (
    <section className="guess-the-evaluation">
      <div className="training-intro">
        <h2>📈 Guess the Evaluation</h2>

        <p>
          Test how accurately you can judge a chess position before seeing
          the engine evaluation.
        </p>
      </div>

      <div className="trainer-placeholder">
        <h3>Evaluation Training</h3>

        <p>
          You will see a chess position and estimate which side is better
          before revealing the engine evaluation.
        </p>

        <div className="calculation-placeholder">
          <span>📈</span>

          <p>Evaluation trainer coming next.</p>
        </div>
      </div>
    </section>
  );
}
