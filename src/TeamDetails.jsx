import { useParams, useNavigate } from "react-router-dom";
import { TEAM_DETAILS } from "./constants/teamDetails";
import { CAPTAIN_BID } from "./AuctionDashboard";
import { motion } from "framer-motion";
import { useState } from "react";
import PlayerModal from "./components/PlayerModal";
import TeamStatsModal from "./components/TeamStatsModal";

/* ---------- CONSTANTS ---------- */

const TOTAL_PURSE = 60000;

const PREMIUM_THRESHOLD = {
  A: 18000,
  B: 12000,
};

const STEAL_THRESHOLD = {
  B: 10000,
  C: 7000,
};

/* ---------- HELPERS ---------- */

export function isSteal(player) {
  if (player.tier === "A") return false;
  return player.bidAmount < STEAL_THRESHOLD[player.tier];
}

export function isPremium(player) {
  if (player.captain) return false;
  if (!PREMIUM_THRESHOLD[player.tier]) return false;
  return player.bidAmount > PREMIUM_THRESHOLD[player.tier];
}

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
    .reduce((s, p) => s + p.bidAmount, 0);
}

function totalSpend(players) {
  return players.reduce((s, p) => s + p.bidAmount, 0);
}

/* ---------- MAIN ---------- */

export default function TeamDetails() {
  const { teamIndex } = useParams();
  const navigate = useNavigate();

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const team = normalizeTeam(TEAM_DETAILS[teamIndex]);

  const captain = team.players.find((p) => p.captain);

  const auctionPlayers = team.players.filter((p) => !p.captain);

  const highestBid =
    auctionPlayers.length > 0
      ? Math.max(...auctionPlayers.map((p) => p.bidAmount))
      : null;

  const tierA = auctionPlayers.filter((p) => p.tier === "A");
  const tierB = auctionPlayers.filter((p) => p.tier === "B");
  const tierC = auctionPlayers.filter((p) => p.tier === "C");

  const spent = totalSpend(team.players);
  const remaining = TOTAL_PURSE - spent;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen p-8 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between mb-6">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ← Back
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              🖨 Print
            </button>
          </div>

          <h1 className="text-4xl font-bold text-center mb-4">{team.name}</h1>

          <div className="flex justify-center mb-10">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-indigo-400 to-pink-400" />
          </div>

          {/* Budget */}
          <div className="mb-12 bg-white rounded-2xl shadow-xl p-6 grid grid-cols-3 text-center">
            <Stat label="Total Purse" value={`₹${TOTAL_PURSE}`} />
            <Stat label="Spent" value={`₹${spent}`} danger />
            <Stat label="Remaining" value={`₹${remaining}`} success />
          </div>

          {/* Stats Button */}
          <div className="flex justify-center mb-16">
            <button
              onClick={() => setShowStats(true)}
              className="px-6 py-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            >
              📊 Team Statistics
            </button>
          </div>

          {/* Captain */}
          {captain && (
            <div className="flex justify-center mb-16">
              <PlayerCard
                player={captain}
                captain
                highest={false}
                onClick={() => setSelectedPlayer(captain)}
              />
            </div>
          )}

          <TierSection
            title="Tier A Players"
            spend={tierSpend(team.players, "A")}
          >
            {tierA.map((p) => (
              <PlayerCard
                key={p.id}
                player={p}
                highest={highestBid !== null && p.bidAmount === highestBid}
                onClick={() => setSelectedPlayer(p)}
              />
            ))}
          </TierSection>

          <TierSection
            title="Tier B Players"
            spend={tierSpend(team.players, "B")}
          >
            {tierB.map((p) => (
              <PlayerCard
                key={p.id}
                player={p}
                highest={highestBid !== null && p.bidAmount === highestBid}
                onClick={() => setSelectedPlayer(p)}
              />
            ))}
          </TierSection>

          <TierSection
            title="Tier C Players"
            spend={tierSpend(team.players, "C")}
          >
            {tierC.map((p) => (
              <PlayerCard
                key={p.id}
                player={p}
                highest={highestBid !== null && p.bidAmount === highestBid}
                onClick={() => setSelectedPlayer(p)}
              />
            ))}
          </TierSection>
        </div>
      </motion.div>

      <PlayerModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />

      {showStats && (
        <TeamStatsModal team={team} onClose={() => setShowStats(false)} />
      )}
    </>
  );
}

/* ---------- UI ---------- */

function TierSection({ title, spend, children }) {
  if (!children.length) return null;

  return (
    <div className="mb-16">
      <h2 className="text-xl font-semibold text-center mb-1 text-gray-600">
        {title}
      </h2>
      <p className="text-center text-sm text-gray-400 mb-6">
        ₹{spend} spent · {children.length} player(s)
      </p>

      <div className="flex justify-center flex-wrap gap-10">{children}</div>
    </div>
  );
}

function PlayerCard({ player, captain, highest, onClick }) {
  const ring =
    player.tier === "A"
      ? "ring-red-400"
      : player.tier === "B"
      ? "ring-yellow-400"
      : "ring-green-400";

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div
        className={`
          w-56 min-h-[360px]
          p-6 bg-white rounded-2xl
          shadow-xl ring-4 ${ring}
          flex flex-col justify-between
        `}
      >
        {/* Top badges */}
        <div className="flex justify-center gap-2 flex-wrap mb-2">
          {captain && <Badge text="👑 CAPTAIN" />}
          {highest && <Badge text="🏆 Highest Bid" />}
        </div>

        {/* Main content */}
        <div>
          <img
            src={player.img}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />

          <h3 className="text-lg font-bold text-center">{player.name}</h3>
          <p className="text-sm text-gray-500 text-center">
            Tier {player.tier}
          </p>
          <p className="mt-2 text-lg font-semibold text-center">
            ₹{player.bidAmount}
          </p>
        </div>

        {/* Bottom badge space (always present) */}
        <div className="mt-4 min-h-[32px] flex justify-center gap-2 flex-wrap">
          {isPremium(player) && <Badge text="💰 Premium Buy" red />}
          {isSteal(player) && <Badge text="⚡ Steal of Auction" green />}
        </div>
      </div>
    </div>
  );
}


function Stat({ label, value, danger, success }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-500 text-sm">{label}</span>
      <span
        className={`font-bold mt-1 ${
          danger ? "text-red-500" : success ? "text-green-600" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Badge({ text, red, green }) {
  return (
    <div
      className={`text-xs px-3 py-1 rounded-full ${
        red
          ? "bg-red-100 text-red-700"
          : green
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {text}
    </div>
  );
}
