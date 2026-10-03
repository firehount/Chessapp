import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { createStockfishEngine } from "../engine/stockfish";

export function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [gameOver, setGameOver] = useState(false);

  const [evaluation, setEvaluation] = useState("—");
  const [bestMove, setBestMove] = useState("—");
  const [engineReady, setEngineReady] = useState(false);

  const engineRef = useRef<ReturnType<
    typeof createStockfishEngine
  > | null>(null);

  const analyzedTurnRef = useRef<"w" | "b">("w");
  const analyzedGameRef = useRef<Chess>(new Chess());

  useEffect(() => {
    const engine = createStockfishEngine((message) => {
      console.log("Stockfish:", message);

      if (message === "uciok") {
        engine.send("isready");
      }

      if (message === "readyok") {
        setEngineReady(true);
      }

      if (message.startsWith("info")) {
        const score = message.match(/score cp (-?\d+)/);
        const mate = message.match(/score mate (-?\d+)/);
        const pv = message.match(
          / pv ([a-h][1-8][a-h][1-8])/,
        );

        if (score) {
          const rawValue = Number(score[1]) / 100;

          const whiteValue =
            analyzedTurnRef.current === "w"
              ? rawValue
              : -rawValue;

          if (whiteValue > 0) {
            setEvaluation(
              `White +${whiteValue.toFixed(2)}`,
            );
          } else if (whiteValue < 0) {
            setEvaluation(
              `Black +${Math.abs(whiteValue).toFixed(2)}`,
            );
          } else {
            setEvaluation("Equal");
          }
        }

        if (mate) {
          const rawMate = Number(mate[1]);

          const whiteMate =
            analyzedTurnRef.current === "w"
              ? rawMate
              : -rawMate;

          if (whiteMate > 0) {
            setEvaluation(
              `White mate in ${whiteMate}`,
            );
          } else {
            setEvaluation(
              `Black mate in ${Math.abs(whiteMate)}`,
            );
          }
        }

        if (pv) {
          const move = pv[1];

          try {
            const tempGame = new Chess(
              analyzedGameRef.current.fen(),
            );

            const playedMove = tempGame.move({
              from: move.slice(0, 2),
              to: move.slice(2, 4),
              promotion: "q",
            });

            setBestMove(playedMove.san);
          } catch {
            setBestMove(move);
          }
        }
      }
    });

    engineRef.current = engine;
    engine.send("uci");

    return () => {
      engine.stop();
      engineRef.current = null;
    };
  }, []);

  function analyzePosition(position: string) {
    const engine = engineRef.current;

    if (!engineReady || !engine) {
      return;
    }

    const positionGame = new Chess(position);

    analyzedTurnRef.current = positionGame.turn();
    analyzedGameRef.current = positionGame;

    setEvaluation("...");
    setBestMove("...");

    engine.send("stop");
    engine.send("position fen " + position);
    engine.send("go depth 15");
  }

  function makeMove(
    sourceSquare: string,
    targetSquare: string,
  ) {
    if (gameOver) {
      return false;
    }

    try {
      const newGame = new Chess(game.fen());

      newGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      setGame(newGame);

      if (
        newGame.isCheckmate() ||
        newGame.isDraw() ||
        newGame.isStalemate()
      ) {
        setGameOver(true);
      }

      analyzePosition(newGame.fen());

      return true;
    } catch {
      return false;
    }
  }

  function resetGame() {
    setGame(new Chess());
    setGameOver(false);
    setEvaluation("—");
    setBestMove("—");
    analyzedTurnRef.current = "w";
    analyzedGameRef.current = new Chess();
  }

  function resignGame() {
    setGameOver(true);
  }

  const history = game.history();

  return (
    <div className="chess-game">
      <div className="chess-game-header">
        <div>
          <p className="eyebrow">PLAY</p>
          <h2>Casual Game</h2>
        </div>

        <button
          className="reset-button"
          onClick={resetGame}
        >
          New game
        </button>
      </div>

      <div className="game-status">
        {game.isCheckmate()
          ? "Checkmate"
          : game.isStalemate()
            ? "Draw by stalemate"
            : game.isDraw()
              ? "Draw"
              : game.isCheck()
                ? game.turn() === "w"
                  ? "White is in check"
                  : "Black is in check"
                : gameOver
                  ? "Game resigned"
                  : game.turn() === "w"
                    ? "White to move"
                    : "Black to move"}
      </div>

      <div className="board-with-evaluation">
  <div className="evaluation-bar">
    <div className="evaluation-black">
      <span>Black</span>
    </div>

    <div className="evaluation-white">
      <span>White</span>
    </div>
  </div>

  <div className="chess-board-wrapper">
    <Chessboard
      options={{
        position: game.fen(),
        onPieceDrop: ({
          sourceSquare,
          targetSquare,
        }) => {
          if (!targetSquare) {
            return false;
          }

          return makeMove(
            sourceSquare,
            targetSquare,
          );
        },
      }}
    />
  </div>
</div>

      <div className="engine-panel">
        <h3>Stockfish</h3>

        <div>
          <span>Engine</span>
          <strong>
            {engineReady ? "Ready" : "Loading..."}
          </strong>
        </div>

        <div>
          <span>Evaluation</span>
          <strong>{evaluation}</strong>
        </div>

        <div>
          <span>Best move</span>
          <strong>{bestMove}</strong>
        </div>
      </div>

      <div className="game-info">
        <div>
          <span>Turn</span>
          <strong>
            {game.turn() === "w"
              ? "White"
              : "Black"}
          </strong>
        </div>

        <div>
          <span>Moves</span>
          <strong>{history.length}</strong>
        </div>
      </div>

      <button
        className="resign-button"
        onClick={resignGame}
        disabled={gameOver}
      >
        Resign Game
      </button>
    </div>
  );
}