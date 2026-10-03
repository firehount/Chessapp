
import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export function MoveTrainer() {
  const [game, setGame] = useState(
    new Chess(
      "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
    )
  );

  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  function handleMove({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string;
    targetSquare: string | null;
  }): boolean {
    if (!targetSquare) {
      return false;
    }

    const gameCopy = new Chess(game.fen());

    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (!move) {
        return false;
      }

      if (sourceSquare === "g1" && targetSquare === "f3") {
        setGame(gameCopy);
        setFeedback(
          "✅ Correct! Nf3 develops your knight, controls important central squares, and prepares you to castle."
        );
        setCompleted(true);
        return true;
      }

      setGame(gameCopy);
      setFeedback(
        "❌ Not quite. Look for a move that develops a piece and helps control the center."
      );

      return true;
    } catch {
      return false;
    }
  }

  function resetLesson() {
    setGame(
      new Chess(
        "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
      )
    );

    setFeedback("");
    setCompleted(false);
  }

  return (
    <section className="move-trainer">
      <div className="training-intro">
        <h2>Move Trainer</h2>

        <p>
          Learn the moves, but more importantly, understand why they work.
        </p>
      </div>

     <div className="trainer-lesson">
  <p>
    <strong>Opening:</strong> Italian Game
  </p>

  <h3>Lesson 1 — Develop your pieces</h3>

        <p>
          You played <strong>1. e4 e5</strong>.
        </p>

        <p>
          Now find the best developing move for White.
        </p>

        <div className="trainer-board">
          <Chessboard
            options={{
              position: game.fen(),
              onPieceDrop: handleMove,
            }}
          />
        </div>

        {feedback && (
          <div className="trainer-feedback">
            <p>{feedback}</p>
          </div>
        )}

        {completed && (
          <button onClick={resetLesson}>Try Again</button>
        )}

        {!completed && feedback && (
          <button onClick={resetLesson}>Try Again</button>
        )}
      </div>
    </section>
  );
}

