export const MATCH_DATA = {
  pools: {
    A: {
      name: "Pool A",
      teams: [
        { name: "Mighty Spartans", wins: 0, losses: 3 },
        { name: "Rising Phoenix", wins: 3, losses: 0 },
        { name: "Racket Blitz", wins: 2, losses: 1 },
        { name: "SmashOps", wins: 1, losses: 2 },
      ],
    },
    B: {
      name: "Pool B",
      teams: [
        { name: "Herricanes", wins: 3, losses: 0 },
        { name: "Lord of the Strings", wins: 1, losses: 2 },
        { name: "Silicon Swat", wins: 0, losses: 3 },
        { name: "The BaddyVerse", wins: 2, losses: 1 },
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
            playersA: "Nithin Bhaskar",
            playersB: "Ramanan",
            pointsA: 15,
            pointsB: 21,
          },
          WS: {
            playersA: "Rubini",
            playersB: "Deepika",
            pointsA: 9,
            pointsB: 21,
          },
          MD: {
            playersA: "Preetham & Nithin Bhaskar",
            playersB: "Aman & Ramanan",
            pointsA: 21,
            pointsB: 16,
          },
          XD: {
            playersA: "Rubini & Shiva",
            playersB: "Chirag & Deepika",
            pointsA: 2,
            pointsB: 21,
          },
          RMS: {
            playersA: "Preetham",
            playersB: "Aman",
            pointsA: 21,
            pointsB: 16,
          },
          RMD: {
            playersA: "Mithun & Nattu",
            playersB: "Prajwal P & Kingsly",
            pointsA: 21,
            pointsB: 10,
          },
        },
      },

      {
        teams: ["Rising Phoenix", "SmashOps"],
        results: {
          MS: {
            playersA: "Ramanan",
            playersB: "Shreesha",
            pointsA: 21,
            pointsB: 9,
          },
          WS: {
            playersA: "Deepika",
            playersB: "Lakshitha",
            pointsA: 16,
            pointsB: 21,
          },
          MD: {
            playersA: "Aman & Ramanan",
            playersB: "Ganesh & Aswin",
            pointsA: 21,
            pointsB: 8,
          },
          XD: {
            playersA: "Aman & Deepika",
            playersB: "Lakshitha & Ajay",
            pointsA: 13,
            pointsB: 21,
          },
          RMS: {
            playersA: "Chirag",
            playersB: "Ajay",
            pointsA: 21,
            pointsB: 19,
          },
          RMD: {
            playersA: "Prajwal P & Kingsly",
            playersB: "Vipin & Shreesha",
            pointsA: 10,
            pointsB: 21,
          },
        },
      },

      {
        teams: ["Racket Blitz", "SmashOps"],
        results: {
          MS: {
            playersA: "Ninad",
            playersB: "Shreesha",
            pointsA: 21,
            pointsB: 7,
          },
          RMS: {
            playersA: "Srujan",
            playersB: "Aswin",
            pointsA: 21,
            pointsB: 6,
          },
          MD: {
            playersA: "Suresh & Srujan",
            playersB: "Ganesh & Vipin",
            pointsA: 21,
            pointsB: 20,
          },
          RMD: {
            playersA: "Suresh & Ninad",
            playersB: "Ajay & Shreesha",
            pointsA: 14,
            pointsB: 21,
          },
          WS: {
            playersA: "Divya",
            playersB: "Lakshitha",
            pointsA: 14,
            pointsB: 21,
          },
          XD: {
            playersA: "Aditya & Nikhila",
            playersB: "Ajay & Lakshitha",
            pointsA: 6,
            pointsB: 21,
          },
        },
      },

      {
        teams: ["Rising Phoenix", "Racket Blitz"],
        results: {
          MS: {
            playersA: "Ramanan",
            playersB: "Ninad",
            pointsA: 15,
            pointsB: 21,
          },
          WS: {
            playersA: "Deepika",
            playersB: "Nikhila",
            pointsA: 21,
            pointsB: 3,
          },
          MD: {
            playersA: "Aman & Ramanan",
            playersB: "Srujan & Ninad",
            pointsA: 16,
            pointsB: 21,
          },
          XD: {
            playersA: "Aman & Deepika",
            playersB: "Suresh & Divya",
            pointsA: 21,
            pointsB: 9,
          },
          RMS: {
            playersA: "Chirag",
            playersB: "Aditya",
            pointsA: 21,
            pointsB: 6,
          },
          RMD: {
            playersA: "Prajwal P & Kingsly",
            playersB: "Suresh & Srujan",
            pointsA: 14,
            pointsB: 21,
          },
        },
      },

      {
        teams: ["Mighty Spartans", "Racket Blitz"],
        results: {
          MS: {
            playersA: "Shiva",
            playersB: "Ninad",
            pointsA: 1,
            pointsB: 21,
          },
          RMS: {
            playersA: "Preetham",
            playersB: "Aditya",
            pointsA: 21,
            pointsB: 1,
          },
          MD: {
            playersA: "Nithin Bhaskar & Preetham",
            playersB: "Srujan & Ninad",
            pointsA: 8,
            pointsB: 21,
          },
          RMD: {
            playersA: "Nattu & Mithun",
            playersB: "Srujan & Suresh",
            pointsA: 12,
            pointsB: 21,
          },
          WS: {
            playersA: "Rubini",
            playersB: "Divya",
            pointsA: 21,
            pointsB: 18,
          },
          XD: {
            playersA: "Nithin Bhaskar & Rubini",
            playersB: "Suresh & Nikhila",
            pointsA: 21,
            pointsB: 13,
          },
        },
      },

      {
        teams: ["Mighty Spartans", "SmashOps"],
        results: {
          MS: {
            playersA: "Nithin Bhaskar",
            playersB: "Aswin",
            pointsA: 21,
            pointsB: 11,
          },
          RMS: {
            playersA: "Preetham",
            playersB: "Ajay",
            pointsA: 21,
            pointsB: 16,
          },
          MD: {
            playersA: "Mithun & Nattu",
            playersB: "Ajay & Shreesha",
            pointsA: 8,
            pointsB: 21,
          },
          RMD: {
            playersA: "Nithin Bhaskar & Preetham",
            playersB: "Ganesh & Vipin",
            pointsA: 21,
            pointsB: 20,
          },
          WS: {
            playersA: "Rubini",
            playersB: "Lakshitha",
            pointsA: 9,
            pointsB: 21,
          },
          XD: {
            playersA: "Rubini & Shiva",
            playersB: "Lakshitha & Shreesha",
            pointsA: 9,
            pointsB: 21,
          },
        },
      },
    ],

    /* ========================= POOL B ========================= */
    B: [
      {
        teams: ["Lord of the Strings", "Herricanes"],
        results: {
          MS: {
            playersA: "Mohanraj",
            playersB: "Manish",
            pointsA: 13,
            pointsB: 21,
          },
          RMS: {
            playersA: "Prajwal S",
            playersB: "Vikram",
            pointsA: 21,
            pointsB: 12,
          },
          MD: {
            playersA: "Karthik & Pratham Pote",
            playersB: "Kiran & Khalid",
            pointsA: 7,
            pointsB: 21,
          },
          RMD: {
            playersA: "Nithish B M & Mohanraj",
            playersB: "Khalid & Naresh",
            pointsA: 17,
            pointsB: 21,
          },
          WS: {
            playersA: "Anika",
            playersB: "Anoohya",
            pointsA: 12,
            pointsB: 21,
          },
          XD: {
            playersA: "Prajwal S & Ananya",
            playersB: "Vikram & Anoohya",
            pointsA: 19,
            pointsB: 21,
          },
        },
      },

      {
        teams: ["Silicon Swat", "Herricanes"],
        results: {
          MS: {
            playersA: "Nithin P",
            playersB: "Vikram",
            pointsA: 21,
            pointsB: 17,
          },
          RMS: {
            playersA: "Vikrant",
            playersB: "Kiran",
            pointsA: 18,
            pointsB: 21,
          },
          MD: {
            playersA: "Nithin P & Hari Siva Shankar",
            playersB: "Khalid & Manish",
            pointsA: 19,
            pointsB: 21,
          },
          RMD: {
            playersA: "Alex & Hari Siva Shankar",
            playersB: "Khalid & Naresh",
            pointsA: 9,
            pointsB: 21,
          },
          WS: {
            playersA: "Kiruthika",
            playersB: "Anoohya",
            pointsA: 15,
            pointsB: 21,
          },
          XD: {
            playersA: "Arya & Kiruthika",
            playersB: "Anoohya & Vikram",
            pointsA: 17,
            pointsB: 21,
          },
        },
      },

      {
        teams: ["The BaddyVerse", "Herricanes"],
        results: {
          MS: {
            playersA: "Chaitanya",
            playersB: "Manish",
            pointsA: 21,
            pointsB: 15,
          },
          RMS: {
            playersA: "Manu",
            playersB: "Vikram",
            pointsA: 12,
            pointsB: 21,
          },
          MD: {
            playersA: "Manu & Shreeharsha",
            playersB: "Khalid & Kiran",
            pointsA: 17,
            pointsB: 21,
          },
          RMD: {
            playersA: "Shashikumar & Abhishek",
            playersB: "Khalid & Naresh",
            pointsA: 17,
            pointsB: 21,
          },
          WS: {
            playersA: "Amrutha",
            playersB: "Anoohya",
            pointsA: 19,
            pointsB: 21,
          },
          XD: {
            playersA: "Chaitanya & Garima",
            playersB: "Vikram & Anoohya",
            pointsA: 14,
            pointsB: 21,
          },
        },
      },

      {
        teams: ["Lord of the Strings", "Silicon Swat"],
        results: {
          MS: {
            playersA: "Prajwal S",
            playersB: "Arya",
            pointsA: 21,
            pointsB: 15,
          },
          RMS: {
            playersA: "Mohanraj",
            playersB: "Hari Siva Shankar",
            pointsA: 21,
            pointsB: 16,
          },
          MD: {
            playersA: "Nithish B M & Pratham Pote",
            playersB: "Alex & Vikrant",
            pointsA: 21,
            pointsB: 16,
          },
          RMD: {
            playersA: "Nithish B M & Karthik",
            playersB: "Nithin P & Arya",
            pointsA: 11,
            pointsB: 21,
          },
          WS: {
            playersA: "Anika",
            playersB: "Kiruthika",
            pointsA: 21,
            pointsB: 19,
          },
          XD: {
            playersA: "Prajwal S & Ananya",
            playersB: "Nithin P & Kiruthika",
            pointsA: 20,
            pointsB: 21,
          },
        },
      },

      {
        teams: ["Lord of the Strings", "The BaddyVerse"],
        results: {
          MS: {
            playersA: "Mohanraj",
            playersB: "Chaitanya",
            pointsA: 4,
            pointsB: 21,
          },
          RMS: {
            playersA: "Prajwal S",
            playersB: "Manu",
            pointsA: 21,
            pointsB: 17,
          },
          MD: {
            playersA: "Nithish B M & Pratham Pote",
            playersB: "Shreeharsha & Chaitanya",
            pointsA: 4,
            pointsB: 21,
          },
          RMD: {
            playersA: "Nithish B M & Prajwal S",
            playersB: "Shreeharsha & Shashikumar",
            pointsA: 21,
            pointsB: 18,
          },
          WS: {
            playersA: "Anika",
            playersB: "Amrutha",
            pointsA: 19,
            pointsB: 21,
          },
          XD: {
            playersA: "Karthik & Ananya",
            playersB: "Abhishek & Garima",
            pointsA: 21,
            pointsB: 17,
          },
        },
      },

      {
        teams: ["The BaddyVerse", "Silicon Swat"],
        results: {
          MS: {
            playersA: "Chaitanya",
            playersB: "Hari Siva Shankar",
            pointsA: 21,
            pointsB: 8,
          },
          RMS: {
            playersA: "Manu",
            playersB: "Arya",
            pointsA: 12,
            pointsB: 21,
          },
          MD: {
            playersA: "Chaitanya & Shreeharsha",
            playersB: "Nithin P & Arya",
            pointsA: 21,
            pointsB: 14,
          },
          RMD: {
            playersA: "Shreeharsha & Shashikumar",
            playersB: "Alex & Vikrant",
            pointsA: 21,
            pointsB: 5,
          },
          WS: {
            playersA: "Amrutha",
            playersB: "Kiruthika",
            pointsA: 20,
            pointsB: 21,
          },
          XD: {
            playersA: "Abhishek & Garima",
            playersB: "Nithin P & Kiruthika",
            pointsA: 4,
            pointsB: 21,
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
          },
        },
      },

      /* Semi Final 2
       Herricanes def Racket Blitz (6–0)
    */
      {
        teams: ["Racket Blitz", "Herricanes"],
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
       Mighty Spartans def Herricanes (6–0)
    */
      {
        teams: ["Mighty Spartans", "Herricanes"],
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
