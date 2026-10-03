import { useState } from "react";
import { ChessGame } from "./Components/ChessGame";
import { TrainingHub } from "./Components/TrainingHub";
import { PersonalPuzzles } from "./Components/PersonalPuzzles";
import { MoveTrainer } from "./Components/MoveTrainer";
import { PuzzleRushSurvival } from "./Components/PuzzleRushSurvival";
import { Calculation } from "./Components/Calculation";
import { Blindfold } from "./Components/Blindfold";
import { CoordinateSpeedRun } from "./Components/CoordinateSpeedRun";
import { PawnSkeletons } from "./Components/PawnSkeletons";
import { GuessTheEvaluation } from "./Components/GuessTheEvaluation";
import { Openings } from "./Components/Openings";
import { ChessPrinciples } from "./Components/ChessPrinciples";
import { DecisionTrees } from "./Components/DecisionTrees";
import { Courses } from "./Components/Courses";
import { Progress } from "./Components/Progress";

type Screen =
  | "home"
  | "play"
  | "train"
  | "puzzles"
  | "puzzle-rush"
  | "calculation"
  | "blindfold"
  | "coordinate-speed-run"
  | "pawn-skeletons"
  | "guess-evaluation"
  | "learn"
  | "move-trainer"
  | "openings"
  | "chess-principles"
  | "decision-trees"
  | "courses"
  | "progress";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("chess.sidebarCollapsed") === "true";
  });

  const navigate = (nextScreen: Screen) => {
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((current) => {
      const next = !current;
      localStorage.setItem("chess.sidebarCollapsed", String(next));
      return next;
    });
  };

  const isLearnScreen =
    screen === "learn" ||
    screen === "move-trainer" ||
    screen === "openings" ||
    screen === "chess-principles" ||
    screen === "decision-trees" ||
    screen === "courses";

  const renderScreen = () => {
    switch (screen) {
      case "play":
        return <ChessGame />;

      case "train":
        return (
          <TrainingHub
            onSelectMode={(mode) => {
              switch (mode) {
                case "Personal Puzzles":
                  navigate("puzzles");
                  break;

                case "Puzzle Rush Survival":
                  navigate("puzzle-rush");
                  break;

                case "Calculation":
                  navigate("calculation");
                  break;

                case "Blindfold":
                  navigate("blindfold");
                  break;

                case "Coordinate Speed Run":
                  navigate("coordinate-speed-run");
                  break;

                case "Pawn Skeletons":
                  navigate("pawn-skeletons");
                  break;

                case "Guess the Evaluation":
                  navigate("guess-evaluation");
                  break;
              }
            }}
          />
        );

      case "puzzles":
        return <PersonalPuzzles />;

      case "puzzle-rush":
        return <PuzzleRushSurvival />;

      case "calculation":
        return <Calculation />;

      case "blindfold":
        return <Blindfold />;

      case "coordinate-speed-run":
        return <CoordinateSpeedRun />;

      case "pawn-skeletons":
        return <PawnSkeletons />;

      case "guess-evaluation":
        return <GuessTheEvaluation />;

      case "move-trainer":
        return <MoveTrainer />;

      case "openings":
        return <Openings />;

      case "chess-principles":
        return <ChessPrinciples />;

      case "decision-trees":
        return <DecisionTrees />;

      case "courses":
        return <Courses />;

      case "progress":
        return <Progress />;

      case "learn":
        return (
          <div className="home-screen">
            <div className="hero-section">
              <div className="hero-eyebrow">LEARN</div>

              <h1>Build understanding.</h1>

              <p>
                Study openings, principles, decision trees and structured
                chess courses.
              </p>
            </div>

            <div className="learn-grid">
              <button
                className="feature-card"
                onClick={() => navigate("openings")}
              >
                <div className="feature-icon">♟</div>

                <div className="feature-content">
                  <h3>Openings</h3>
                  <p>
                    Explore opening systems and build your repertoire.
                  </p>
                </div>
              </button>

              <button
                className="feature-card"
                onClick={() => navigate("chess-principles")}
              >
                <div className="feature-icon">♜</div>

                <div className="feature-content">
                  <h3>Chess Principles</h3>
                  <p>
                    Learn the ideas that guide strong chess decisions.
                  </p>
                </div>
              </button>

              <button
                className="feature-card"
                onClick={() => navigate("decision-trees")}
              >
                <div className="feature-icon">🌳</div>

                <div className="feature-content">
                  <h3>Decision Trees</h3>
                  <p>
                    Explore openings through interactive positions.
                  </p>
                </div>
              </button>

              <button
                className="feature-card"
                onClick={() => navigate("courses")}
              >
                <div className="feature-icon">📚</div>

                <div className="feature-content">
                  <h3>Courses</h3>
                  <p>
                    Follow structured lessons and build your chess
                    knowledge.
                  </p>
                </div>
              </button>

              <button
                className="feature-card"
                onClick={() => navigate("move-trainer")}
              >
                <div className="feature-icon">🎯</div>

                <div className="feature-content">
                  <h3>Move Trainer</h3>
                  <p>
                    Practice important opening moves step by step.
                  </p>
                </div>
              </button>
            </div>
          </div>
        );

      case "home":
      default:
        return (
          <div className="home-screen">
            <div className="hero-section">
              <div className="hero-eyebrow">CHESS</div>

              <h1>Your chess journey.</h1>

              <p>
                Train your calculation, understand positions and build
                stronger chess habits.
              </p>
            </div>

            <div className="home-grid">
              <button
                className="feature-card large"
                onClick={() => navigate("play")}
              >
                <div className="feature-icon">♟</div>

                <div className="feature-content">
                  <h3>Play</h3>
                  <p>
                    Play a game and put your understanding into practice.
                  </p>
                </div>
              </button>

              <button
                className="feature-card large"
                onClick={() => navigate("train")}
              >
                <div className="feature-icon">⚡</div>

                <div className="feature-content">
                  <h3>Train</h3>
                  <p>
                    Improve tactics, calculation, visualization and
                    positional understanding.
                  </p>
                </div>
              </button>

              <button
                className="feature-card large"
                onClick={() => navigate("learn")}
              >
                <div className="feature-icon">📖</div>

                <div className="feature-content">
                  <h3>Learn</h3>
                  <p>
                    Explore openings, principles, decision trees and
                    courses.
                  </p>
                </div>
              </button>

              <button
                className="feature-card large"
                onClick={() => navigate("progress")}
              >
                <div className="feature-icon">📈</div>

                <div className="feature-content">
                  <h3>Progress</h3>
                  <p>
                    Follow your skills, improvement statistics and
                    important positions.
                  </p>
                </div>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <style>{`
        :root {
          --chess-charcoal: #171a1c;
          --chess-charcoal-soft: #202427;
          --chess-ash: #2b3033;

          --chess-slate: #485568;
          --chess-prussian: #17324d;
          --chess-blue: #526b86;
          --chess-ice: #b9d7e8;

          --chess-white: #eef2f4;
          --chess-muted: #9da7ad;

          --chess-jade: #4f8a78;
          --chess-eucalyptus: #6f9b89;
          --chess-crimson: #b94b52;
          --chess-terracotta: #b86b56;
          --chess-amethyst: #8069a5;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          min-width: 100%;
          min-height: 100%;
          background: var(--chess-charcoal);
        }

        * {
          box-sizing: border-box;
        }

        body {
          background: var(--chess-charcoal);
          color: var(--chess-white);
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        button {
          font: inherit;
        }

        /* =========================
           APP
           ========================= */

        .app {
          --sidebar-width: 236px;

          width: 100%;
          min-width: 100%;
          min-height: 100vh;

          margin: 0;
          padding: 0;

          background: var(--chess-charcoal);
        }

        .app.sidebar-collapsed {
          --sidebar-width: 76px;
        }

        /* =========================
           DESKTOP SIDEBAR
           ========================= */

        .desktop-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;

          width: var(--sidebar-width);

          z-index: 1000;

          display: flex;
          flex-direction: column;

          padding: 24px 16px;

          background:
            linear-gradient(
              180deg,
              #202427 0%,
              #171a1c 55%,
              #141719 100%
            );

          border-right: 1px solid rgba(185, 215, 232, 0.08);

          transition:
            width 180ms ease,
            padding 180ms ease;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;

          padding: 4px 8px 28px;

          min-width: 0;
        }

        .brand-piece {
          width: 40px;
          height: 40px;

          flex: 0 0 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              var(--chess-prussian),
              var(--chess-slate)
            );

          color: var(--chess-ice);
          font-size: 22px;

          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.24);
        }

        .brand-text {
          min-width: 0;
          overflow: hidden;

          transition: opacity 140ms ease;
        }

        .brand-title {
          margin: 0;

          color: var(--chess-white);
          font-size: 18px;
          font-weight: 750;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }

        .brand-subtitle {
          margin-top: 2px;

          color: var(--chess-muted);
          font-size: 11px;
          white-space: nowrap;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-section-label {
          margin: 16px 8px 7px;

          color: #687278;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.12em;
          text-transform: uppercase;

          white-space: nowrap;

          transition: opacity 140ms ease;
        }

        .sidebar-button {
          width: 100%;

          display: flex;
          align-items: center;
          gap: 12px;

          padding: 11px 12px;

          border: 1px solid transparent;
          border-radius: 11px;

          background: transparent;
          color: var(--chess-muted);

          cursor: pointer;
          text-align: left;

          transition:
            background 160ms ease,
            color 160ms ease,
            border-color 160ms ease,
            transform 160ms ease;
        }

        .sidebar-button:hover {
          background: rgba(185, 215, 232, 0.06);
          color: var(--chess-white);
        }

        .sidebar-button.active {
          background:
            linear-gradient(
              135deg,
              rgba(23, 50, 77, 0.9),
              rgba(72, 85, 104, 0.42)
            );

          border-color: rgba(185, 215, 232, 0.1);
          color: var(--chess-ice);

          box-shadow:
            inset 3px 0 0 var(--chess-ice);
        }

        .sidebar-icon {
          width: 22px;

          flex: 0 0 22px;

          display: flex;
          justify-content: center;

          font-size: 17px;
        }

        .sidebar-label {
          font-size: 14px;
          font-weight: 600;

          white-space: nowrap;

          transition: opacity 140ms ease;
        }

        .sidebar-footer {
          margin-top: auto;

          padding: 14px 8px 0;

          border-top: 1px solid rgba(185, 215, 232, 0.07);

          color: #687278;
          font-size: 10px;
          line-height: 1.5;

          transition: opacity 140ms ease;
        }

        /* =========================
           COLLAPSED SIDEBAR
           ========================= */

        .app.sidebar-collapsed .desktop-sidebar {
          padding-left: 10px;
          padding-right: 10px;
        }

        .app.sidebar-collapsed .brand {
          justify-content: center;
          padding-left: 0;
          padding-right: 0;
        }

        .app.sidebar-collapsed .brand-text,
        .app.sidebar-collapsed .nav-section-label,
        .app.sidebar-collapsed .sidebar-label,
        .app.sidebar-collapsed .sidebar-footer {
          opacity: 0;
          pointer-events: none;
        }

        .app.sidebar-collapsed .sidebar-button {
          justify-content: center;
          padding-left: 0;
          padding-right: 0;
        }

        .app.sidebar-collapsed .sidebar-button.active {
          box-shadow: none;
        }

        .app.sidebar-collapsed .sidebar-icon {
          width: 30px;
          flex-basis: 30px;
        }

        /* =========================
           SIDEBAR TOGGLE
           ========================= */

        .sidebar-toggle {
          position: absolute;

          top: 72px;
          right: -14px;

          width: 28px;
          height: 28px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(185, 215, 232, 0.12);
          border-radius: 50%;

          background: #202427;
          color: var(--chess-ice);

          cursor: pointer;

          font-size: 17px;
          line-height: 1;

          box-shadow:
            0 6px 18px rgba(0, 0, 0, 0.28);

          transition:
            background 160ms ease,
            transform 160ms ease;
        }

        .sidebar-toggle:hover {
          background: #2b3033;
          transform: scale(1.06);
        }

        /* =========================
           MAIN AREA
           ========================= */

        .app-main {
          position: relative;
          display: block;

          width: calc(100vw - var(--sidebar-width)) !important;
          max-width: none !important;

          min-width: 0;
          min-height: 100vh;

          margin-left: var(--sidebar-width);

          padding: 0;

          background: var(--chess-charcoal);

          container-type: inline-size;

          transition:
            width 180ms ease,
            margin-left 180ms ease;
        }

        .app-header {
          position: sticky;
          top: 0;
          z-index: 900;

          min-height: 72px;

          display: flex;
          align-items: center;

          padding: 0 36px;

          background:
            linear-gradient(
              180deg,
              rgba(23, 26, 28, 0.98),
              rgba(23, 26, 28, 0.94)
            );

          border-bottom: 1px solid rgba(185, 215, 232, 0.06);

          backdrop-filter: blur(14px);
        }

        .app-header-inner {
          width: 100%;
          min-width: 0;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .header-context {
          min-width: 0;
        }

        .header-kicker {
          margin-bottom: 3px;

          color: var(--chess-ice);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .header-title {
          margin: 0;

          color: var(--chess-white);
          font-size: 18px;
          font-weight: 700;
        }

        .header-subtitle {
          margin: 3px 0 0;

          color: var(--chess-muted);
          font-size: 12px;
        }

        .header-accent {
          width: 9px;
          height: 9px;

          flex: 0 0 auto;

          border-radius: 50%;

          background: var(--chess-jade);

          box-shadow:
            0 0 0 5px rgba(79, 138, 120, 0.1);
        }

        .app-content {
          width: 100%;
          min-width: 0;
          min-height: calc(100vh - 72px);
        }

        /* =========================
           HOME / GENERAL SCREENS
           ========================= */

        .home-screen {
          width: 100%;
          max-width: none;

          margin: 0;

          padding: 52px 48px 80px;
        }

        .hero-section {
          width: 100%;
          max-width: 1100px;

          margin-bottom: 44px;
        }

        .hero-eyebrow {
          margin-bottom: 10px;

          color: var(--chess-ice);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .hero-section h1 {
          margin: 0;

          color: var(--chess-white);

          font-size: clamp(34px, 4vw, 58px);
          line-height: 1;
          letter-spacing: -0.045em;
        }

        .hero-section p {
          max-width: 820px;

          margin: 18px 0 0;

          color: var(--chess-muted);

          font-size: 16px;
          line-height: 1.65;
        }

        /* =========================
           HOME GRID
           ========================= */

        .home-grid,
        .learn-grid {
          width: 100%;
          min-width: 0;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          gap: 24px;
        }

        .feature-card {
          width: 100%;
          min-width: 0;

          display: flex;
          align-items: flex-start;

          gap: 22px;

          padding: 32px;

          border: 1px solid rgba(185, 215, 232, 0.08);
          border-radius: 18px;

          background:
            linear-gradient(
              145deg,
              rgba(32, 36, 39, 0.98),
              rgba(23, 26, 28, 0.98)
            );

          color: var(--chess-white);

          cursor: pointer;
          text-align: left;

          transition:
            transform 160ms ease,
            border-color 160ms ease,
            background 160ms ease,
            box-shadow 160ms ease;
        }

        .feature-card:hover {
          transform: translateY(-3px);

          border-color: rgba(185, 215, 232, 0.18);

          background:
            linear-gradient(
              145deg,
              rgba(38, 45, 49, 0.98),
              rgba(23, 26, 28, 0.98)
            );

          box-shadow:
            0 16px 40px rgba(0, 0, 0, 0.24);
        }

        .feature-card.large {
          min-height: 200px;
        }

        .feature-icon {
          width: 50px;
          height: 50px;

          flex: 0 0 50px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 14px;

          background:
            linear-gradient(
              135deg,
              rgba(23, 50, 77, 0.95),
              rgba(72, 85, 104, 0.75)
            );

          color: var(--chess-ice);
          font-size: 22px;
        }

        .feature-content {
          flex: 1 1 auto;
          min-width: 0;
        }

        .feature-card h3 {
          margin: 2px 0 9px;

          color: var(--chess-white);

          font-size: 19px;
          font-weight: 700;
          line-height: 1.2;
        }

        .feature-card p {
          margin: 0;

          max-width: 620px;

          color: var(--chess-muted);

          font-size: 14px;
          line-height: 1.65;

          overflow-wrap: break-word;
          word-break: normal;
        }

        /* =========================
           NARROW CONTENT AREAS
           ========================= */

        @container (max-width: 820px) {
          .home-grid,
          .learn-grid {
            grid-template-columns: 1fr;
          }
        }

        /* =========================
           MOBILE NAVIGATION
           ========================= */

        .mobile-nav {
          display: none;
        }

        @media (max-width: 1100px) {
          .home-screen {
            padding-left: 36px;
            padding-right: 36px;
          }

          .feature-card {
            padding: 28px;
          }
        }

        @media (max-width: 850px) {
          .desktop-sidebar {
            display: none;
          }

          .app-main {
            width: 100% !important;
            margin-left: 0;
            padding-bottom: 78px;
          }

          .app-header {
            min-height: 64px;
            padding: 0 18px;
          }

          .header-subtitle {
            display: none;
          }

          .app-content {
            min-height: calc(100vh - 64px);
          }

          .home-screen {
            padding: 36px 20px 60px;
          }

          .hero-section {
            margin-bottom: 32px;
          }

          .home-grid,
          .learn-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .feature-card {
            padding: 24px;
          }

          .feature-card.large {
            min-height: 155px;
          }

          .mobile-nav {
            position: fixed;
            left: 10px;
            right: 10px;
            bottom: 10px;

            z-index: 2000;

            display: grid;
            grid-template-columns: repeat(5, 1fr);

            padding: 7px;

            border: 1px solid rgba(185, 215, 232, 0.1);
            border-radius: 17px;

            background:
              rgba(23, 26, 28, 0.96);

            box-shadow:
              0 15px 40px rgba(0, 0, 0, 0.38);

            backdrop-filter: blur(16px);
          }

          .mobile-nav-button {
            border: 0;
            border-radius: 11px;

            padding: 9px 4px;

            background: transparent;
            color: var(--chess-muted);

            cursor: pointer;

            font-size: 10px;
            font-weight: 650;
          }

          .mobile-nav-button.active {
            background: rgba(23, 50, 77, 0.72);
            color: var(--chess-ice);
          }

          .mobile-nav-icon {
            display: block;
            margin-bottom: 3px;
            font-size: 17px;
          }
        }

        @media (max-width: 520px) {
          .hero-section h1 {
            font-size: 38px;
          }

          .feature-card {
            gap: 16px;
            padding: 20px;
          }

          .feature-card.large {
            min-height: auto;
          }
        }

        /* =========================
           TRAINING HUB
           ========================= */

        .training-hub {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 52px 48px 80px;
          box-sizing: border-box;
        }

        .training-intro {
          margin-bottom: 38px;
        }

        .training-intro .hero-eyebrow {
          margin-bottom: 10px;
        }

        .training-intro h2 {
          margin: 0;

          color: var(--chess-white);
          font-size: clamp(34px, 4vw, 52px);
          font-weight: 750;
          letter-spacing: -0.045em;
          line-height: 1;
        }

        .training-intro p {
          max-width: 720px;

          margin: 18px 0 0;

          color: var(--chess-muted);
          font-size: 16px;
          line-height: 1.65;
        }

        .training-grid {
          width: 100%;

          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .training-card {
          position: relative;

          width: 100%;
          min-height: 156px;

          display: flex;
          align-items: center;

          gap: 20px;
          padding: 26px;

          border: 1px solid rgba(185, 215, 232, 0.08);
          border-radius: 18px;

          background:
            linear-gradient(
              145deg,
              rgba(32, 36, 39, 0.98),
              rgba(23, 26, 28, 0.98)
            );

          color: var(--chess-white);

          cursor: pointer;
          text-align: left;

          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.12);

          transition:
            transform 160ms ease,
            border-color 160ms ease,
            background 160ms ease,
            box-shadow 160ms ease;
        }

        .training-card:hover {
          transform: translateY(-3px);

          border-color: rgba(185, 215, 232, 0.18);

          background:
            linear-gradient(
              145deg,
              rgba(38, 45, 49, 0.98),
              rgba(23, 26, 28, 0.98)
            );

          box-shadow:
            0 16px 38px rgba(0, 0, 0, 0.25);
        }

        .training-card:active {
          transform: translateY(-1px);
        }

        .training-icon {
          width: 54px;
          height: 54px;

          flex: 0 0 54px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(185, 215, 232, 0.09);
          border-radius: 15px;

          background:
            linear-gradient(
              135deg,
              rgba(23, 50, 77, 0.95),
              rgba(72, 85, 104, 0.72)
            );

          color: var(--chess-ice);

          font-size: 23px;
        }

        .training-card-content {
          min-width: 0;
          flex: 1;

          display: flex;
          flex-direction: column;

          gap: 7px;
        }

        .training-card-content strong {
          color: var(--chess-white);

          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .training-card-content span {
          color: var(--chess-muted);

          font-size: 13px;
          line-height: 1.55;
        }

        .training-arrow {
          width: 32px;
          height: 32px;

          flex: 0 0 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: rgba(185, 215, 232, 0.05);

          color: var(--chess-ice);

          font-size: 17px;

          transition:
            transform 160ms ease,
            background 160ms ease;
        }

        .training-card:hover .training-arrow {
          transform: translateX(4px);

          background: rgba(185, 215, 232, 0.1);
        }

        @media (max-width: 850px) {
          .training-hub {
            padding: 36px 20px 60px;
          }

          .training-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .training-card {
            min-height: 132px;
            padding: 20px;
          }
        }

        @media (max-width: 520px) {
          .training-intro {
            margin-bottom: 28px;
          }

          .training-intro h2 {
            font-size: 38px;
          }

          .training-card {
            gap: 16px;
            padding: 18px;
          }

          .training-icon {
            width: 46px;
            height: 46px;
            flex-basis: 46px;
            font-size: 20px;
          }
        }
      `}</style>

      <div
        className={`app ${
          sidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <aside className="desktop-sidebar">
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label={
              sidebarCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? "›" : "‹"}
          </button>

          <div className="brand">
            <div className="brand-piece">♟</div>

            <div className="brand-text">
              <div className="brand-title">Chess</div>
              <div className="brand-subtitle">
                Your chess journey
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">Main</div>

            <button
              className={`sidebar-button ${
                screen === "home" ? "active" : ""
              }`}
              onClick={() => navigate("home")}
              title="Home"
            >
              <span className="sidebar-icon">⌂</span>
              <span className="sidebar-label">Home</span>
            </button>

            <button
              className={`sidebar-button ${
                screen === "play" ? "active" : ""
              }`}
              onClick={() => navigate("play")}
              title="Play"
            >
              <span className="sidebar-icon">♟</span>
              <span className="sidebar-label">Play</span>
            </button>

            <button
              className={`sidebar-button ${
                screen === "train" ||
                screen === "puzzles" ||
                screen === "puzzle-rush" ||
                screen === "calculation" ||
                screen === "blindfold" ||
                screen === "coordinate-speed-run" ||
                screen === "pawn-skeletons" ||
                screen === "guess-evaluation"
                  ? "active"
                  : ""
              }`}
              onClick={() => navigate("train")}
              title="Train"
            >
              <span className="sidebar-icon">⚡</span>
              <span className="sidebar-label">Train</span>
            </button>

            <button
              className={`sidebar-button ${
                isLearnScreen ? "active" : ""
              }`}
              onClick={() => navigate("learn")}
              title="Learn"
            >
              <span className="sidebar-icon">📖</span>
              <span className="sidebar-label">Learn</span>
            </button>

            <div className="nav-section-label">
              Your journey
            </div>

            <button
              className={`sidebar-button ${
                screen === "progress" ? "active" : ""
              }`}
              onClick={() => navigate("progress")}
              title="Progress"
            >
              <span className="sidebar-icon">📈</span>
              <span className="sidebar-label">Progress</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            Keep learning.
            <br />
            Keep improving.
          </div>
        </aside>

        <div className="app-main">
          <header className="app-header">
            <div className="app-header-inner">
              <div className="header-context">
                <div className="header-kicker">
                  {screen === "home"
                    ? "Your chess journey"
                    : screen === "play"
                    ? "Play"
                    : screen === "train" ||
                      screen === "puzzles" ||
                      screen === "puzzle-rush" ||
                      screen === "calculation" ||
                      screen === "blindfold" ||
                      screen === "coordinate-speed-run" ||
                      screen === "pawn-skeletons" ||
                      screen === "guess-evaluation"
                    ? "Training"
                    : isLearnScreen
                    ? "Learn"
                    : screen === "progress"
                    ? "Progress"
                    : "Chess"}
                </div>

                <h2 className="header-title">
                  {screen === "home"
                    ? "Welcome back"
                    : screen === "play"
                    ? "Play chess"
                    : screen === "train"
                    ? "Training"
                    : screen === "learn"
                    ? "Build understanding"
                    : screen === "progress"
                    ? "Track your progress"
                    : isLearnScreen
                    ? "Keep learning"
                    : "Chess training"}
                </h2>

                <p className="header-subtitle">
                  {screen === "home"
                    ? "Choose where you want to continue."
                    : screen === "play"
                    ? "Put your chess understanding into practice."
                    : screen === "train"
                    ? "Sharpen the skills behind your decisions."
                    : isLearnScreen
                    ? "Understand the ideas behind the moves."
                    : screen === "progress"
                    ? "See how your chess is developing."
                    : ""}
                </p>
              </div>

              <div className="header-accent" />
            </div>
          </header>

          <main className="app-content">
            {renderScreen()}
          </main>
        </div>

        <nav className="mobile-nav">
          <button
            className={`mobile-nav-button ${
              screen === "home" ? "active" : ""
            }`}
            onClick={() => navigate("home")}
          >
            <span className="mobile-nav-icon">⌂</span>
            Home
          </button>

          <button
            className={`mobile-nav-button ${
              screen === "play" ? "active" : ""
            }`}
            onClick={() => navigate("play")}
          >
            <span className="mobile-nav-icon">♟</span>
            Play
          </button>

          <button
            className={`mobile-nav-button ${
              screen === "train" ? "active" : ""
            }`}
            onClick={() => navigate("train")}
          >
            <span className="mobile-nav-icon">⚡</span>
            Train
          </button>

          <button
            className={`mobile-nav-button ${
              isLearnScreen ? "active" : ""
            }`}
            onClick={() => navigate("learn")}
          >
            <span className="mobile-nav-icon">📖</span>
            Learn
          </button>

          <button
            className={`mobile-nav-button ${
              screen === "progress" ? "active" : ""
            }`}
            onClick={() => navigate("progress")}
          >
            <span className="mobile-nav-icon">📈</span>
            Progress
          </button>
        </nav>
      </div>
    </>
  );
}