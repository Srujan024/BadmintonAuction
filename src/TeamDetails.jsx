import { useParams, useNavigate } from "react-router-dom";
import { TEAM_DETAILS } from "./constants/teamDetails";
import { CAPTAIN_BID } from "./AuctionDashboard";
import { motion } from "framer-motion";

/* ---------- Helpers ---------- */

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

/* ---------- Main Component ---------- */

export default function TeamDetails() {
  const { teamIndex } = useParams();
  const navigate = useNavigate();

  const team = normalizeTeam(TEAM_DETAILS[teamIndex]);

  const captain = team.players.find((p) => p.captain);
  const tierA = team.players.filter((p) => p.tier === "A" && !p.captain);
  const tierB = team.players.filter((p) => p.tier === "B" && !p.captain);
  const tierC = team.players.filter((p) => p.tier === "C" && !p.captain);

  const spent = totalSpend(team.players);
  const remaining = TOTAL_PURSE - spent;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-8 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 print:bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Back + Print */}
        <div className="flex justify-between mb-6 print:hidden">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Back to Dashboard
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            🖨 Print / Share
          </button>
        </div>

        {/* Team Title */}
        <h1 className="text-4xl font-bold text-center mb-4">{team.name}</h1>

        {/* Accent */}
        <div className="flex justify-center mb-10">
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-indigo-400 to-pink-400"></div>
        </div>

        {/* ---------- Team Budget Overview ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 bg-white rounded-2xl shadow-lg p-6 grid grid-cols-3 text-center"
        >
          <div>
            <p className="text-gray-500 text-sm">Total Purse</p>
            <p className="text-xl font-bold">₹{TOTAL_PURSE}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Spent</p>
            <p className="text-xl font-bold text-red-500">₹{spent}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Remaining</p>
            <p className="text-xl font-bold text-green-600">₹{remaining}</p>
          </div>
        </motion.div>

        {/* ---------- Captain ---------- */}
        {captain && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-16"
          >
            <PlayerCard player={captain} captain />
          </motion.div>
        )}

        {/* ---------- Tier Sections (staggered) ---------- */}
        <TierSection
          title="Tier A Players"
          spend={tierSpend(team.players, "A")}
          delay={0.1}
        >
          {tierA.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </TierSection>

        <TierSection
          title="Tier B Players"
          spend={tierSpend(team.players, "B")}
          delay={0.2}
        >
          {tierB.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </TierSection>

        <TierSection
          title="Tier C Players"
          spend={tierSpend(team.players, "C")}
          delay={0.3}
        >
          {tierC.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </TierSection>
      </div>
    </motion.div>
  );
}

/* ---------- Tier Section ---------- */

function TierSection({ title, spend, delay, children }) {
  const items = Array.isArray(children) ? children : [children];
  if (!items.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-16"
    >
      <h2 className="text-xl font-semibold text-center mb-1 text-gray-600">
        {title}
      </h2>
      <p className="text-center text-sm text-gray-400 mb-6">
        ₹{spend} spent · {items.length} player{items.length > 1 ? "s" : ""}
      </p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="flex justify-center flex-wrap gap-10"
      >
        {items.map((child) => (
          <motion.div
            key={child.key}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Player Card ---------- */

function PlayerCard({ player, captain }) {
  const ring =
    player.tier === "A"
      ? "ring-red-400"
      : player.tier === "B"
      ? "ring-yellow-400"
      : "ring-green-400";

  return (
    <div className="relative group">
      {/* Tooltip */}
      <div
        className="
          absolute -top-16 left-1/2 -translate-x-1/2
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
          bg-black text-white text-xs rounded-lg px-3 py-2
          whitespace-nowrap z-20
        "
      >
        <p className="font-semibold">{player.name}</p>
        <p>
          Tier {player.tier} · ₹{player.bidAmount}
        </p>
        {captain && <p>Captain</p>}
      </div>

      {/* Card */}
      <div
        className={`
          w-56 rounded-2xl p-6 text-center bg-white shadow-md
          ring-4 ${ring}
          transition-transform duration-300
          hover:-translate-y-2 hover:shadow-xl
        `}
      >
        {/* Captain Ribbon */}
        {captain && (
          <div className="mb-2 flex justify-center items-center gap-1 text-yellow-600 text-xs font-bold">
            👑 CAPTAIN
          </div>
        )}

        <img
          src={player.img}
          alt={player.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />

        <h3 className="text-lg font-bold">{player.name}</h3>
        <p className="text-sm text-gray-500">Tier {player.tier}</p>
        <p className="mt-2 text-lg font-semibold">₹{player.bidAmount}</p>
      </div>
    </div>
  );
}
