import { useParams, useNavigate } from "react-router-dom";

const TEAMS = [
  "Team A",
  "Team B",
  "Team C",
  "Team D",
  "Team E",
  "Team F",
  "Team G",
  "Team H",
];

export default function TeamDetails() {
  const { teamIndex } = useParams();
  const navigate = useNavigate();

  const teamName = TEAMS[teamIndex];

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold mb-6">{teamName} – Detailed View</h1>

      {/* Team Overview */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Team Overview</h2>
        <p className="text-gray-700">
          This page will show complete details for <strong>{teamName}</strong>,
          including players, purse usage, tier limits, and bidding activity.
        </p>
      </div>

      {/* Placeholder Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-2">Players</h3>
          <p className="text-sm text-gray-600">Player list will appear here.</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-2">Budget & Tiers</h3>
          <p className="text-sm text-gray-600">
            Tier counts and remaining purse will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
