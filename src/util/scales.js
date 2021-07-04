export default {
  A: {
    Major: {
      notes: "A, B, ^C D | E ^F ^G A | B ^c d e | ^f ^g a2",
      patterns: {
        G: ["W", "W", "W", "H"],
        D: ["W", "W", "W", "H"],
        A: ["W", "W", "H", "W"],
        E: ["W", "W", "H", "W"],
      },
      firstNoteOffset: 0,
    }
  },
  B: {
    Major: {
      notes: "B, ^C ^D E | ^F ^G ^A B | ^c ^d e ^f | ^g a b2",
      patterns: {
        G: ["W", "W", "W", "W"],
        D: ["W", "W", "W", "H"],
        A: ["W", "W", "W", "H"],
        E: ["W", "W", "H", "W"],
      },
    },
  },
};
