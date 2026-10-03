type TrainingMode = {
  title: string;
  description: string;
  icon: string;
};

const trainingModes: TrainingMode[] = [
  {
    title: "Personal Puzzles",
    description: "Train positions created from your own games.",
    icon: "🧩",
  },
  {
    title: "Puzzle Rush Survival",
    description: "Solve as many puzzles as you can without making a mistake.",
    icon: "⚡",
  },
  {
    title: "Calculation",
    description: "Calculate variations without moving the pieces.",
    icon: "🧮",
  },
  {
    title: "Blindfold",
    description: "Train your ability to visualize the board.",
    icon: "🙈",
  },
  {
    title: "Coordinate Speed Run",
    description: "Find squares and coordinates as quickly as possible.",
    icon: "🎯",
  },
  {
    title: "Pawn Skeletons",
    description: "Master fundamental pawn structures and endgames.",
    icon: "♟️",
  },
  {
    title: "Guess the Evaluation",
    description: "Test how accurately you understand a position.",
    icon: "📈",
  },
];

type TrainingHubProps = {
  onSelectMode: (mode: string) => void;
};

export function TrainingHub({ onSelectMode }: TrainingHubProps) {
  return (
    <section className="training-hub">
      <div className="training-intro">
        <div className="hero-eyebrow">TRAINING</div>

        <h2>Sharpen your game.</h2>

        <p>
          Train calculation, visualization, tactics and positional
          understanding through focused exercises.
        </p>
      </div>

      <div className="training-grid">
        {trainingModes.map((mode) => (
          <button
            className="training-card"
            key={mode.title}
            onClick={() => onSelectMode(mode.title)}
          >
            <span className="training-icon">{mode.icon}</span>

            <span className="training-card-content">
              <strong>{mode.title}</strong>
              <span>{mode.description}</span>
            </span>

            <span className="training-arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
