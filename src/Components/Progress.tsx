
export function Progress() {
  return (
    <>
      <style>{`
        .progress-page {
          width: 100%;
          min-height: 100%;
          padding: 52px 48px 80px;
          box-sizing: border-box;
        }

        .progress-header {
          max-width: 760px;
          margin-bottom: 40px;
        }

        .progress-eyebrow {
          margin-bottom: 12px;
          color: #6f9b89;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .progress-header h1 {
          margin: 0;
          color: #eef2f4;
          font-size: clamp(38px, 4vw, 54px);
          font-weight: 750;
          letter-spacing: -0.045em;
          line-height: 1;
        }

        .progress-header p {
          max-width: 650px;
          margin: 18px 0 0;
          color: #9da7ad;
          font-size: 16px;
          line-height: 1.65;
        }

        /* RANK */

        .progress-rank-card {
          position: relative;
          overflow: hidden;

          width: 100%;
          max-width: 1180px;

          margin-bottom: 24px;
          padding: 30px;

          border: 1px solid rgba(185, 215, 232, 0.1);
          border-radius: 22px;

          background:
            linear-gradient(
              135deg,
              #202427 0%,
              #1b2023 55%,
              #202427 100%
            );

          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.2);
        }

        .progress-rank-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .progress-rank-label {
          color: #9da7ad;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .progress-rank-name {
          margin-top: 8px;
          color: #eef2f4;
          font-size: 32px;
          font-weight: 750;
          letter-spacing: -0.035em;
        }

        .progress-rank-icon {
          width: 70px;
          height: 70px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(185, 215, 232, 0.12);
          border-radius: 18px;

          background: #17324d;

          font-size: 34px;
        }

        .progress-xp-row {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-top: 26px;

          color: #9da7ad;
          font-size: 13px;
        }

        .progress-xp-row strong {
          color: #eef2f4;
          font-weight: 700;
        }

        .progress-bar {
          width: 100%;
          height: 9px;

          margin-top: 10px;

          overflow: hidden;

          border-radius: 999px;
          background: #2b3033;
        }

        .progress-bar-fill {
          width: 68%;
          height: 100%;

          border-radius: inherit;

          background: #6f9b89;
        }

        /* STATS */

        .progress-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;

          margin-bottom: 28px;
        }

        .progress-stat {
          padding: 22px;

          border: 1px solid rgba(185, 215, 232, 0.08);
          border-radius: 18px;

          background: #202427;
        }

        .progress-stat-label {
          display: block;

          margin-bottom: 9px;

          color: #8e989e;
          font-size: 12px;
          line-height: 1.4;
        }

        .progress-stat-value {
          color: #eef2f4;
          font-size: 27px;
          font-weight: 750;
          letter-spacing: -0.025em;
        }

        /* SECTIONS */

        .progress-section {
          margin-top: 28px;
        }

        .progress-section h3 {
          margin: 0 0 16px;

          color: #eef2f4;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.015em;
        }

        /* SKILLS */

        .progress-skills {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .progress-skill {
          padding: 20px;

          border: 1px solid rgba(185, 215, 232, 0.08);
          border-radius: 18px;

          background: #202427;
        }

        .progress-skill-top {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 11px;
        }

        .progress-skill-name {
          color: #eef2f4;
          font-size: 14px;
          font-weight: 650;
        }

        .progress-skill-value {
          color: #9da7ad;
          font-size: 12px;
        }

        .progress-skill-bar {
          width: 100%;
          height: 7px;

          overflow: hidden;

          border-radius: 999px;
          background: #2b3033;
        }

        .progress-skill-fill {
          height: 100%;
          border-radius: inherit;
          background: #526b86;
        }

        /* ACTIVITY */

        .progress-activity {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 10px;

          padding: 22px;

          border: 1px solid rgba(185, 215, 232, 0.08);
          border-radius: 18px;

          background: #202427;
        }

        .progress-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
        }

        .progress-day-label {
          color: #8e989e;
          font-size: 11px;
          font-weight: 600;
        }

        .progress-day-dot {
          width: 34px;
          height: 34px;

          border-radius: 10px;

          background: #2b3033;
        }

        .progress-day-dot.active {
          background: #4f8a78;
        }

        .progress-day-dot.strong {
          background: #6f9b89;
        }

        /* HEATMAP */

        .progress-placeholder {
          min-height: 150px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          padding: 28px;

          border: 1px dashed rgba(185, 215, 232, 0.1);
          border-radius: 18px;

          background: #1b2023;

          text-align: center;
        }

        .progress-placeholder span {
          margin-bottom: 10px;
          font-size: 28px;
        }

        .progress-placeholder p {
          max-width: 520px;
          margin: 0;

          color: #8e989e;
          font-size: 13px;
          line-height: 1.6;
        }

        @media (max-width: 850px) {
          .progress-page {
            padding: 36px 20px 60px;
          }

          .progress-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .progress-skills {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .progress-header h1 {
            font-size: 38px;
          }

          .progress-rank-card {
            padding: 22px;
          }

          .progress-rank-icon {
            width: 58px;
            height: 58px;
            font-size: 28px;
          }

          .progress-rank-name {
            font-size: 27px;
          }

          .progress-stats {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .progress-stat {
            padding: 17px;
          }

          .progress-stat-value {
            font-size: 23px;
          }

          .progress-activity {
            padding: 16px 10px;
            gap: 6px;
          }

          .progress-day-dot {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>

      <section className="progress-page">
        <div className="progress-header">
          <div className="progress-eyebrow">YOUR JOURNEY</div>

          <h1>Your Progress</h1>

          <p>
            See how your chess is developing and discover what you have been
            working on.
          </p>
        </div>

        {/* RANK */}

        <div className="progress-rank-card">
          <div className="progress-rank-top">
            <div>
              <div className="progress-rank-label">Current rank</div>
              <div className="progress-rank-name">Horse IV</div>
            </div>

            <div className="progress-rank-icon">♞</div>
          </div>

          <div className="progress-xp-row">
            <span>1,240 XP</span>
            <strong>1,500 XP</strong>
          </div>

          <div className="progress-bar">
            <div className="progress-bar-fill" />
          </div>
        </div>

        {/* STATS */}

        <div className="progress-stats">
          <div className="progress-stat">
            <span className="progress-stat-label">Training sessions</span>
            <span className="progress-stat-value">24</span>
          </div>

          <div className="progress-stat">
            <span className="progress-stat-label">Puzzles solved</span>
            <span className="progress-stat-value">138</span>
          </div>

          <div className="progress-stat">
            <span className="progress-stat-label">Current streak</span>
            <span className="progress-stat-value">6 days</span>
          </div>

          <div className="progress-stat">
            <span className="progress-stat-label">Best streak</span>
            <span className="progress-stat-value">14 days</span>
          </div>
        </div>

        {/* SKILLS */}

        <div className="progress-section">
          <h3>🧠 Your Skills</h3>

          <div className="progress-skills">
            <div className="progress-skill">
              <div className="progress-skill-top">
                <span className="progress-skill-name">Tactics</span>
                <span className="progress-skill-value">78%</span>
              </div>

              <div className="progress-skill-bar">
                <div
                  className="progress-skill-fill"
                  style={{ width: "78%" }}
                />
              </div>
            </div>

            <div className="progress-skill">
              <div className="progress-skill-top">
                <span className="progress-skill-name">Calculation</span>
                <span className="progress-skill-value">64%</span>
              </div>

              <div className="progress-skill-bar">
                <div
                  className="progress-skill-fill"
                  style={{ width: "64%" }}
                />
              </div>
            </div>

            <div className="progress-skill">
              <div className="progress-skill-top">
                <span className="progress-skill-name">Visualization</span>
                <span className="progress-skill-value">52%</span>
              </div>

              <div className="progress-skill-bar">
                <div
                  className="progress-skill-fill"
                  style={{ width: "52%" }}
                />
              </div>
            </div>

            <div className="progress-skill">
              <div className="progress-skill-top">
                <span className="progress-skill-name">Positional Play</span>
                <span className="progress-skill-value">71%</span>
              </div>

              <div className="progress-skill-bar">
                <div
                  className="progress-skill-fill"
                  style={{ width: "71%" }}
                />
              </div>
            </div>

            <div className="progress-skill">
              <div className="progress-skill-top">
                <span className="progress-skill-name">Openings</span>
                <span className="progress-skill-value">67%</span>
              </div>

              <div className="progress-skill-bar">
                <div
                  className="progress-skill-fill"
                  style={{ width: "67%" }}
                />
              </div>
            </div>

            <div className="progress-skill">
              <div className="progress-skill-top">
                <span className="progress-skill-name">Endgames</span>
                <span className="progress-skill-value">59%</span>
              </div>

              <div className="progress-skill-bar">
                <div
                  className="progress-skill-fill"
                  style={{ width: "59%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVITY */}

        <div className="progress-section">
          <h3>📅 Training Activity</h3>

          <div className="progress-activity">
            <div className="progress-day">
              <span className="progress-day-label">Mon</span>
              <div className="progress-day-dot active" />
            </div>

            <div className="progress-day">
              <span className="progress-day-label">Tue</span>
              <div className="progress-day-dot strong" />
            </div>

            <div className="progress-day">
              <span className="progress-day-label">Wed</span>
              <div className="progress-day-dot active" />
            </div>

            <div className="progress-day">
              <span className="progress-day-label">Thu</span>
              <div className="progress-day-dot" />
            </div>

            <div className="progress-day">
              <span className="progress-day-label">Fri</span>
              <div className="progress-day-dot strong" />
            </div>

            <div className="progress-day">
              <span className="progress-day-label">Sat</span>
              <div className="progress-day-dot active" />
            </div>

            <div className="progress-day">
              <span className="progress-day-label">Sun</span>
              <div className="progress-day-dot active" />
            </div>
          </div>
        </div>

        {/* HEATMAP */}

        <div className="progress-section">
          <h3>♟️ Chess Heatmap</h3>

          <div className="progress-placeholder">
            <span>🗺️</span>

            <p>
              Your future chess heatmap will show where your moves, mistakes,
              and important moments happen across the board.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
