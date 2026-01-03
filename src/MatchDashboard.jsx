import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { MATCH_DATA } from "./data/matchBackend";
import MatchResultModal from "./components/MatchResultModal";
import KnockoutMatchCard from "./components/KnockoutMatchCard";
import FixturesBracket from "./components/FixturesBracket";
import { calculatePoolStandings } from "./utils/poolStandings";
import { getMatchOutcome } from "./utils/matchWinner";

/* ---------- HELPERS ---------- */

function hasAnyResult(match) {
  if (!match || !match.results) return false;

  return Object.values(match.results).some(
    (r) => typeof r?.pointsA === "number" && typeof r?.pointsB === "number"
  );
}

function isPoolLeagueComplete(pool) {
  return pool.teams.every((t) => t.wins + t.losses === 3);
}

function isSemiDecided(match) {
  if (!match) return false;
  const outcome = getMatchOutcome(match);
  return (
    outcome?.winner &&
    outcome.reason !== "DNP" &&
    outcome.reason !== "Incomplete"
  );
}

function getFinalDecision(match) {
  if (!match) return { status: "IN_PROGRESS" };

  const outcome = getMatchOutcome(match);
  if (!outcome?.winner) return { status: "IN_PROGRESS" };

  if (outcome.reason === "DNP" || outcome.reason === "Incomplete") {
    return { status: "IN_PROGRESS" };
  }

  return {
    status: "DECIDED",
    winner: outcome.winner,
    runnerUp:
      outcome.winner === match.teams[0] ? match.teams[1] : match.teams[0],
    reason: outcome.reason,
  };
}

