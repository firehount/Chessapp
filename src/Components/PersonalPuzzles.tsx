import { useEffect, useState } from "react";
import { PuzzleBoard } from "./PuzzleBoard";
import {
  deletePersonalPuzzle,
  getPersonalPuzzles,
  type PersonalPuzzle,
} from "./personalPuzzleStorage";

const puzzleThemes = [
  {
    title: "Your mistakes",
    description: "Positions created from mistakes in your own games.",
    icon: "♟",
  },
  {
    title: "Tactical blind spots",
    description: "Patterns you tend to miss during games.",
    icon: "⚔️",
  },
  {
    title: "Opening mistakes",
    description: "Opening positions where you went wrong.",
    icon: "📚",
  },
];

export function PersonalPuzzles() {
  const [puzzles, setPuzzles] = useState<PersonalPuzzle[]>([]);
  const [selectedPuzzle, setSelectedPuzzle] =
    useState<PersonalPuzzle | null>(null);

  useEffect(() => {
    const storedPuzzles = getPersonalPuzzles();
    setPuzzles(storedPuzzles);
  }, []);

  function removePuzzle(puzzleId: string) {
    deletePersonalPuzzle(puzzleId);

    const updatedPuzzles = getPersonalPuzzles();
    setPuzzles(updatedPuzzles);

    if (selectedPuzzle?.id === puzzleId) {
      setSelectedPuzzle(null);
    }
  }

  return (
    <section className="personal-puzzles">
      <div className="training-intro">
        <h2>Personal Puzzles</h2>

        <p>
          Your games become your training. Mistakes you make can turn into
          puzzles that help you improve.
        </p>
      </div>

      <div className="puzzle-summary">
        <div className="puzzle-stat">
          <strong>{puzzles.length}</strong>
          <span>Available puzzles</span>
        </div>

        <div className="puzzle-stat">
          <strong>{puzzles.length}</strong>
          <span>To review</span>
        </div>

        <div className="puzzle-stat">
          <strong>0%</strong>
          <span>Accuracy</span>
        </div>
      </div>

      <div className="puzzle-themes">
        <h3>Your themes</h3>

        {puzzleThemes.map((theme) => (
          <div className="puzzle-theme" key={theme.title}>
            <span className="puzzle-theme-icon">{theme.icon}</span>

            <div>
              <strong>{theme.title}</strong>
              <p>{theme.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPuzzle ? (
        <div className="personal-puzzle">
          <div className="personal-puzzle-header">
            <h3>{selectedPuzzle.title}</h3>

            <p>{selectedPuzzle.theme}</p>
          </div>

        <PuzzleBoard
  initialFen={selectedPuzzle.initialFen}
  playerColor={selectedPuzzle.playerColor}
  solutionMoves={selectedPuzzle.solutionMoves}
/>

          <button
            type="button"
            onClick={() => setSelectedPuzzle(null)}
          >
            Back to my puzzles
          </button>
        </div>
      ) : puzzles.length > 0 ? (
        <div className="personal-puzzle-list">
          <h3>Your puzzles</h3>

          {puzzles.map((puzzle) => (
            <div className="personal-puzzle-card" key={puzzle.id}>
              <div>
                <strong>{puzzle.title}</strong>

                <p>{puzzle.theme}</p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setSelectedPuzzle(puzzle)}
                >
                  Solve
                </button>

                <button
                  type="button"
                  onClick={() => removePuzzle(puzzle.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-puzzles">
          <div className="empty-puzzles-icon">🧩</div>

          <h3>No personal puzzles yet</h3>

          <p>
            Play some games and your important mistakes will eventually become
            training positions here.
          </p>
        </div>
      )}
    </section>
  );
}