export const notes = {
  Violin: {
    '1-2': {
      E: '^f g a b',
      A: 'B c d e',
      D: 'E F G A',
      G: 'A, _B, C D',
    },
    '2-3': {
      E: '^f ^g a b',
      A: 'B ^c d e',
      D: 'E ^F G A',
      G: 'A, B, C D',
    },
    '3-4': {
      E: '^f ^g ^a b',
      A: 'B ^c ^d e',
      D: 'E ^F ^G A',
      G: 'A, B, ^C D',
    },
    'whole-steps': {
      E: 'f g a b',
      A: '_B c d e',
      D: '_E F G A',
      G: '_A, _B, C D',
    },
    'half-steps': {
      E: '^f g ^a b',
      A: 'B c ^d e',
      D: 'E F ^G A',
      G: 'A, _B, ^C D',
    },
  },
  Viola: {
    '1-2': {
      A: 'B c d e',
      D: 'E F G A',
      G: 'A, _B, C D',
      C: 'D, _E, F, G,',
    },
    '2-3': {
      A: 'B ^c d e',
      D: 'E ^F G A',
      G: 'A, B, C D',
      C: 'D, E, F, G,',
    },
    '3-4': {
      A: 'B ^c ^d e',
      D: 'E ^F ^G A',
      G: 'A, B, ^C D',
      C: 'D, E, ^F, G,',
    },
    'whole-steps': {
      A: '_B c d e',
      D: '_E F G A',
      G: '_A, _B, C D',
      C: '_D, _E, F, G,',
    },
    'half-steps': {
      A: 'B c ^d e',
      D: 'E F ^G A',
      G: 'A, _B, ^C D',
      C: 'D, _E, ^F, G,',
    },
  },
};

export function getNotes(pattern, instrument, string) {
  return notes[instrument][pattern][string];
}
