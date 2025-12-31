import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { MATCH_DATA } from "./data/matchBackend";
import MatchResultModal from "./components/MatchResultModal";
import { calculatePoolStandings } from "./utils/poolStandings";

/* ---------- HELPERS ---------- */

function hasAnyResult(match) {
  return Object.values(match.results || {}).some(
    (r) => typeof r?.pointsA === "number" && typeof r?.pointsB === "number"
  );
}

function getFinalOutcome(match) {
  if (!match) return null;

  const [A, B] = match.teams;
  let wA = 0,
    wB = 0;

  Object.values(match.results || {}).forEach((r) => {
    if (typeof r?.pointsA === "number" && typeof r?.pointsB === "number") {
      if (r.pointsA > r.pointsB) wA++;
      if (r.pointsB > r.pointsA) wB++;
    }
  });

  if (wA === 0 && wB === 0) return null;

  return {
    winner: wA > wB ? A : B,
    runnerUp: wA > wB ? B : A,
    score: `${wA} - ${wB}`,
  };
}

/* ---------- SESSION ---------- */

const getStored = (k, d) =>
  sessionStorage.getItem(k) === null ? d : sessionStorage.getItem(k) === "true";
const setStored = (k, v) => sessionStorage.setItem(k, v);

/* ---------- MAIN ---------- */

export default function MatchDashboard() {
  const [tab, setTab] = useState("Pool Standings");
  const [selectedMatch, setSelectedMatch] = useState(null);

  const [openA, setOpenA] = useState(() => getStored("poolA", true));
  const [openB, setOpenB] = useState(() => getStored("poolB", true));

  useEffect(() => setStored("poolA", openA), [openA]);
  useEffect(() => setStored("poolB", openB), [openB]);

  const finalMatch = MATCH_DATA.knockouts.finals[0];
  const finalOutcome = getFinalOutcome(finalMatch);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-8 py-4 font-bold">
        Racquet Rumble Badminton Tournament
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-6 gap-2">
        {["Pool Standings", "Matches", "Knockouts", "Finals"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-lg ${
              tab === t ? "bg-white shadow font-semibold" : "bg-gray-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* ---------- POOL STANDINGS ---------- */}
        {tab === "Pool Standings" && (
          <div className="grid grid-cols-2 gap-8">
            {["A", "B"].map((p) => {
              const pool = MATCH_DATA.pools[p];
              const standings = calculatePoolStandings(
                pool,
                MATCH_DATA.matches[p]
              );

              return (
                <div key={p} className="bg-white rounded-xl shadow p-6">
                  <h2 className="font-semibold mb-4">{pool.name}</h2>

                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left">Team</th>
                        <th>W</th>
                        <th>L</th>
                        <th>Pts</th>
                        <th>Events</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((t) => (
                        <tr
                          key={t.name}
                          className={`border-t ${
                            t.qualified ? "bg-indigo-50" : ""
                          }`}
                        >
                          <td className="py-2 font-medium">
                            {t.name}
                            {t.qualified && (
                              <span className="ml-1 text-indigo-600 text-xs font-semibold">
                                {t.qualifiedViaTieBreaker ? "TQ" : "Q"}
                              </span>
                            )}
                          </td>
                          <td className="text-center">{t.wins}</td>
                          <td className="text-center">{t.losses}</td>
                          <td className="text-center font-bold">
                            {t.matchPoints}
                          </td>
                          <td className="text-center">{t.gamesWon}</td>
                          <td className="text-center">{t.pointsFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        )}

        {/* ---------- MATCHES ---------- */}
        {tab === "Matches" &&
          [
            { k: "A", open: openA, set: setOpenA },
            { k: "B", open: openB, set: setOpenB },
          ].map(({ k, open, set }) => (
            <div key={k} className="bg-white rounded-xl shadow p-6 mb-8">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Pool {k} Matches</h2>
                <button onClick={() => set(!open)}>{open ? "▼" : "▶"}</button>
              </div>

              {open &&
                MATCH_DATA.matches[k].map((m, i) => (
                  <div key={i} className="flex justify-between border p-3 mb-2">
                    <span>
                      {m.teams[0]} vs {m.teams[1]}
                    </span>
                    <button
                      disabled={!hasAnyResult(m)}
                      onClick={() => setSelectedMatch(m)}
                      className={`px-4 py-1 rounded ${
                        hasAnyResult(m)
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      View
                    </button>
                  </div>
                ))}
            </div>
          ))}

        {/* ---------- KNOCKOUTS ---------- */}
        {tab === "Knockouts" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4">Semi Finals</h2>
            {MATCH_DATA.knockouts.semifinals.map((m, i) => (
              <div key={i} className="flex justify-between border p-3 mb-2">
                <span>
                  {m.teams[0]} vs {m.teams[1]}
                </span>
                <button
                  disabled={!hasAnyResult(m)}
                  onClick={() => setSelectedMatch(m)}
                  className={`px-4 py-1 rounded ${
                    hasAnyResult(m)
                      ? "bg-gray-600 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ---------- FINALS (NEW DESIGN) ---------- */}
        {tab === "Finals" && (
          <div className="space-y-8">
            {finalOutcome && (
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-10 overflow-hidden">
                <Confetti recycle={false} numberOfPieces={400} />

                <div className="relative z-10 text-center">
                  <p className="uppercase tracking-widest text-sm opacity-80">
                    Tournament Champion
                  </p>
                  <h1 className="text-4xl font-extrabold mt-2">
                    🏆 {finalOutcome.winner}
                  </h1>
                  <p className="mt-2">Final Score: {finalOutcome.score}</p>

                  <div className="mt-6 flex justify-center gap-6">
                    <div className="bg-white/20 px-6 py-4 rounded-xl">
                      <p className="text-xs uppercase">Champion</p>
                      <p className="font-bold">{finalOutcome.winner}</p>
                    </div>
                    <div className="bg-white/10 px-6 py-4 rounded-xl">
                      <p className="text-xs uppercase">Runner-up</p>
                      <p>{finalOutcome.runnerUp}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold mb-4">Final – Match Details</h2>
              <div className="flex justify-between border p-4 rounded">
                <span>
                  {finalMatch.teams[0]} vs {finalMatch.teams[1]}
                </span>
                <button
                  disabled={!hasAnyResult(finalMatch)}
                  onClick={() => setSelectedMatch(finalMatch)}
                  className={`px-4 py-1 rounded ${
                    hasAnyResult(finalMatch)
                      ? "bg-gray-600 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedMatch && (
        <MatchResultModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
}
