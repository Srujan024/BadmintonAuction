import { TEAM_DETAILS } from "./constants/teamDetails";
import TeamCard from "./TeamCard";
import { motion } from "framer-motion";

export const CAPTAIN_BID = {
  A: 15000,
  B: 10000,
  C: 6000,
};

const TOTAL_PURSE = 60000;

function normalizeTeam(team) {
  return {
    ...team,
    players: team.players.map((p) =>
      p.captain ? { ...p, bidAmount: CAPTAIN_BID[p.tier] } : p
    ),
  };
}

function getTierSpend(team, tier) {
  return team.players
    .filter((p) => p.tier === tier)
    .reduce((sum, p) => sum + p.bidAmount, 0);
}

function getTotalSpend(team) {
  return team.players.reduce((sum, p) => sum + p.bidAmount, 0);
}

export default function AuctionDashboard() {
  const teams = TEAM_DETAILS.map((team) => {
    const normalized = normalizeTeam(team);
    const totalSpent = getTotalSpend(normalized);

    return {
      ...normalized,
      purse: TOTAL_PURSE - totalSpent,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* 🔒 KEEP EXISTING TITLE DESIGN */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Racquet Rumble Badminton Tournament 2026
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Auction Dashboard · Team-wise Spend Overview
        </p>
      </div>

      {/* 🔒 KEEP EXISTING CARD GRID DESIGN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {teams.map((team, index) => (
          <TeamCard
            key={team.id}
            team={team}
            index={index}
            tierSpend={getTierSpend}
          />
        ))}
      </div>
    </motion.div>
  );
}
