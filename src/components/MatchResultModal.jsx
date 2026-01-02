import { motion, AnimatePresence } from "framer-motion";
import { getMatchOutcome } from "../utils/matchWinner";

const CATEGORIES = [
  { key: "MS", label: "Men’s Singles" },
  { key: "WS", label: "Women’s Singles" },
  { key: "MD", label: "Men’s Doubles" },
  { key: "XD", label: "Mixed Doubles" },
  { key: "RMS", label: "Reverse Men’s Singles" },
  { key: "RMD", label: "Reverse Men’s Doubles" },
];

export default function MatchResultModal({ match, onClose }) {
  const [A, B] = match.teams;
  const outcome = getMatchOutcome(match);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-6">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[94vh] p-12 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">
              {A} <span className="text-indigo-600">vs</span> {B}
            </h2>
            <button onClick={onClose}>✕</button>
          </div>

          {/* Winner Banner */}
          <div className="mb-6 p-4 rounded-xl bg-indigo-50 text-center">
            {outcome.winner ? (
              <>
                <div className="text-lg font-bold text-indigo-700">
                  🏆 Match Winner: {outcome.winner}
                </div>
                <div className="text-sm text-gray-600">
                  Decided by {outcome.reason}
                </div>
              </>
            ) : (
              <div className="font-semibold text-gray-500">
                Match Decision Pending
              </div>
            )}
          </div>

          {/* Score Table */}
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left">Category</th>
                <th>Matchup</th>
                <th>{A}</th>
                <th>{B}</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map(({ key, label }) => {
                const r = match.results[key] || {};
                const aWin =
                  typeof r.pointsA === "number" && r.pointsA > r.pointsB;
                const bWin =
                  typeof r.pointsB === "number" && r.pointsB > r.pointsA;

                return (
                  <tr key={key} className="border-t">
                    <td>{label}</td>
                    <td className="italic text-center">
                      ({r.playersA ?? "TBD"}) vs ({r.playersB ?? "TBD"})
                    </td>
                    <td
                      className={
                        aWin
                          ? "bg-green-100 font-bold text-center"
                          : "text-center"
                      }
                    >
                      {r.pointsA ?? "—"}
                    </td>
                    <td
                      className={
                        bWin
                          ? "bg-green-100 font-bold text-center"
                          : "text-center"
                      }
                    >
                      {r.pointsB ?? "—"}
                    </td>
                    <td className="text-center font-semibold">
                      {aWin ? A : bWin ? B : "—"}
                    </td>
                  </tr>
                );
              })}

              {/* Tie Breaker Row */}
              {match.results?.TB && (
                <tr className="border-t bg-yellow-50">
                  <td className="font-bold">3v3 Tie Breaker</td>
                  <td className="italic text-center">
                    ({match.results.TB.playersA}) vs (
                    {match.results.TB.playersB})
                  </td>
                  <td className="font-bold text-center">
                    {match.results.TB.pointsA}
                  </td>
                  <td className="font-bold text-center">
                    {match.results.TB.pointsB}
                  </td>
                  <td className="font-bold text-center text-indigo-600">
                    {match.results.TB.pointsA > match.results.TB.pointsB
                      ? A
                      : B}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
