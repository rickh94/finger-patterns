const fingerPatterns = {
  oneTwo: ["W", "H", "W", "W"],
  twoThree: ["W", "W", "H", "W"],
  threeFour: ["W", "W", "W", "H"],
  threeFourLow: ["H", "W", "W", "H"],
  wholeSteps: ["W", "W", "W", "W"],
  wholeStepsLow: ["H", "W", "W", "W"],
}
export default {
  Violin: {
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
      }
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
      }
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
  },
  Viola: {
    B: {
      Major: {
        notes: '',
        patterns: {
          4: [],
          3: [],
          2: [],
          1: [],
        },
        startOffset: 6,
      }
    }
  }
};
