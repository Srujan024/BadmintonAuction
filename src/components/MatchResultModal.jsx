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
  const [A, B] = match.teams;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <motion.div className="fixed inset-0 z-50 flex justify-center items-center px-6">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] p-12 overflow-y-auto"
        >
          <div className="flex justify-between mb-6">
            <h2 className="font-bold text-xl">
              {A} <span className="text-indigo-600">vs</span> {B}
            </h2>
            <button onClick={onClose}>✕</button>
          </div>

          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th>Category</th>
                <th>Matchup</th>
                <th>{A}</th>
                <th>{B}</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map(({ key, label }) => {
                const r = match.results[key] || {};
                const {
                  playersA = "TBD",
                  playersB = "TBD",
                  pointsA = "—",
                  pointsB = "—",
                } = r;

                const aWin =
                  typeof pointsA === "number" &&
                  typeof pointsB === "number" &&
                  pointsA > pointsB;
                const bWin =
                  typeof pointsA === "number" &&
                  typeof pointsB === "number" &&
                  pointsB > pointsA;

                return (
                  <tr key={key} className="border-t">
                    <td>{label}</td>
                    <td className="italic text-center">
                      ({playersA}) vs ({playersB})
                    </td>
                    <td
                      className={`text-center ${
                        aWin ? "bg-green-100 font-bold" : ""
                      }`}
                    >
                      {pointsA}
                    </td>
                    <td
                      className={`text-center ${
                        bWin ? "bg-green-100 font-bold" : ""
                      }`}
                    >
                      {pointsB}
                    </td>
                    <td className="text-center font-semibold text-indigo-600">
                      {aWin ? A : bWin ? B : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}