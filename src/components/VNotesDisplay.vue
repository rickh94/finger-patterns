<!--suppress ALL -->
<template>
  <div :id="`${normalizedId}-notes`" class="notes"></div>
</template>

<script>
import abcjs from 'abcjs';
import EventBus from '../eventbus';

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
  },
  mounted() {
    abcjs.renderAbc(`${this.normalizedId}-notes`, this.tune, {
      scale: 1.1,
      staffwidth: 300,
      clickListener: this.onNoteClick,
      add_classes: true,
      paddingleft: 0,
      paddingright: 0,
      paddingbottom: 0,
      paddingtop: 0,
    });
    EventBus.$on('activeFingerChanged', ({ parentId, finger }) => {
      if (!(parentId === this.normalizedId)) {
        return;
      }
      const noteNum = finger - 1;
      const $note = this.$el.querySelector(`.abcjs-n${noteNum}`);
      this.$el.querySelectorAll('.abcjs-note_selected').forEach((el) => {
        el.classList.remove('abcjs-note_selected');
      });
      $note.classList.add('abcjs-note_selected');
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
          this.$emit('noteClicked', parseInt(match[1], 10) + 1);
        }
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
</style>
