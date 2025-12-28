import { useParams, useNavigate } from "react-router-dom";
import { TEAM_DETAILS } from "./constants/teamDetails";
import { CAPTAIN_BID } from "./AuctionDashboard";
import { motion } from "framer-motion";

function normalizeTeam(team) {
  return {
    ...team,
    players: team.players.map((p) =>
      p.captain ? { ...p, bidAmount: CAPTAIN_BID[p.tier] } : p
    ),
  };
}

export default function TeamDetails() {
  const { teamIndex } = useParams();
  const navigate = useNavigate();

  const team = normalizeTeam(TEAM_DETAILS[teamIndex]);

  const captain = team.players.find((p) => p.captain);
  const tierA = team.players.filter((p) => p.tier === "A" && !p.captain);
  const tierB = team.players.filter((p) => p.tier === "B");
  const tierC = team.players.filter((p) => p.tier === "C");

  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -32 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen p-8 max-w-6xl mx-auto"
    >
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold text-center mb-12">{team.name}</h1>

      {/* Captain */}
      {captain && (
        <div className="flex justify-center mb-14">
          <PlayerCard player={captain} captain />
        </div>
      )}

      <TierSection title="Tier A Players">
        {tierA.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </TierSection>

      <TierSection title="Tier B Players">
        {tierB.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </TierSection>

      <TierSection title="Tier C Players">
        {tierC.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </TierSection>
    </motion.div>
  );
}

/* ---------- Tier Section ---------- */

function TierSection({ title, children }) {
  if (!children.length) return null;

  return (
    <div className="mb-14">
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-600">
        {title}
      </h2>
      <div className="flex justify-center flex-wrap gap-8">{children}</div>
    </div>
  );
}

/* ---------- Player Card ---------- */

function PlayerCard({ player, captain }) {
  return (
    <div
      className={`
        w-56 rounded-2xl p-6 text-center bg-white shadow-md
        ${captain ? "ring-4 ring-yellow-400 scale-105 shadow-xl" : ""}
      `}
    >
      <img
        src={player.img}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />

      <h3 className="text-lg font-bold">
        {player.name} {captain && "⭐"}
      </h3>

      <p className="text-sm text-gray-500">Tier {player.tier}</p>
      <p className="mt-2 text-lg font-semibold">₹{player.bidAmount}</p>
    </div>
  );
}
