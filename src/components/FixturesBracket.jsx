import { getMatchOutcome } from "../utils/matchWinner";

/* =========================
   UI ATOMS
========================= */

function Card({ title, subtitle, onClick, disabled, highlight, qualified }) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`rounded-lg px-4 py-3 text-center text-sm shadow transition
        ${disabled ? "bg-gray-100 text-gray-400" : "bg-white cursor-pointer"}
        ${qualified ? "border-2 border-black" : "border"}
        ${highlight ? "ring-2 ring-black font-semibold" : ""}
      `}
    >
      <div className="text-[11px] opacity-70 mb-1">{title}</div>
      <div>{subtitle}</div>
    </div>
  );
}

/* =========================
   ARROWS
========================= */

function ArrowDown() {
  return (
    <svg width="26" height="50" viewBox="0 0 26 50">
      <line x1="13" y1="0" x2="13" y2="36" stroke="black" strokeWidth="4" />
      <polygon points="6,36 20,36 13,50" fill="black" />
    </svg>
  );
}

function ArrowMerge() {
  return (
    <svg width="140" height="50" viewBox="0 0 140 50">
      <line x1="0" y1="10" x2="70" y2="40" stroke="black" strokeWidth="4" />
      <line x1="140" y1="10" x2="70" y2="40" stroke="black" strokeWidth="4" />
      <polygon points="62,40 78,40 70,50" fill="black" />
    </svg>
  );
}

/* =========================
   FIXTURES BRACKET
========================= */

export default function FixturesBracket({
  poolAStandings,
  poolBStandings,
  semiMatches,
  finalMatch,
  finalDecision,
  onViewMatch,
}) {
  const A1 = poolAStandings[0]?.name;
  const A2 = poolAStandings[1]?.name;
  const B1 = poolBStandings[0]?.name;
  const B2 = poolBStandings[1]?.name;

  const semi1Outcome = getMatchOutcome(semiMatches?.[0]);
  const semi2Outcome = getMatchOutcome(semiMatches?.[1]);

  const semi1Winner = semi1Outcome?.winner;
  const semi2Winner = semi2Outcome?.winner;

  const finalWinner =
    finalDecision.status === "DECIDED" ? finalDecision.winner : null;

  const isOnWinningPath = (team) =>
    team === semi1Winner || team === semi2Winner || team === finalWinner;

  return (
    <div className="w-full flex justify-center px-2 mt-16">
      <div className="w-full max-w-5xl flex flex-col items-center space-y-10">
        {/* ================= POOLS ================= */}
        <div className="w-full grid grid-cols-2 gap-10">
          {/* POOL A */}
          <div className="space-y-3 text-center">
            <h3 className="font-semibold mb-4">Pool A</h3>
            {poolAStandings.map((t, i) => (
              <Card
                key={t.name}
                title={`Pool A – ${i + 1}`}
                subtitle={t.name}
                disabled={i > 1}
                qualified={i <= 1}
                highlight={isOnWinningPath(t.name)}
              />
            ))}
          </div>

          {/* POOL B */}
          <div className="space-y-3 text-center">
            <h3 className="font-semibold mb-4">Pool B</h3>
            {poolBStandings.map((t, i) => (
              <Card
                key={t.name}
                title={`Pool B – ${i + 1}`}
                subtitle={t.name}
                disabled={i > 1}
                qualified={i <= 1}
                highlight={isOnWinningPath(t.name)}
              />
            ))}
          </div>
        </div>

        {/* ================= MERGE ================= */}
        <ArrowMerge />

        {/* ================= SEMI FINALS ================= */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="font-semibold">Semi Finals</h3>

          <Card
            title="Semi Final 1"
            subtitle={`${A1 ?? "TBD"} vs ${B2 ?? "TBD"}`}
            onClick={() => onViewMatch(semiMatches[0])}
            disabled={!semiMatches?.[0]}
            highlight={!!semi1Winner}
          />

          <Card
            title="Semi Final 2"
            subtitle={`${B1 ?? "TBD"} vs ${A2 ?? "TBD"}`}
            onClick={() => onViewMatch(semiMatches[1])}
            disabled={!semiMatches?.[1]}
            highlight={!!semi2Winner}
          />
        </div>

        {/* ================= FINAL ================= */}
        <ArrowDown />

        <div className="flex flex-col items-center space-y-3">
          <h3 className="font-semibold">Final</h3>

          <Card
            title="Final Match"
            subtitle={`${finalMatch.teams[0]} vs ${finalMatch.teams[1]}`}
            onClick={() => onViewMatch(finalMatch)}
            disabled={!finalMatch}
            highlight={finalDecision.status === "DECIDED"}
          />
        </div>

        {/* ================= CHAMPION ================= */}
        <ArrowDown />

        <Card
          title="Champion"
          subtitle={finalWinner ?? "Match In Progress"}
          onClick={() => finalWinner && onViewMatch(finalMatch)}
          disabled={!finalWinner}
          highlight={!!finalWinner}
        />
      </div>
    </div>
  );
}
