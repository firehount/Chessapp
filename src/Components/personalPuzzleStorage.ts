export type PuzzleMove = {
  from: string;
  to: string;
  promotion?: string;
};

export type PersonalPuzzle = {
  id: string;
  title: string;
  playerColor: "w" | "b";
  correctAttempts: number;
  incorrectAttempts: number;
  initialFen: string;
  solutionMoves: PuzzleMove[];
  theme: string;
  createdAt: string;
};

const STORAGE_KEY = "chessapp_personal_puzzles";

export function getPersonalPuzzles(): PersonalPuzzle[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as PersonalPuzzle[];
  } catch {
    return [];
  }
}

export function savePersonalPuzzle(
  puzzle: PersonalPuzzle,
): void {
  const puzzles = getPersonalPuzzles();

  const alreadyExists = puzzles.some(
    (existingPuzzle) => existingPuzzle.id === puzzle.id,
  );

  if (alreadyExists) {
    return;
  }

  puzzles.push(puzzle);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(puzzles),
  );
}

export function deletePersonalPuzzle(
  puzzleId: string,
): void {
  const puzzles = getPersonalPuzzles();

  const remainingPuzzles = puzzles.filter(
    (puzzle) => puzzle.id !== puzzleId,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(remainingPuzzles),
  );
}

export function clearPersonalPuzzles(): void {
  localStorage.removeItem(STORAGE_KEY);
}