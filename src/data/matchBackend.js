export const MATCH_DATA = {
  pools: {
    A: {
      name: "Pool A",
      teams: [
        { name: "Mighty Spartans", wins: 2, losses: 1 },
        { name: "Rising Phoenix", wins: 2, losses: 1 },
        { name: "Racket Blitz", wins: 2, losses: 1 },
        { name: "SmashOps", wins: 0, losses: 3 },
      ],
    },
    B: {
      name: "Pool B",
      teams: [
        { name: "Hurricanes", wins: 3, losses: 0 },
        { name: "Lord of the Strings", wins: 2, losses: 1 },
        { name: "Silicon Swat", wins: 1, losses: 2 },
        { name: "The BaddyVerse", wins: 0, losses: 3 },
      ],
    },
  },

  matches: {
    /* ========================= POOL A ========================= */
    A: [
      {
        teams: ["Mighty Spartans", "Rising Phoenix"],
        results: {
          MS: {
            playersA: "Arjun",
            playersB: "Kiran",
            pointsA: 21,
            pointsB: 15,
          },
          WS: {
            playersA: "Neha",
            playersB: "Ananya",
            pointsA: 21,
            pointsB: 18,
          },
          MD: {
            playersA: "Arjun & Rohit",
            playersB: "Kiran & Sandeep",
            pointsA: 21,
            pointsB: 19,
          },
          XD: {
            playersA: "Neha & Arjun",
            playersB: "Ananya & Kiran",
            pointsA: 21,
            pointsB: 17,
          },
          RMS: {
            playersA: "Rohit",
            playersB: "Sandeep",
            pointsA: 21,
            pointsB: 16,
          },
          RMD: {
            playersA: "Arjun & Aman",
            playersB: "Kiran & Rahul",
            pointsA: 21,
            pointsB: 14,
          },
        },
      },

      {
        teams: ["Rising Phoenix", "SmashOps"],
        results: {
          MS: {
            playersA: "Kiran",
            playersB: "Rahul",
            pointsA: 21,
            pointsB: 18,
          },
          WS: {
            playersA: "Ananya",
            playersB: "Sneha",
            pointsA: 21,
            pointsB: 17,
          },
          MD: {
            playersA: "Kiran & Sandeep",
            playersB: "Rahul & Akash",
            pointsA: 21,
            pointsB: 19,
          },
          XD: {
            playersA: "Ananya & Kiran",
            playersB: "Sneha & Rahul",
            pointsA: 21,
            pointsB: 18,
          },
          RMS: {
            playersA: "Sandeep",
            playersB: "Akash",
            pointsA: 21,
            pointsB: 17,
          },
          RMD: {
            playersA: "Kiran & Rahul",
            playersB: "Rahul & Akash",
            pointsA: 21,
            pointsB: 16,
          },
        },
      },

      {
        teams: ["Racket Blitz", "SmashOps"],
        results: {
          MS: {
            playersA: "Vishal",
            playersB: "Rahul",
            pointsA: 21,
            pointsB: 12,
          },
          WS: {
            playersA: "Pooja",
            playersB: "Sneha",
            pointsA: 21,
            pointsB: 14,
          },
          MD: {
            playersA: "Vishal & Nikhil",
            playersB: "Rahul & Akash",
            pointsA: 21,
            pointsB: 15,
          },
          XD: {
            playersA: "Pooja & Vishal",
            playersB: "Sneha & Rahul",
            pointsA: 21,
            pointsB: 16,
          },
          RMS: {
            playersA: "Aman",
            playersB: "Akash",
            pointsA: 21,
            pointsB: 13,
          },
          RMD: {
            playersA: "Vishal & Nikhil",
            playersB: "Rahul & Akash",
            pointsA: 21,
            pointsB: 14,
          },
        },
      },

      {
        teams: ["Racket Blitz", "Rising Phoenix"],
        results: {
          MS: {
            playersA: "Vishal",
            playersB: "Kiran",
            pointsA: 21,
            pointsB: 18,
          },
          WS: {
            playersA: "Pooja",
            playersB: "Ananya",
            pointsA: 18,
            pointsB: 21,
          },
          MD: {
            playersA: "Vishal & Nikhil",
            playersB: "Kiran & Sandeep",
            pointsA: 21,
            pointsB: 19,
          },
          XD: {
            playersA: "Pooja & Vishal",
            playersB: "Ananya & Kiran",
            pointsA: 18,
            pointsB: 21,
          },
          RMS: {
            playersA: "Nikhil",
            playersB: "Sandeep",
            pointsA: 21,
            pointsB: 18,
          },
          RMD: {
            playersA: "Vishal & Aman",
            playersB: "Kiran & Rahul",
            pointsA: 19,
            pointsB: 21,
          },
          TB: {
            playersA: "Vishal",
            playersB: "Kiran",
            pointsA: 21,
            pointsB: 11,
          },
        },
      },

      {
        teams: ["Mighty Spartans", "Racket Blitz"],
        results: {
          MS: {
            playersA: "Arjun",
            playersB: "Vishal",
            pointsA: 21,
            pointsB: 19,
          },
          WS: { playersA: "Neha", playersB: "Pooja", pointsA: 18, pointsB: 21 },
          MD: {
            playersA: "Rohit & Aman",
            playersB: "Vishal & Nikhil",
            pointsA: 21,
            pointsB: 17,
          },
          XD: {
            playersA: "Neha & Arjun",
            playersB: "Pooja & Vishal",
            pointsA: 19,
            pointsB: 21,
          },
          RMS: {
            playersA: "Aman",
            playersB: "Nikhil",
            pointsA: 18,
            pointsB: 21,
          },
          RMD: {
            playersA: "Rohit & Arjun",
            playersB: "Vishal & Aman",
            pointsA: 20,
            pointsB: 21,
          },
        },
      },

      {
        teams: ["Mighty Spartans", "SmashOps"],
        results: {
          MS: {
            playersA: "Arjun",
            playersB: "Rahul",
            pointsA: 21,
            pointsB: 11,
          },
          WS: { playersA: "Neha", playersB: "Sneha", pointsA: 21, pointsB: 13 },
          MD: {
            playersA: "Aman & Rohit",
            playersB: "Rahul & Akash",
            pointsA: 21,
            pointsB: 14,
          },
          XD: {
            playersA: "Neha & Aman",
            playersB: "Sneha & Rahul",
            pointsA: 21,
            pointsB: 15,
          },
          RMS: {
            playersA: "Rohit",
            playersB: "Akash",
            pointsA: 21,
            pointsB: 12,
          },
          RMD: {
            playersA: "Arjun & Aman",
            playersB: "Rahul & Akash",
            pointsA: 21,
            pointsB: 13,
          },
        },
      },
    ],

    /* ========================= POOL B ========================= */
    B: [
      {
        teams: ["Hurricanes", "Lord of the Strings"],
        results: {
          MS: {
            playersA: "Siddharth",
            playersB: "Ravi",
            pointsA: 21,
            pointsB: 19,
          },
          WS: {
            playersA: "Megha",
            playersB: "Kavya",
            pointsA: 17,
            pointsB: 21,
          },
          MD: {
            playersA: "Siddharth & Varun",
            playersB: "Ravi & Deepak",
            pointsA: 21,
            pointsB: 18,
          },
          XD: {
            playersA: "Megha & Siddharth",
            playersB: "Kavya & Ravi",
            pointsA: 21,
            pointsB: 19,
          },
          RMS: {
            playersA: "Varun",
            playersB: "Deepak",
            pointsA: 21,
            pointsB: 17,
          },
          RMD: {
            playersA: "Siddharth & Arjun",
            playersB: "Ravi & Aman",
            pointsA: 21,
            pointsB: 18,
          },
        },
      },

      {
        teams: ["Hurricanes", "Silicon Swat"],
        results: {
          MS: {
            playersA: "Siddharth",
            playersB: "Pranav",
            pointsA: 21,
            pointsB: 14,
          },
          WS: {
            playersA: "Megha",
            playersB: "Aishwarya",
            pointsA: 21,
            pointsB: 18,
          },
          MD: {
            playersA: "Varun & Arjun",
            playersB: "Pranav & Karthik",
            pointsA: 21,
            pointsB: 16,
          },
          XD: {
            playersA: "Megha & Siddharth",
            playersB: "Aishwarya & Pranav",
            pointsA: 21,
            pointsB: 19,
          },
          RMS: {
            playersA: "Arjun",
            playersB: "Karthik",
            pointsA: 21,
            pointsB: 15,
          },
          RMD: {
            playersA: "Varun & Siddharth",
            playersB: "Pranav & Karthik",
            pointsA: 21,
            pointsB: 17,
          },
        },
      },

      {
        teams: ["Hurricanes", "The BaddyVerse"],
        results: {
          MS: {
            playersA: "Siddharth",
            playersB: "Rohit",
            pointsA: 21,
            pointsB: 13,
          },
          WS: {
            playersA: "Megha",
            playersB: "Divya",
            pointsA: 21,
            pointsB: 15,
          },
          MD: {
            playersA: "Varun & Arjun",
            playersB: "Rohit & Manoj",
            pointsA: 21,
            pointsB: 16,
          },
          XD: {
            playersA: "Megha & Siddharth",
            playersB: "Divya & Rohit",
            pointsA: 21,
            pointsB: 14,
          },
          RMS: {
            playersA: "Arjun",
            playersB: "Manoj",
            pointsA: 21,
            pointsB: 16,
          },
          RMD: {
            playersA: "Varun & Siddharth",
            playersB: "Rohit & Manoj",
            pointsA: 21,
            pointsB: 17,
          },
        },
      },

      {
        teams: ["Lord of the Strings", "Silicon Swat"],
        results: {
          MS: {
            playersA: "Ravi",
            playersB: "Pranav",
            pointsA: 21,
            pointsB: 17,
          },
          WS: {
            playersA: "Kavya",
            playersB: "Aishwarya",
            pointsA: 21,
            pointsB: 15,
          },
          MD: {
            playersA: "Ravi & Deepak",
            playersB: "Pranav & Karthik",
            pointsA: 21,
            pointsB: 19,
          },
          XD: {
            playersA: "Kavya & Ravi",
            playersB: "Aishwarya & Pranav",
            pointsA: 21,
            pointsB: 18,
          },
          RMS: {
            playersA: "Deepak",
            playersB: "Karthik",
            pointsA: 21,
            pointsB: 16,
          },
          RMD: {
            playersA: "Ravi & Aman",
            playersB: "Pranav & Karthik",
            pointsA: 21,
            pointsB: 17,
          },
        },
      },

      {
        teams: ["Lord of the Strings", "The BaddyVerse"],
        results: {
          MS: { playersA: "Ravi", playersB: "Rohit", pointsA: 21, pointsB: 14 },
          WS: {
            playersA: "Kavya",
            playersB: "Divya",
            pointsA: 21,
            pointsB: 16,
          },
          MD: {
            playersA: "Deepak & Aman",
            playersB: "Rohit & Manoj",
            pointsA: 21,
            pointsB: 17,
          },
          XD: {
            playersA: "Kavya & Ravi",
            playersB: "Divya & Rohit",
            pointsA: 21,
            pointsB: 18,
          },
          RMS: {
            playersA: "Aman",
            playersB: "Manoj",
            pointsA: 21,
            pointsB: 15,
          },
          RMD: {
            playersA: "Ravi & Deepak",
            playersB: "Rohit & Manoj",
            pointsA: 21,
            pointsB: 16,
          },
        },
      },

      {
        teams: ["Silicon Swat", "The BaddyVerse"],
        results: {
          MS: {
            playersA: "Pranav",
            playersB: "Rohit",
            pointsA: 21,
            pointsB: 18,
          },
          WS: {
            playersA: "Aishwarya",
            playersB: "Divya",
            pointsA: 21,
            pointsB: 19,
          },
          MD: {
            playersA: "Pranav & Karthik",
            playersB: "Rohit & Manoj",
            pointsA: 21,
            pointsB: 20,
          },
          XD: {
            playersA: "Aishwarya & Pranav",
            playersB: "Divya & Rohit",
            pointsA: 21,
            pointsB: 18,
          },
          RMS: {
            playersA: "Karthik",
            playersB: "Manoj",
            pointsA: 21,
            pointsB: 17,
          },
          RMD: {
            playersA: "Pranav & Karthik",
            playersB: "Rohit & Manoj",
            pointsA: 21,
            pointsB: 19,
          },
        },
      },
    ],
  },

  knockouts: {
    /* ========================= SEMIFINALS ========================= */
    semifinals: [
      /* Semi Final 1
       Mighty Spartans def Lord of the Strings (6–0)
    */
      {
        teams: ["Mighty Spartans", "Lord of the Strings"],
        results: {
          MS: { playersA: "Arjun", playersB: "Ravi", pointsA: 21, pointsB: 18 },
          WS: { playersA: "Neha", playersB: "Kavya", pointsA: 21, pointsB: 19 },
          MD: {
            playersA: "Arjun & Rohit",
            playersB: "Ravi & Deepak",
            pointsA: 21,
            pointsB: 20,
          },
          XD: {
            playersA: "Neha & Arjun",
            playersB: "Kavya & Ravi",
            pointsA: 21,
            pointsB: 18,
          }
        },
      },

      /* Semi Final 2
       Hurricanes def Racket Blitz (6–0)
    */
      {
        teams: ["Racket Blitz", "Hurricanes"],
        results: {
          MS: {
            playersA: "Vishal",
            playersB: "Siddharth",
            pointsA: 18,
            pointsB: 21,
          },
          WS: {
            playersA: "Pooja",
            playersB: "Megha",
            pointsA: 19,
            pointsB: 21,
          },
          MD: {
            playersA: "Vishal & Nikhil",
            playersB: "Siddharth & Varun",
            pointsA: 17,
            pointsB: 21,
          },
          XD: {
            playersA: "Pooja & Vishal",
            playersB: "Megha & Siddharth",
            pointsA: 18,
            pointsB: 21,
          },
          RMS: {
            playersA: "Aman",
            playersB: "Varun",
            pointsA: 16,
            pointsB: 21,
          },
          RMD: {
            playersA: "Nikhil & Aman",
            playersB: "Varun & Siddharth",
            pointsA: 18,
            pointsB: 21,
          },
        },
      },
    ],

    /* ========================= FINALS ========================= */
    finals: [
      /* FINAL
       Mighty Spartans def Hurricanes (6–0)
    */
      {
        teams: ["Mighty Spartans", "Hurricanes"],
        results: {
          MS: {
            playersA: "Arjun",
            playersB: "Siddharth",
            pointsA: 21,
            pointsB: 19,
          },
          WS: { playersA: "Neha", playersB: "Megha", pointsA: 21, pointsB: 18 },
          MD: {
            playersA: "Arjun & Rohit",
            playersB: "Siddharth & Varun",
            pointsA: 21,
            pointsB: 20,
          },
          XD: {
            playersA: "Neha & Arjun",
            playersB: "Megha & Siddharth",
            pointsA: 20,
            pointsB: 21,
          },
          RMS: {
            playersA: "Rohit",
            playersB: "Varun",
            pointsA: 18,
            pointsB: 21,
          },
          RMD: {
            playersA: "Aman & Rohit",
            playersB: "Siddharth & Varun",
            pointsA: 21,
            pointsB: 19,
          },
        },
      },
    ],
  },
};