function getMatchSummary(match) {
  let eventsA = 0;
  let eventsB = 0;
  let pointsA = 0;
  let pointsB = 0;
  let tbA = null;
  let tbB = null;

  Object.entries(match.results || {}).forEach(([key, r]) => {
    if (key === "TB") {
      if (typeof r?.pointsA === "number" && typeof r?.pointsB === "number") {
        tbA = r.pointsA;
        tbB = r.pointsB;
      }
      return;
    }

    if (typeof r?.pointsA === "number" && typeof r?.pointsB === "number") {
      pointsA += r.pointsA;
      pointsB += r.pointsB;

      if (r.pointsA > r.pointsB) eventsA++;
      else if (r.pointsB > r.pointsA) eventsB++;
    }
  });

  return { eventsA, eventsB, pointsA, pointsB, tbA, tbB };
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

  const handleSelectPool = (pool) => {
    setTab("Matches");
    setOpenA(pool === "A");
    setOpenB(pool === "B");
  };

  const handleFinalView = () => {
    setTab("Finals");
  };

  /* ---------- DATA ---------- */

  const poolAStandings = calculatePoolStandings(
    MATCH_DATA.pools.A,
    MATCH_DATA.matches.A
  );

  const poolBStandings = calculatePoolStandings(
    MATCH_DATA.pools.B,
    MATCH_DATA.matches.B
  );

  const semiMatches = MATCH_DATA.knockouts.semifinals;
  const finalMatch = MATCH_DATA.knockouts.finals[0];

  const finalDecision = getFinalDecision(finalMatch);

  /* ---------- TOURNAMENT STATES ---------- */

  const isPoolACompleted = isPoolLeagueComplete(MATCH_DATA.pools.A);
  const isPoolBCompleted = isPoolLeagueComplete(MATCH_DATA.pools.B);
  const isLeagueCompleted = isPoolACompleted && isPoolBCompleted;

  const areSemisReady =
    Array.isArray(semiMatches) &&
    semiMatches.length === 2 &&
    isSemiDecided(semiMatches[0]) &&
    isSemiDecided(semiMatches[1]);

  /* ---------- RENDER ---------- */

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-50 border-b px-8 py-4 font-bold flex justify-center">
        Racquet Rumble Badminton Tournament
      </div>

      {/* ---------- TABS ---------- */}
      <div className="flex justify-center mt-6 gap-2">
        {["Fixtures", "Pool Standings", "Matches", "Knockouts", "Finals"].map(
          (t) => {
            const disabled =
              (t === "Fixtures" && !isLeagueCompleted) ||
              (t === "Knockouts" && !isLeagueCompleted) ||
              (t === "Finals" && !areSemisReady);

            return (
              <button
                key={t}
                disabled={disabled}
                onClick={() => !disabled && setTab(t)}
                className={`px-6 py-2 rounded-lg transition
                  ${tab === t ? "bg-white shadow font-semibold" : "bg-gray-100"}
                  ${
                    disabled
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-gray-200"
                  }
                `}
                title={
                  disabled
                    ? t === "Finals"
                      ? "Complete both Semi Finals to unlock"
                      : "Complete all Pool matches to unlock"
                    : ""
                }
              >
                {t}
              </button>
            );
          }
        )}
      </div>

      {/* ---------- FIXTURES ---------- */}
      {tab === "Fixtures" && isLeagueCompleted && (
        <FixturesBracket
          poolAStandings={poolAStandings}
          poolBStandings={poolBStandings}
          semiMatches={semiMatches}
          finalMatch={finalMatch}
          finalDecision={finalDecision}
          onViewMatch={setSelectedMatch}
          onSelectPool={handleSelectPool}
          onFinalView={handleFinalView}
        />
      )}

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
                        <th className="text-left px-2">Team</th>
                        <th className="px-2">W</th>
                        <th className="px-2">L</th>
                        <th className="px-2">Pts</th>
                        <th className="px-2">Events</th>
                        <th className="px-2">Points</th>
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
                <button
                  onClick={() => set(!open)}
                  className="text-black transition-transform"
                >
                  <svg
                    className={`w-4 h-4 ${open ? "rotate-90" : "rotate-0"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6 4l8 6-8 6z" />
                  </svg>
                </button>
              </div>

              {open &&
                MATCH_DATA.matches[k].map((m, i) => {
                  const { eventsA, eventsB, pointsA, pointsB } =
                    getMatchSummary(m);
                  const outcome = getMatchOutcome(m);
                  const winner = outcome?.winner;

                  const teamA = m.teams[0];
                  const teamB = m.teams[1];

                  return (
                    <div
                      key={i}
                      className="flex justify-between items-center border rounded-lg p-4 mb-3"
                    >
                      {/* LEFT: Teams */}
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          <span className="text-sm">
                            <span
                              className={
                                outcome.winner === teamA
                                  ? "text-green-600 font-semibold"
                                  : "text-gray-900"
                              }
                            >
                              {teamA}
                            </span>{" "}
                            <span className="text-blue-600 font-semibold">
                              vs
                            </span>{" "}
                            <span
                              className={
                                outcome.winner === teamB
                                  ? "text-green-600 font-semibold"
                                  : "text-gray-900"
                              }
                            >
                              {teamB}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* CENTER: Results */}
                      <div className="text-sm text-gray-700 text-right mr-6">
                        <div>
                          <span className="font-semibold">Matches:</span>{" "}
                          <span
                            className={
                              eventsA !== eventsB && outcome.winner === teamA
                                ? "text-green-600 font-semibold"
                                : ""
                            }
                          >
                            {eventsA}
                          </span>{" "}
                          -{" "}
                          <span
                            className={
                              eventsA !== eventsB && outcome.winner === teamB
                                ? "text-green-600 font-semibold"
                                : ""
                            }
                          >
                            {eventsB}
                          </span>
                        </div>

                        <div>
                          <span className="font-semibold">Points:</span>{" "}
                          <span
                            className={
                              outcome.winner === teamA
                                ? "text-green-600 font-semibold"
                                : ""
                            }
                          >
                            {pointsA}
                          </span>{" "}
                          -{" "}
                          <span
                            className={
                              outcome.winner === teamB
                                ? "text-green-600 font-semibold"
                                : ""
                            }
                          >
                            {pointsB}
                          </span>
                        </div>

                        {/* ✅ TB DISPLAY */}
                        {outcome.reason === "TieBreaker" &&
                          tbA !== null &&
                          tbB !== null && (
                            <div className="text-xs text-gray-500 mt-1">
                              Tie Break:{" "}
                              <span
                                className={
                                  outcome.winner === teamA
                                    ? "text-green-600 font-semibold"
                                    : ""
                                }
                              >
                                {tbA}
                              </span>{" "}
                              -{" "}
                              <span
                                className={
                                  outcome.winner === teamB
                                    ? "text-green-600 font-semibold"
                                    : ""
                                }
                              >
                                {tbB}
                              </span>
                            </div>
                          )}
                      </div>

                      {/* RIGHT: Action */}
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
                  );
                })}
            </div>
          ))}

        {/* ---------- KNOCKOUTS ---------- */}
        {tab === "Knockouts" && isLeagueCompleted && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">Semi Finals</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {semiMatches.map((m, i) => (
                <KnockoutMatchCard
                  key={i}
                  match={m}
                  onView={() => setSelectedMatch(m)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ---------- FINALS ---------- */}
        {tab === "Finals" && areSemisReady && (
          <div className="space-y-8">
            {finalDecision.status === "DECIDED" ? (
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-10 overflow-hidden">
                <Confetti recycle={false} numberOfPieces={400} />
                <div className="relative z-10 text-center">
                  <p className="uppercase tracking-widest text-sm opacity-80">
                    Tournament Champion
                  </p>
                  <h1 className="text-4xl font-extrabold mt-2">
                    🏆 {finalDecision.winner}
                  </h1>
                  <p className="mt-2 text-sm opacity-90">
                    Decided by {finalDecision.reason}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 border border-dashed rounded-2xl p-10 text-center">
                <h2 className="text-2xl font-bold text-gray-700">
                  Match In Progress
                </h2>
              </div>
            )}

            {/* ✅ FINAL VIEW MATCH RESULT — RESTORED */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold mb-4">Final – Match Details</h2>

              <div className="flex justify-between items-center border p-4 rounded">
                <span className="font-medium">
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
                  View Result
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
  