<template>
  <article>
    <header>
      <h2 class="heading">{{ patternName }} Pattern</h2>
    </header>
    <v-finger-display :active-finger="activeFinger" :normalized-id="normalizedId"
                      :widths="widths" :radius="radius"
                      @activeFingerChanged="setFingerActive"
                      :empty-string-left="emptyStringLeft"
    />
  </article>
</template>

<script>
import { EventBus } from '../main.js';
import VFingerDisplay from './VFingerDisplay.vue';

export default {
  name: 'VFingerPattern',
  components: { VFingerDisplay },
  data() {
    return {
      activeFinger: null,
    }
  },
  created() {
    EventBus.$on('activeFingerChanged', () => {
      this.activeFinger = null;
    });
    EventBus.$on('instrumentChanged', (nextInstrument) => {
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
  },
  methods: {
    setFingerActive(num) {
      if (this.activeFinger === num) {
        this.activeFinger = null;
      } else {
        EventBus.$emit('activeFingerChanged');
        this.activeFinger = num;
      }
    },
  },
  computed: {
    widths() {
      return this.steps.map(item => {
        if (item === 'H') {
          return 4;
        } else if (item === 'A') {
          return 20;
        } else {
          return 16;
        }
      });
    },
    normalizedId() {
      return this.patternName.toLowerCase().replace(' ', '-');
    },
  },
};
</script>

<style scoped>
  .heading {
    width: 300px;
    text-align: left;
    margin-top: 1rem;
    font-size: 20px;
    font-weight: normal;
  }


</style>
