// utils/matchWinner.js

export function getMatchOutcome(match) {
  const [teamA, teamB] = match.teams;

  let eventsA = 0;
  let eventsB = 0;
  let pointsA = 0;
  let pointsB = 0;

  Object.entries(match.results || {}).forEach(([key, r]) => {
    // ❗ Tie Breaker NEVER contributes to events / points
    if (key === "TB") return;

    if (typeof r?.pointsA === "number" && typeof r?.pointsB === "number") {
      pointsA += r.pointsA;
      pointsB += r.pointsB;

      if (r.pointsA > r.pointsB) eventsA++;
      else if (r.pointsB > r.pointsA) eventsB++;
    }
  });

  // ✅ Rule 1: Win by events
  if (eventsA >= 4) return { winner: teamA, reason: "Events" };
  if (eventsB >= 4) return { winner: teamB, reason: "Events" };

  // ✅ Rule 2: 3–3 → Total points
  if (eventsA === 3 && eventsB === 3) {
    if (pointsA > pointsB) return { winner: teamA, reason: "Points" };
    if (pointsB > pointsA) return { winner: teamB, reason: "Points" };

    // ✅ Rule 3: Points tied → 3v3 TB
    const tb = match.results?.TB;
    if (
      tb &&
      typeof tb.pointsA === "number" &&
      typeof tb.pointsB === "number"
    ) {
      return {
        winner: tb.pointsA > tb.pointsB ? teamA : teamB,
        reason: "TieBreaker",
      };
    }

    return { winner: null, reason: "DNP" };
  }

  return { winner: null, reason: "Incomplete" };
}
