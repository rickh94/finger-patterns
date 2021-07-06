<template>
  <div :id="`${normalizedId}-notes`" class="notes" :class="{raised: raised}"></div>
</template>

<script>
import EventBus from "../eventbus";

let abcjs = null;

export default {
  name: 'VNotesDisplay',
  props: {
    normalizedId: {
      type: String,
      required: true,
    },
    clef: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    raised: {
      type: Boolean,
      default: false,
    },
    scale: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const printView = urlParams.get('print') || false;
    let staffWidth = 300;
    if (this.scale) {
      if (document.body.scrollWidth > 1000 || printView) {
        staffWidth = 1000;
      } else {
        staffWidth = document.body.scrollWidth - 20;
      }
    }
    abcjs = await import("abcjs");
    abcjs.renderAbc(`${this.normalizedId}-notes`, this.tune, {
      scale: 1.1,
      staffwidth: staffWidth,
      clickListener: this.onNoteClick,
      add_classes: true,
      paddingleft: 0,
      paddingright: 0,
      paddingbottom: 0,
      paddingtop: 0,
      viewportHorizontal: true,
      wrap: {
        minSpacing: 1.8,
        maxSpacing: 10,
        preferredMeasuresPerLine: 4,
      },
    });
    EventBus.$on('activeFingerChanged', ({
      parentId,
      finger,
    }) => {
      if (!(parentId === this.normalizedId)) {
        return;
      }
      if (finger > 15 || finger < 1) {
        this.resetSelected();
        return;
      }
      const noteNum = (finger - 1) % 4;
      const measureNum = Math.floor((finger - 1) / 4);
      const $note = this.$el.querySelector(`.abcjs-n${noteNum}.abcjs-m${measureNum}`);
      this.resetSelected();
      $note.classList.add("abcjs-note_selected");
    });
    EventBus.$on('instrumentChanged', () => {
      this.resetSelected();
    });
    EventBus.$on('instrumentStringChanged', () => {
      this.resetSelected();
    });
  },
  computed: {
    tune() {
      return `
      X:1
      L: 1/4
      K: Cmaj clef=${this.clef}
      ${this.notes} |
      `;
    },
  },
  methods: {
    onNoteClick(event) {
      event.abselem.elemset.forEach((el) => {
        if (el.classList.contains('abcjs-note')) {
          const regex = /abcjs-n(\d)/;
          const match = regex.exec(el.className.baseVal);
          let noteNum = parseInt(match[1], 10) + 1;
          if (this.scale) {
            const measureRegex = /abcjs-m(\d)/;
            const match2 = measureRegex.exec(el.className.baseVal);
            noteNum += parseInt(match2[1], 10) * 4;
          }
          this.$emit("noteClicked", noteNum);
        }
      });
    },
    resetSelected() {
      this.$el.querySelectorAll('.abcjs-note_selected')
          .forEach((el) => {
            el.classList.remove('abcjs-note_selected');
          });
    },
  },
};
</script>

<style>
.notes {
  cursor: pointer;
}

.print-mode .notes {
  cursor: default;
}

.abcjs-note {
  fill: #000000;
  cursor: pointer;
}

.abcjs-staff {
  fill: #000000;
}

.abcjs-note_selected {
  fill: #ae00bf;
}

.print-mode .abcjs-note_selected {
  fill: #000000;
}

.raised {
  background-color: white;
}
</style>
