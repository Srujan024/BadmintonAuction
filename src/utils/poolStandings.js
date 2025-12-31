import { getMatchOutcome } from "./matchWinner";

export function calculatePoolStandings(pool, matches) {
  // Step 1: Base table
  const table = pool.teams.map((t) => ({
    name: t.name,
    wins: t.wins,
    losses: t.losses,
    matchPoints: t.wins, // +1 per match win
    gamesWon: 0, // events won (NO TB)
    pointsFor: 0, // total rally points (NO TB)
    qualified: false,
    qualifiedViaTieBreaker: false, // 👈 NEW
  }));

  // Step 2: Accumulate events & points
  matches.forEach((match) => {
    const [A, B] = match.teams;
    const teamA = table.find((t) => t.name === A);
    const teamB = table.find((t) => t.name === B);

    Object.entries(match.results || {}).forEach(([key, r]) => {
      if (key === "TB") return; // TB NEVER counts

      if (typeof r?.pointsA === "number" && typeof r?.pointsB === "number") {
        teamA.pointsFor += r.pointsA;
        teamB.pointsFor += r.pointsB;

        if (r.pointsA > r.pointsB) teamA.gamesWon++;
        else if (r.pointsB > r.pointsA) teamB.gamesWon++;
      }
    });
  });

  // Step 3: Sort
  const sorted = [...table].sort(
    (a, b) =>
      b.matchPoints - a.matchPoints ||
      b.gamesWon - a.gamesWon ||
      b.pointsFor - a.pointsFor
  );

  // Step 4: Qualification logic (THIS IS THE FIX)
  const second = sorted[1];
  const third = sorted[2];

  sorted.forEach((team, index) => {
    if (index < 2) team.qualified = true;
  });

  if (second && third) {
    // If events were tied and points decided → TQ
    if (
      second.matchPoints === third.matchPoints &&
      second.gamesWon === third.gamesWon &&
      second.pointsFor !== third.pointsFor
    ) {
      second.qualifiedViaTieBreaker = true;
    }
  }

  return sorted;
}
