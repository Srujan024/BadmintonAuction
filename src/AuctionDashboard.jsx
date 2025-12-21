import { useState } from "react";
import TeamCard from "./TeamCard";

const CARD_COLOR_MODELS = [
  { bg: "bg-gradient-to-br from-blue-200 to-blue-400", card: "bg-white" },
  { bg: "bg-gradient-to-br from-green-200 to-green-400", card: "bg-white" },
  { bg: "bg-gradient-to-br from-yellow-200 to-yellow-400", card: "bg-white" },
  { bg: "bg-gradient-to-br from-pink-200 to-pink-400", card: "bg-white" }
];

const TEAMS = [
  "Team A","Team B","Team C","Team D",
  "Team E","Team F","Team G","Team H"
];

const TIER_CONFIG = {
  A: { base: 12000 },
  B: { base: 7000 },
  C: { base: 3000 }
};

const CAPTAIN_COST = { A: 15000, B: 10000, C: 6000 };
const TOTAL_PURSE = 60000;

export default function AuctionDashboard() {
  const [teams, setTeams] = useState(() =>
    TEAMS.map(name => ({
      name,
      captainTier: null,
      purse: TOTAL_PURSE,
      players: []
    }))
  );

  function setCaptain(index, tier) {
    setTeams(prev =>
      prev.map((t, i) =>
        i !== index
          ? t
          : {
              ...t,
              captainTier: tier,
              purse: TOTAL_PURSE - CAPTAIN_COST[tier],
              players: [{ name: "Captain", tier, price: CAPTAIN_COST[tier] }]
            }
      )
    );
  }

  function tierCount(team, tier) {
    return team.players.filter(p => p.tier === tier).length;
  }

  function minRequiredBudget(team) {
    return (8 - team.players.length) * TIER_CONFIG.C.base;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Badminton League Auction – Main Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {teams.map((team, i) => {
          const color = CARD_COLOR_MODELS[i % CARD_COLOR_MODELS.length];
          return (
            <div key={team.name} className={`p-6 rounded-3xl ${color.bg}`}>
              <TeamCard
                team={team}
                index={i}
                setCaptain={setCaptain}
                tierCount={tierCount}
                minRequiredBudget={minRequiredBudget}
                CAPTAIN_COST={CAPTAIN_COST}
                cardColor={color.card}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
