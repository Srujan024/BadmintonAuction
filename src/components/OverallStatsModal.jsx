import { motion, AnimatePresence } from "framer-motion";
import { TEAM_DETAILS } from "../constants/teamDetails";
import { useState } from "react";

/* ---------- HELPERS ---------- */

function getAllNonCaptainPlayers() {
  return TEAM_DETAILS.flatMap((team) =>
    team.players
      .filter((p) => !p.captain)
      .map((p) => ({
        ...p,
        teamName: team.name,
      }))
  );
}

function isSteal(p) {
  if (p.tier === "A") return false;
  return p.tier === "B" ? p.bidAmount < 10000 : p.bidAmount < 7000;
}

/* ---------- COMPONENT ---------- */

export default function OverallStatsModal({ onClose }) {
  const [tierFilter, setTierFilter] = useState("ALL");

  const players = getAllNonCaptainPlayers();

  const filtered =
    tierFilter === "ALL"
      ? players
      : players.filter((p) => p.tier === tierFilter);

  const sorted = [...filtered].sort((a, b) => b.bidAmount - a.bidAmount);
  const top10 = sorted.slice(0, 10);

  /* ---------- METRICS ---------- */
  const avgSpend = Math.round(
    players.reduce((s, p) => s + p.bidAmount, 0) / players.length
  );

  const totalSteals = players.filter(isSteal).length;

  const tierSpend = {
    A: players
      .filter((p) => p.tier === "A")
      .reduce((s, p) => s + p.bidAmount, 0),
    B: players
      .filter((p) => p.tier === "B")
      .reduce((s, p) => s + p.bidAmount, 0),
    C: players
      .filter((p) => p.tier === "C")
      .reduce((s, p) => s + p.bidAmount, 0),
  };

  const hottestTier = Object.entries(tierSpend).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  return (
    <AnimatePresence>
      {/* BACKDROP (click outside closes) */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* MODAL */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            bg-white rounded-3xl shadow-2xl
            w-full max-w-2xl
            max-h-[85vh]
            flex flex-col
            relative
          "
        >
          {/* ❌ CLOSE ICON */}
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4
              text-gray-400 hover:text-gray-700
              text-xl font-bold
            "
          >
            ✕
          </button>

          {/* HEADER */}
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-center">
              📊 Tournament Insights
            </h2>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-3 gap-4 px-6 pt-4">
            <Metric label="💰 Avg Spend" value={`₹${avgSpend}`} />
            <Metric label="⚡ Steals" value={totalSteals} />
            <Metric label="🔥 Hot Tier" value={`Tier ${hottestTier}`} />
          </div>
          <div>
            <p className="text-sm text-gray-500 text-center mt-1">
              Top 10 Highest Bids
            </p>
          </div>

          {/* FILTER */}
          <div className="flex justify-center gap-3 px-6 py-4">
            {["ALL", "A", "B", "C"].map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`px-4 py-1 rounded-full text-sm transition ${
                  tierFilter === t
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t === "ALL" ? "All Tiers" : `Tier ${t}`}
              </button>
            ))}
          </div>

          {/* SCROLLABLE LIST */}
          <div className="overflow-y-auto px-6 pb-6 space-y-4">
            {top10.map((p, idx) => {
              const medal =
                idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null;

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`
                    flex items-center justify-between p-4 rounded-xl
                    ${idx < 3 ? "bg-indigo-50 scale-[1.02]" : "bg-gray-50"}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>

                    <div>
                      <p className="font-semibold flex items-center gap-1">
                        {p.name} {medal}
                      </p>
                      <p className="text-xs text-gray-500">
                        {p.teamName} · Tier {p.tier}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold text-indigo-600">₹{p.bidAmount}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------- SMALL UI ---------- */

function Metric({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-bold mt-1">{value}</p>
    </div>
  );
}
