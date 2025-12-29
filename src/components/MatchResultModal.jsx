import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { key: "MS", label: "Men’s Singles" },
  { key: "WS", label: "Women’s Singles" },
  { key: "MD", label: "Men’s Doubles" },
  { key: "XD", label: "Mixed Doubles" },
  { key: "RMS", label: "Reverse Men’s Singles" },
  { key: "RMD", label: "Reverse Men’s Doubles" },
];

export default function MatchResultModal({ match, onClose }) {
  if (!match) return null;

  const [teamA, teamB] = match.teams;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-4 text-xs"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold">
              {teamA} <span className="text-indigo-600">vs</span> {teamB}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black text-lg"
            >
              ✕
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-xs border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-center px-4 py-2">{teamA} Player(s)</th>
                <th className="text-center px-4 py-2">{teamA} Points</th>
                <th className="text-center px-4 py-2">{teamB} Player(s)</th>
                <th className="text-center px-4 py-2">{teamB} Points</th>
                <th className="text-center px-4 py-2">Winner</th>
              </tr>
            </thead>

            <tbody>
              {CATEGORIES.map(({ key, label }) => {
                const res = match.results[key] || {};
                const a = res.A;
                const b = res.B;
                const playerA = res.playerA ?? "TBD";
                const playerB = res.playerB ?? "TBD";
                const pointsA = res.pointsA ?? a ?? "TBD";
                const pointsB = res.pointsB ?? b ?? "TBD";

                let winner = "—";
                if (
                  pointsA !== null &&
                  pointsB !== null &&
                  pointsA !== "TBD" &&
                  pointsB !== "TBD"
                ) {
                  winner =
                    pointsA > pointsB
                      ? teamA
                      : pointsA < pointsB
                      ? teamB
                      : "Draw";
                }

                return (
                  <tr key={key} className="border-t">
                    <td className="px-4 py-3 font-medium">{label}</td>
                    <td className="text-center">{playerA}</td>
                    <td className="text-center">{pointsA}</td>
                    <td className="text-center">{playerB}</td>
                    <td className="text-center">{pointsB}</td>
                    <td className="text-center font-semibold text-indigo-600">
                      {winner}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Footer */}
          <div className="mt-4 text-right">
            <button
              onClick={onClose}
              className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
