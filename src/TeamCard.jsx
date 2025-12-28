import { useNavigate } from "react-router-dom";

export default function TeamCard({ team, index, tierSpend }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/team/${index}`)}
      className="
        relative overflow-hidden
        rounded-2xl p-6
        bg-white
        shadow-lg hover:shadow-2xl
        transform hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
      "
    >
      {/* 🔷 Top color accent (team identity) */}
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: team.color }}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-gray-800">{team.name}</h2>
        <span className="text-xs text-gray-400">View →</span>
      </div>

      {/* Players Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">Players</p>
        <p className="text-lg font-semibold text-gray-800">
          {team.players.length} / 8
        </p>
      </div>

      {/* 🎨 Tier Spend Blocks */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <TierBox
          label="Tier A"
          value={tierSpend(team, "A")}
          color="bg-red-100 text-red-700"
        />
        <TierBox
          label="Tier B"
          value={tierSpend(team, "B")}
          color="bg-yellow-100 text-yellow-700"
        />
        <TierBox
          label="Tier C"
          value={tierSpend(team, "C")}
          color="bg-green-100 text-green-700"
        />
      </div>

      {/* Purse */}
      <div className="flex justify-between items-center pt-3 border-t">
        <span className="text-sm text-gray-500">Remaining Purse</span>
        <span className="text-xl font-bold text-gray-900">₹{team.purse}</span>
      </div>
    </div>
  );
}

/* ---------- Tier Box ---------- */

function TierBox({ label, value, color }) {
  return (
    <div
      className={`
        rounded-xl p-3 text-center
        ${color}
      `}
    >
      <p className="text-xs font-medium">{label}</p>
      <p className="text-sm font-bold mt-1">₹{value}</p>
    </div>
  );
}
