/* ===============================
   MATCH & STANDINGS BACKEND DATA
   =============================== */

export const MATCH_DATA = {
  pools: {
    A: {
      name: "Pool A",
      teams: [
        { name: "Mighty Spartans", wins: 0, losses: 0, points: 0 },
        { name: "Racket Blitz", wins: 0, losses: 0, points: 0 },
        { name: "Rising Phoenix", wins: 0, losses: 0, points: 0 },
        { name: "SmashOps", wins: 0, losses: 0, points: 0 },
      ],
    },

    B: {
      name: "Pool B",
      teams: [
        { name: "Hurricanes", wins: 0, losses: 0, points: 0 },
        { name: "Lord of the Strings", wins: 0, losses: 0, points: 0 },
        { name: "Silicon Swat", wins: 0, losses: 0, points: 0 },
        { name: "The BaddyVerse", wins: 0, losses: 0, points: 0 },
      ],
    },
  },

  matches: {
    A: [
      {
        teams: ["Rising Phoenix", "Mighty Spartans"],
        results: {
          MS: {
            A: 21,
            B: 18,
            playerA: "Player A1",
            playerB: "Player B1",
            pointsA: 21,
            pointsB: 18,
          },
          WS: {
            A: 15,
            B: 21,
            playerA: "Player A2",
            playerB: "Player B2",
            pointsA: 15,
            pointsB: 21,
          },
          MD: {
            A: 21,
            B: 19,
            playerA: "Player A3 & Player A4",
            playerB: "Player B3 & Player B4",
            pointsA: 21,
            pointsB: 19,
          },
          XD: {
            A: null,
            B: null,
            playerA: null,
            playerB: null,
            pointsA: null,
            pointsB: null,
          },
          RMS: {
            A: null,
            B: null,
            playerA: null,
            playerB: null,
            pointsA: null,
            pointsB: null,
          },
          RMD: {
            A: null,
            B: null,
            playerA: null,
            playerB: null,
            pointsA: null,
            pointsB: null,
          },
        },
      },
      {
        teams: ["Rising Phoenix", "Racket Blitz"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
      {
        teams: ["Rising Phoenix", "SmashOps"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
      {
        teams: ["Mighty Spartans", "Racket Blitz"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
      {
        teams: ["Mighty Spartans", "SmashOps"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
      {
        teams: ["Racket Blitz", "SmashOps"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
    ],
    B: [
      {
        teams: ["Hurricanes", "Lord of the Strings"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
      {
        teams: ["Hurricanes", "Silicon Swat"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
      {
        teams: ["Hurricanes", "The BaddyVerse"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
      {
        teams: ["Lord of the Strings", "Silicon Swat"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
      {
        teams: ["Lord of the Strings", "The BaddyVerse"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
      {
        teams: ["Silicon Swat", "The BaddyVerse"],
        results: {
          MS: { A: null, B: null },
          WS: { A: null, B: null },
          MD: { A: null, B: null },
          XD: { A: null, B: null },
          RMS: { A: null, B: null },
          RMD: { A: null, B: null },
        },
      },
    ],
  },

  knockouts: {
    semifinals: [
      ["TBD", "TBD"],
      ["TBD", "TBD"],
    ],
    finals: [["TBD", "TBD"]],
  },
};

export const MATCH_RESULTS_TEMPLATE = {
  MS: { A: null, B: null },
  WS: { A: null, B: null },
  MD: { A: null, B: null },
  XD: { A: null, B: null },
  RMS: { A: null, B: null },
  RMD: { A: null, B: null },
};
