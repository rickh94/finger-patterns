<template>
  <article class="finger-pattern">
    <header>
      <h2 class="finger-pattern__heading">{{ patternName }} Pattern</h2>
    </header>
    <v-notes-display :normalized-id="normalizedId" :clef="clef" :notes="notes"
                     @noteClicked="onNoteClicked" v-if="notes" :key="`${clef}${notes}`"
                     :raised="notesRaised"
    />
    <v-finger-display :active-finger="activeFinger" :normalized-id="normalizedId"
                      :widths="widths" :radius="radius"
                      @activeFingerChanged="setFingerActive"
                      :empty-string-left="emptyStringLeft"
                      :raised="fingersRaised"
    />
  </article>
</template>

<script>
import VFingerDisplay from './VFingerDisplay.vue';
import VNotesDisplay from './VNotesDisplay.vue';
import EventBus from '../eventbus';

export default {
  name: 'VFingerPattern',
  components: { VNotesDisplay, VFingerDisplay },
  data() {
    return {
      activeFinger: null,
    };
  },
  created() {
    EventBus.$on('activeFingerChanged', ({ parentId }) => {
      this.activeFinger = null;
      if (parentId !== this.normalizedId) {
        this.clearSelected();
      }
    });
    EventBus.$on('instrumentChanged', () => {
      this.activeFinger = null;
    });
    EventBus.$on('instrumentStringChanged', () => {
      this.activeFinger = null;
    });
  },
  props: {
    patternName: {
      type: String,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
    halfStepWidth: {
      type: Number,
      default: 5,
    },
    radius: {
      type: Number,
      default: 2,
    },
    emptyStringLeft: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      required: false,
    },
    clef: {
      type: String,
      required: true,
    },
    notesRaised: {
      type: Boolean,
      default: false,
    },
    fingersRaised: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clearSelected() {
      this.$el.querySelectorAll('.abcjs-note_selected').forEach((el) => {
        el.classList.remove('abcjs-note_selected');
      });
    },
    setFingerActive(num) {
      if (this.activeFinger === num) {
        this.clearSelected();
        this.activeFinger = null;
      } else {
        EventBus.$emit('activeFingerChanged', { parentId: this.normalizedId, finger: num });
        this.activeFinger = num;
      }
    },
    onNoteClicked(num) {
      this.setFingerActive(num);
    },
  },
  computed: {
    widths() {
      return this.steps.map((item) => {
        if (item === 'H') {
          return 4;
        }
        if (item === 'A') {
          return 20;
        }
        return 16;
      });
    },
    normalizedId() {
      return this.patternName.toLowerCase().replace(' ', '-');
    },
  },
};
</script>

<style scoped>
  .finger-pattern__heading {
    width: 300px;
    text-align: left;
    margin-top: 1rem;
    font-size: 20px;
    font-weight: normal;
  }

  /*.finger-pattern {*/
  /*  border: 2px solid #ae00bf;*/
  /*}*/


</style>
