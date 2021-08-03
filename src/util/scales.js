const fingerPatterns = {
  oneTwo: ["W", "H", "W", "W"],
  oneTwoLow: ["H", "H", "W", "W"],
  oneTwoHigh: ["A", "H", "W", "W"],
  twoThree: ["W", "W", "H", "W"],
  twoThreeLow: ["H", "W", "H", "W"],
  twoThreeHigh: ["A", "W", "H", "W"],
  threeFour: ["W", "W", "W", "H"],
  threeFourLow: ["H", "W", "W", "H"],
  threeFourHigh: ["A", "W", "W", "H"],
  wholeSteps: ["W", "W", "W", "W"],
  wholeStepsLow: ["H", "W", "W", "W"],
};
export default {
  Violin: {
    Gb: {
      Major: {
        notes: "_G _A _B _c | _d  _e f _g2 |",
        patterns: {
          4: fingerPatterns.twoThreeLow,
          3: fingerPatterns.twoThreeLow,
          2: fingerPatterns.oneTwoLow,
          1: fingerPatterns.oneTowLow,
        },
        startOffset: 7,
      },
    },
    G: {
      Major: {
        notes: "G, A, B, C | D E ^F G | A B c d | e ^f g2",
        patterns: {
          4: fingerPatterns.twoThree,
          3: fingerPatterns.twoThree,
          2: fingerPatterns.oneTwo,
          1: fingerPatterns.oneTwo,
        },
        startOffset: -1,
      },
    },
    Ab: {
      Major: {
        notes: "_A, _B, C _D | _E F G _A | _B c _d _e | f g _a2",
        patterns: {
          4: fingerPatterns.threeFourLow,
          3: fingerPatterns.threeFourLow,
          2: fingerPatterns.twoThreeLow,
          1: fingerPatterns.twoThreeLow,
        },
        startOffset: 0,
      },
    },
    A: {
      Major: {
        notes: "A, B, ^C D | E ^F ^G A | B ^c d e | ^f ^g a2",
        patterns: {
          4: fingerPatterns.threeFour,
          3: fingerPatterns.threeFour,
          2: fingerPatterns.twoThree,
          1: fingerPatterns.twoThree,
        },
        startOffset: 0,
      },
    },
    Bb: {
      Major: {
        notes: "_B, C D _E | F G A _B | c d _e f | g _a _b2",
        patterns: {
          4: fingerPatterns.wholeStepsLow,
          3: fingerPatterns.threeFourLow,
          2: fingerPatterns.threeFourLow,
          1: fingerPatterns.twoThreeLow,
        },
        startOffset: 1,
      },
    },
    B: {
      Major: {
        notes: "B, ^C ^D E | ^F ^G ^A B | ^c ^d e ^f | ^g a b2",
        patterns: {
          4: fingerPatterns.wholeSteps,
          3: fingerPatterns.threeFour,
          2: fingerPatterns.threeFour,
          1: fingerPatterns.twoThree,
        },
        startOffset: 1,
      },
    },
    C: {
      Major: {
        notes: "C D E F | G A B c | d e f g | a b c'2",
        patterns: {
          4: fingerPatterns.twoThree,
          3: fingerPatterns.oneTwo,
          2: fingerPatterns.oneTwo,
          1: fingerPatterns.wholeStepsLow,
        },
        startOffset: 2,
      },
    },
    Db: {
      Major: {
        notes: "_D _E F _G | _A _B c _d",
        patterns: {
          4: fingerPatterns.threeFourLow,
          3: fingerPatterns.twoThreeLow,
          2: fingerPatterns.twoThreeLow,
          1: fingerPatterns.oneTwoLow,
        },
        startOffset: 3,
      },
    },
    D: {
      Major: {
        notes: "D E ^F G | A B ^c d",
        patterns: {
          4: fingerPatterns.threeFour,
          3: fingerPatterns.twoThree,
          2: fingerPatterns.twoThree,
          1: fingerPatterns.oneTwo,
        },
        startOffset: 3,
      },
    },
    Eb: {
      Major: {
        notes: "_E F G _A | _B c d _e",
        patterns: {
          4: fingerPatterns.wholeStepsLow,
          3: fingerPatterns.threeFourLow,
          2: fingerPatterns.threeFourLow,
          1: fingerPatterns.twoThreeLow,
        },
        startOffset: 4,
      },
    },
    E: {
      Major: {
        notes: "E ^F ^G A | B ^c ^d e",
        patterns: {
          4: fingerPatterns.wholeSteps,
          3: fingerPatterns.threeFour,
          2: fingerPatterns.threeFour,
          1: fingerPatterns.twoThree,
        },
        startOffset: 4,
      },
    },
    F: {
      Major: {
        notes: "F G A _B | c d e f",
        patterns: {
          4: fingerPatterns.oneTwo,
          3: fingerPatterns.oneTwo,
          2: fingerPatterns.wholeStepsLow,
          1: fingerPatterns.threeFourLow,
        },
      },
    },
  },
  Viola: {
    B: {
      Major: {
        notes: "",
        patterns: {
          4: [],
          3: [],
          2: [],
          1: [],
        },
        startOffset: 6,
      },
    },
  },
};
