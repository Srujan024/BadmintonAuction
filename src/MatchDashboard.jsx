import { useState } from "react";
import { MATCH_DATA } from "./data/matchBackend";
import MatchResultModal from "./components/MatchResultModal";

/* ---------- CONSTANTS ---------- */

const TABS = ["Pool Standings", "Matches", "Knockouts"];

/* ---------- MAIN ---------- */

export default function MatchDashboard() {
  const [activeTab, setActiveTab] = useState("Pool Standings");

  const poolA = MATCH_DATA.pools.A;
  const poolB = MATCH_DATA.pools.B;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-green-600 flex items-center justify-center text-white">
            🏸
          </div>
          <div>
            <h1 className="text-lg font-bold">
              Racquet Rumble Badminton Tournament
            </h1>
            <p className="text-sm text-gray-500">Season 2</p>
          </div>
        </div>

        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          👤
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-8">
        <div className="bg-gray-100 rounded-xl p-1 flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm transition ${
                activeTab === tab
                  ? "bg-white shadow font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-8">
        {activeTab === "Pool Standings" && (
          <PoolStandings poolA={poolA} poolB={poolB} />
        )}

        {activeTab === "Matches" && (
          <Matches
            poolAFixtures={MATCH_DATA.matches.A}
            poolBFixtures={MATCH_DATA.matches.B}
          />
        )}

        {activeTab === "Knockouts" && (
          <Knockouts knockouts={MATCH_DATA.knockouts} />
        )}
      </div>
    </div>
  );
}

/* ---------- POOL STANDINGS ---------- */

function PoolStandings({ poolA, poolB }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <StandingsCard pool={poolA} />
      <StandingsCard pool={poolB} />
    </div>
  );
}

function StandingsCard({ pool }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">{pool.name} Standings</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="text-left py-2">Team</th>
            <th>W</th>
            <th>L</th>
            <th>Pts</th>
          </tr>
        </thead>

        <tbody>
          {pool.teams.map((team) => (
            <tr key={team.name} className="border-t">
              <td className="py-3 font-medium">{team.name}</td>
              <td className="text-center">{team.wins}</td>
              <td className="text-center">{team.losses}</td>
              <td className="text-center font-bold">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- MATCHES ---------- */

function Matches({ poolAFixtures, poolBFixtures }) {
  const [collapsedA, setCollapsedA] = useState(true);
  const [collapsedB, setCollapsedB] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <>
      <MatchGroup
        title="Pool A Matches"
        matches={poolAFixtures}
        collapsed={collapsedA}
        onToggle={() => setCollapsedA((v) => !v)}
        setSelectedMatch={setSelectedMatch}
      />
      <MatchGroup
        title="Pool B Matches"
        matches={poolBFixtures}
        collapsed={collapsedB}
        onToggle={() => setCollapsedB((v) => !v)}
        setSelectedMatch={setSelectedMatch}
      />
      {selectedMatch && (
        <MatchResultModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </>
  );
}

function MatchGroup({ title, matches, collapsed, onToggle, setSelectedMatch }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <button
        onClick={onToggle}
        className="flex justify-between w-full font-semibold mb-4"
      >
        <span>{title}</span>
        <span className="text-gray-400">{collapsed ? "▶" : "▼"}</span>
      </button>

      {!collapsed &&
        matches.map((match, idx) => {
          const [a, b] = match.teams;
          return (
            <div
              key={idx}
              className="flex justify-between items-center border rounded p-3 mb-3"
            >
              <span className="font-medium">
                {a} <span className="text-indigo-600">vs</span> {b}
              </span>
              <span className="italic text-gray-500">TBD</span>
              <button
                className="px-4 py-1 rounded bg-gray-600 text-white text-sm"
                onClick={() => setSelectedMatch(match)}
              >
                View
              </button>
            </div>
          );
        })}
    </div>
  );
}

/* ---------- KNOCKOUTS ---------- */

function Knockouts({ knockouts }) {
  return (
    <>
      <KnockoutGroup title="Semi Finals" matches={knockouts.semifinals} />
      <KnockoutGroup title="Finals" matches={knockouts.finals} />
    </>
  );
}

function KnockoutGroup({ title, matches }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="font-semibold mb-4">{title}</h2>

      {matches.map(([a, b], i) => (
        <div
          key={i}
          className="flex justify-between items-center border rounded p-3 mb-3"
        >
          <span>
            {a} <span className="text-indigo-600">vs</span> {b}
          </span>
          <span className="italic text-gray-500">TBD</span>
          <button className="px-4 py-1 rounded bg-gray-600 text-white text-sm">
            View
          </button>
        </div>
      ))}
    </div>
  );
}
