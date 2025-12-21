import { useNavigate } from "react-router-dom";

export default function TeamCard({
  team,
  index,
  setCaptain,
  tierCount,
  minRequiredBudget,
  CAPTAIN_COST,
  cardColor,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`
        rounded-2xl p-6 shadow-xl
        ${cardColor}
        transition-shadow duration-300
        hover:shadow-2xl
        cursor-pointer
      `}
      onClick={() => navigate(`/team/${index}`)}
    >
      {/* Accent strip */}
      <div className="h-1 w-full rounded-full bg-gradient-to-r from-indigo-400 to-pink-400 mb-4"></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold">{team.name}</h2>
        <span className="text-xs text-gray-500">View details →</span>
      </div>

      {/* Captain Section */}
      {!team.captainTier ? (
        <div className="mb-4">
          <p className="text-sm mb-2 font-medium">Assign Captain</p>
          {Object.keys(CAPTAIN_COST).map((tier) => (
            <button
              key={tier}
              onClick={(e) => {
                e.stopPropagation(); // 🚫 prevent card navigation
                setCaptain(index, tier);
              }}
              className="
                mr-2 mb-2 px-3 py-1
                bg-gray-200 rounded-lg text-sm
                hover:bg-gray-300 transition
              "
            >
              Tier {tier}
            </button>
          ))}
        </div>
      ) : (
        <p className="mb-4 text-sm">
          Captain: <strong>Tier {team.captainTier}</strong>
        </p>
      )}

      {/* Stats */}
      <div className="text-sm space-y-1 text-gray-700">
        <p>
          Players: <strong>{team.players.length} / 8</strong>
        </p>
        <p>Tier A: {tierCount(team, "A")} / 2</p>
        <p>Tier B: {tierCount(team, "B")} / 3</p>
        <p>Tier C: {tierCount(team, "C")}</p>
        <p className="pt-1 font-semibold">Purse: {team.purse}</p>
      </div>

      {/* Budget Safety */}
      <p className="text-xs mt-3 text-gray-500">
        Min budget to finish squad: {minRequiredBudget(team)}
      </p>
    </div>
  );
}
