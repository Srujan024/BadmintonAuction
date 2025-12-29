import { useState } from "react";
import { TEAM_DETAILS } from "./constants/teamDetails";
import { CAPTAIN_BID } from "./AuctionDashboard";

const TOTAL_PURSE = 60000;

function normalizeTeam(team) {
  return {
    ...team,
    players: team.players.map((p) =>
      p.captain ? { ...p, bidAmount: CAPTAIN_BID[p.tier] } : p
    ),
  };
}

function tierSpend(players, tier) {
  return players
    .filter((p) => p.tier === tier)
    .reduce((sum, p) => sum + p.bidAmount, 0);
}

function totalSpend(players) {
  return players.reduce((sum, p) => sum + p.bidAmount, 0);
}

export default function TeamCompare() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(1);

  const teamA = normalizeTeam(TEAM_DETAILS[left]);
  const teamB = normalizeTeam(TEAM_DETAILS[right]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-10">Team Comparison</h1>

      {/* Selectors */}
      <div className="flex justify-center gap-6 mb-10">
        <select value={left} onChange={(e) => setLeft(+e.target.value)}>
          {TEAM_DETAILS.map((t, i) => (
            <option key={t.id} value={i}>
              {t.name}
            </option>
          ))}
        </select>

        <span className="font-bold text-xl">VS</span>

        <select value={right} onChange={(e) => setRight(+e.target.value)}>
          {TEAM_DETAILS.map((t, i) => (
            <option key={t.id} value={i}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto text-center bg-white rounded-xl shadow p-6">
        <div className="font-semibold">Metric</div>
        <div className="font-bold">{teamA.name}</div>
        <div className="font-bold">{teamB.name}</div>

        <div>Total Spend</div>
        <div>₹{totalSpend(teamA.players)}</div>
        <div>₹{totalSpend(teamB.players)}</div>

        <div>Tier A Spend</div>
        <div>₹{tierSpend(teamA.players, "A")}</div>
        <div>₹{tierSpend(teamB.players, "A")}</div>

        <div>Tier B Spend</div>
        <div>₹{tierSpend(teamA.players, "B")}</div>
        <div>₹{tierSpend(teamB.players, "B")}</div>

        <div>Tier C Spend</div>
        <div>₹{tierSpend(teamA.players, "C")}</div>
        <div>₹{tierSpend(teamB.players, "C")}</div>

        <div>Remaining Purse</div>
        <div>₹{TOTAL_PURSE - totalSpend(teamA.players)}</div>
        <div>₹{TOTAL_PURSE - totalSpend(teamB.players)}</div>
      </div>
    </div>
  );
}
