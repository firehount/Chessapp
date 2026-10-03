import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import {
  getPersonalPuzzles,
  savePersonalPuzzle,
  type PuzzleMove,
} from "./personalPuzzleStorage";

type PuzzleBoardProps = {
  initialFen: string;
  playerColor: "w" | "b";
  solutionMoves: PuzzleMove[];
};

export function PuzzleBoard({
  initialFen,
  playerColor,
  solutionMoves,
}: PuzzleBoardProps) {
  const [game, setGame] = useState(
    new Chess(initialFen),
  );

  const [currentMoveIndex, setCurrentMoveIndex] =
    useState(0);

  const [message, setMessage] = useState(
    playerColor === "w"
      ? "Find the best move for White."
      : "Find the best move for Black.",
  );

  function recordResult(correct: boolean) {
    const puzzles = getPersonalPuzzles();

    const puzzle = puzzles.find(
      (item) =>
        item.initialFen === initialFen &&
        item.solutionMoves.length === solutionMoves.length &&
        item.solutionMoves[0]?.from === solutionMoves[0]?.from &&
        item.solutionMoves[0]?.to === solutionMoves[0]?.to,
    );

    if (!puzzle) {
      return;
    }

    if (correct) {
      puzzle.correctAttempts += 1;
    } else {
      puzzle.incorrectAttempts += 1;
    }

    savePersonalPuzzle(puzzle);
  }

  function handleDrop(
    sourceSquare: string,
    targetSquare: string,
  ) {
    const expectedMove =
      solutionMoves[currentMoveIndex];

    if (!expectedMove) {
      return false;
    }

    const attemptedMove =
      sourceSquare + targetSquare;

    const correctMove =
      expectedMove.from + expectedMove.to;

    if (attemptedMove !== correctMove) {
      recordResult(false);
      setMessage("Not quite. Try again.");
      return false;
    }

    const gameCopy = new Chess(game.fen());

    try {
      gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: expectedMove.promotion ?? "q",
      });
    } catch {
      return false;
    }

    const nextMoveIndex =
      currentMoveIndex + 1;

    setGame(gameCopy);

    if (nextMoveIndex >= solutionMoves.length) {
      recordResult(true);
      setCurrentMoveIndex(nextMoveIndex);
      setMessage(
        "🎉 Correct! You solved the puzzle.",
      );
    } else {
      setCurrentMoveIndex(nextMoveIndex);
      setMessage("Correct! Keep going.");
    }

    return true;
  }

  function resetPuzzle() {
    setGame(new Chess(initialFen));
    setCurrentMoveIndex(0);

    setMessage(
      playerColor === "w"
        ? "Find the best move for White."
        : "Find the best move for Black.",
    );
  }

  return (
    <section className="puzzle-board">
      <div className="puzzle-board-header">
        <h2>Personal Puzzle</h2>

        <p>{message}</p>
      </div>

      <div className="puzzle-board-container">
        <Chessboard
          options={{
            position: game.fen(),

            boardOrientation:
              playerColor === "w"
                ? "white"
                : "black",

            onPieceDrop: ({
              sourceSquare,
              targetSquare,
            }) => {
              if (!targetSquare) {
                return false;
              }

              return handleDrop(
                sourceSquare,
                targetSquare,
              );
            },
          }}
        />
      </div>

      <button
        type="button"
        onClick={resetPuzzle}
      >
        Reset Puzzle
      </button>
    </section>
  );
}