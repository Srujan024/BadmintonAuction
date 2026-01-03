import { getMatchOutcome } from "./matchWinner";

export function calculatePoolStandings(pool, matches) {
  /* ---------- STEP 0: league completion ---------- */
  const allTeamsCompletedLeague = pool.teams.every(
    (t) => t.wins + t.losses === 3
  );

  /* ---------- STEP 1: base table ---------- */
  const table = pool.teams.map((t) => ({
    name: t.name,
    wins: t.wins,
    losses: t.losses,
    matchPoints: t.wins, // primary sort
    gamesWon: 0, // EVENTS (from winning matches only)
    pointsFor: 0, // POINTS (from winning matches only)
    qualified: false,
    qualifiedViaTieBreaker: false,
  }));

  /* ---------- STEP 2: accumulate EVENTS & POINTS ---------- */
  matches.forEach((match) => {
    if (!match?.teams || !match?.results) return;

    const outcome = getMatchOutcome(match);
    if (!outcome?.winner) return; // no decision yet

    const [A, B] = match.teams;
    const teamA = table.find((t) => t.name === A);
    const teamB = table.find((t) => t.name === B);
    if (!teamA || !teamB) return;

    let eventsA = 0;
    let eventsB = 0;
    let pointsA = 0;
    let pointsB = 0;

    Object.entries(match.results).forEach(([key, r]) => {
      if (key === "TB") return; // TB never counts

      if (typeof r?.pointsA === "number" && typeof r?.pointsB === "number") {
        pointsA += r.pointsA;
        pointsB += r.pointsB;

        if (r.pointsA > r.pointsB) eventsA++;
        else if (r.pointsB > r.pointsA) eventsB++;
      }
    });

    // ✅ Award ONLY to actual match winner
    if (outcome.winner === A) {
      teamA.gamesWon += eventsA;
      teamA.pointsFor += pointsA;
    } else if (outcome.winner === B) {
      teamB.gamesWon += eventsB;
      teamB.pointsFor += pointsB;
    }
  });

  /* ---------- STEP 3: sort ---------- */
  const sorted = [...table].sort(
    (a, b) =>
      b.matchPoints - a.matchPoints ||
      b.gamesWon - a.gamesWon ||
      b.pointsFor - a.pointsFor
  );

  /* ---------- STEP 4: qualification (ONLY after league ends) ---------- */
  if (allTeamsCompletedLeague) {
    const second = sorted[1];
    const third = sorted[2];

    sorted.forEach((team, idx) => {
      if (idx < 2) team.qualified = true;
    });

    // TQ only when matches + events tied, points decide
    if (
      second &&
      third &&
      second.matchPoints === third.matchPoints &&
      second.gamesWon === third.gamesWon &&
      second.pointsFor !== third.pointsFor
    ) {
      second.qualifiedViaTieBreaker = true;
    }
  }

  return sorted;
}
