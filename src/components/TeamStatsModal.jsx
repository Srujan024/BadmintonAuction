import { motion, AnimatePresence } from "framer-motion";

/* ---------- HELPERS ---------- */

function strengthToStars(strength) {
  const maxStrength = 25;
  return Math.min(5, Math.ceil((strength / maxStrength) * 5));
}

function isPremium(player) {
  if (player.tier === "A") return player.bidAmount >= 18000;
  if (player.tier === "B") return player.bidAmount >= 15000;
  return false;
}

function isSteal(player) {
  if (player.tier === "A") return false;
  if (player.tier === "B") return player.bidAmount < 15000;
  if (player.tier === "C") return player.bidAmount < 10000;
  return false;
}

function teamStrength(players) {
  return (
    players.filter((p) => p.tier === "A").length * 3 +
    players.filter((p) => p.tier === "B").length * 2 +
    players.filter((p) => p.tier === "C").length * 1
  );
}

function tierCount(players, tier) {
  return players.filter((p) => p.tier === tier).length;
}

/* ---------- COMPONENT ---------- */

export default function TeamStatsModal({ team, onClose }) {
  // For tier counts, include captain
  const allPlayers = team.players;
  const players = team.players.filter((p) => !p.captain);

  const strength = teamStrength(players);
  const stars = strengthToStars(strength);

  const totalSpend = players.reduce((s, p) => s + p.bidAmount, 0);
  const avgSpend = Math.round(totalSpend / players.length);

  const premiumCount = players.filter(isPremium).length;
  const stealCount = players.filter(isSteal).length;

  const topBuys = [...players]
    .sort((a, b) => b.bidAmount - a.bidAmount)
    .slice(0, 3);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* 🟢 MODAL BOX */}
        <motion.div
          onClick={(e) => e.stopPropagation()} // ✅ THIS is the key
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="
            bg-white rounded-3xl shadow-2xl
            w-full max-w-2xl
            max-h-[90vh] overflow-y-auto
            p-10
          "
        >
          <h2 className="text-3xl font-bold mb-10 text-center">
            📊 Team Statistics
          </h2>

          {/* 💪 Strength */}
          <StatRow
            label="💪 Team Strength"
            value={
              <div className="flex gap-1 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < stars ? "⭐" : "☆"}</span>
                ))}
              </div>
            }
          />

          <StatRow label="📊 Avg Spend / Player" value={`₹${avgSpend}`} />

          <StatRow label="💰 Premium Buys" value={premiumCount} />
          <StatRow label="⚡ Steals" value={stealCount} />

          {/* Tier Composition */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">
              🧱 Players by Tier
            </h3>

            <div className="grid grid-cols-3 gap-6 text-center">
              <TierBox tier="A" count={tierCount(allPlayers, "A")} />
              <TierBox tier="B" count={tierCount(allPlayers, "B")} />
              <TierBox tier="C" count={tierCount(allPlayers, "C")} />
            </div>
          </div>

          {/* Top Buys */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">
              🏆 Top 3 Buys
            </h3>

            <div className="space-y-4">
              {topBuys.map((p, i) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center bg-gray-50 rounded-xl px-5 py-3"
                >
                  <div>
                    <p className="font-semibold">
                      {i + 1}. {p.name}
                    </p>
                    <p className="text-xs text-gray-500">Tier {p.tier}</p>
                  </div>
                  <p className="font-bold text-indigo-600">₹{p.bidAmount}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-10 w-full py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------- UI ---------- */

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center mb-5">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function TierBox({ tier, count }) {
  const colors = {
    A: "bg-red-100 text-red-700",
    B: "bg-yellow-100 text-yellow-700",
    C: "bg-green-100 text-green-700",
  };

  return (
    <div className={`rounded-xl p-4 ${colors[tier]}`}>
      <p className="text-xs font-semibold">Tier {tier}</p>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}
