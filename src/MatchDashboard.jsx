import { useState, useEffect } from "react";
import { MATCH_DATA } from "./data/matchBackend";
import MatchResultModal from "./components/MatchResultModal";

/* ---------- HELPERS ---------- */

function hasAnyResult(match) {
  return Object.values(match.results || {}).some(
    (r) => typeof r?.pointsA === "number" && typeof r?.pointsB === "number"
  );
}

function calculateStandings(pool, matches) {
  const totalMatchesPerTeam = pool.teams.length - 1;

  const table = pool.teams.map((t) => ({
    ...t,
    points: t.wins * 2, // backend W → base points
    eventsWon: 0,
    pointsWon: 0,
    played: 0,
  }));

  matches.forEach((m) => {
    const [aName, bName] = m.teams;
    const A = table.find((t) => t.name === aName);
    const B = table.find((t) => t.name === bName);
    if (!A || !B) return;

    let eA = 0,
      eB = 0,
      pA = 0,
      pB = 0;
    let played = false;

    Object.values(m.results || {}).forEach((r) => {
      if (typeof r?.pointsA === "number" && typeof r?.pointsB === "number") {
        played = true;
        pA += r.pointsA;
        pB += r.pointsB;
        if (r.pointsA > r.pointsB) eA++;
        if (r.pointsB > r.pointsA) eB++;
      }
    });

    if (!played) return;

    A.played++;
    B.played++;

    A.eventsWon += eA;
    B.eventsWon += eB;
    A.pointsWon += pA;
    B.pointsWon += pB;
  });

  const sorted = [...table].sort(
    (a, b) =>
      b.points - a.points ||
      b.eventsWon - a.eventsWon ||
      b.pointsWon - a.pointsWon
  );

  // ✅ CONFIRMED QUALIFICATION LOGIC
  return sorted.map((team, index) => {
    if (index > 1) return { ...team, qualified: false };

    const third = sorted[2];
    if (!third) return { ...team, qualified: false };

    const remaining = totalMatchesPerTeam - team.played;
    const teamMax = team.points + remaining * 2;

    const thirdRemaining = totalMatchesPerTeam - third.played;
    const thirdMax = third.points + thirdRemaining * 2;

    return { ...team, qualified: team.points > thirdMax };
  });
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
        {/* ---------- STANDINGS ---------- */}
        {tab === "Pool Standings" && (
          <div className="grid grid-cols-2 gap-8">
            {["A", "B"].map((p) => {
              const pool = MATCH_DATA.pools[p];
              const standings = calculateStandings(pool, MATCH_DATA.matches[p]);

              return (
                <div key={p} className="bg-white rounded-xl shadow p-6">
                  <h2 className="font-semibold mb-4">{pool.name}</h2>

                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left">Team</th>
                        <th className="px-3">W</th>
                        <th className="px-3">L</th>
                        <th className="px-3">Pts</th>
                        <th>
                          Events
                          <span className="ml-1 text-xs text-gray-600">
                            (wins)
                          </span>
                        </th>
                        <th>
                          Points
                          <span className="ml-1 text-xs text-gray-600">
                            (wins)
                          </span>
                        </th>
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
                              <span className="ml-1 text-indigo-600 text-xs">
                                Q
                              </span>
                            )}
                          </td>
                          <td className="text-center px-3">{t.wins}</td>
                          <td className="text-center px-3">{t.losses}</td>
                          <td className="text-center font-bold px-3">
                            {t.points}
                          </td>
                          <td className="text-center">{t.eventsWon}</td>
                          <td className="text-center">{t.pointsWon}</td>
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
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
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

        {/* ---------- FINALS (FIXED PATH) ---------- */}
        {tab === "Finals" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4">Final</h2>
            {MATCH_DATA.knockouts.finals.map((m, i) => (
              <div key={i} className="flex justify-between border p-3">
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
