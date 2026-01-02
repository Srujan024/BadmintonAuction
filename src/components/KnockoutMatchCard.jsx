import { motion } from "framer-motion";
import { getMatchOutcome } from "../utils/matchWinner";

export default function KnockoutMatchCard({ match, onView }) {
  const [A, B] = match.teams;
  const outcome = getMatchOutcome(match);

  const decided =
    outcome?.winner &&
    outcome.reason !== "DNP" &&
    outcome.reason !== "Incomplete";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 border shadow-sm ${
        decided ? "bg-indigo-50 border-indigo-200" : "bg-gray-50"
      }`}
    >
      {/* Match Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">
          {A} <span className="text-gray-400">vs</span> {B}
        </h3>

        {decided ? (
          <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
            Qualified to Final
          </span>
        ) : (
          <span className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-600">
            In Progress
          </span>
        )}
      </div>

      {/* Winner Block */}
      {decided && (
        <div className="mb-4 bg-white rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-gray-500">Winner</p>
            <p className="font-bold text-indigo-700 text-lg">
              {outcome.winner}
            </p>
            <p className="text-xs text-gray-500">Decided by {outcome.reason}</p>
          </div>
          <div className="text-3xl">🏸</div>
        </div>
      )}

      {/* Action */}
      <div className="flex justify-end">
        <button
          onClick={onView}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm hover:bg-gray-800"
        >
          View Result
        </button>
      </div>
    </motion.div>
  );
}
