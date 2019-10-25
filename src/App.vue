<template>
  <div>
    <header class="main-header">
      <h1 class="main-header__title">
        <button
          :class="{'main-header__button': !printView}"
          class="clear-button"
          title="Change Instrument"
          @click="instrumentSelectOpen = true"
        >
          {{ instrument }}
        </button>
        Finger Patterns
      </h1>
      <h3 class="main-header__subtitle">on the
        <button
          title="Change String"
          :class="{'main-header__button': !printView}"
          class="clear-button"
          @click="stringSelectOpen = true">
          {{ instrumentString }} String
        </button>
      </h3>
      <a class="print-button main-header__button clear-button"
         target="_blank" rel="noopener noreferrer"
         :href="printUrl"
         v-show="!printView"
      >
        Print View
      </a>
    </header>
    <main class="main-body">
      <div class="col">
        <v-finger-pattern pattern-name="1-2" :steps="['W', 'H', 'W', 'W']"></v-finger-pattern>
        <v-finger-pattern pattern-name="2-3" :steps="['W', 'W', 'H', 'W']"></v-finger-pattern>
        <v-finger-pattern pattern-name="3-4" :steps="['W', 'W', 'W', 'H']"></v-finger-pattern>
      </div>
      <div class="col">
        <v-finger-pattern pattern-name="Whole Steps"
                          :steps="['H', 'W', 'W', 'W']"></v-finger-pattern>
        <v-finger-pattern pattern-name="Half Steps"
                          :steps="['W', 'H', 'A', 'H']"></v-finger-pattern>
      </div>
    </main>
    <v-modal :open="instrumentSelectOpen" title="Select Instrument"
             @closeModal="instrumentSelectOpen = false">
      <template v-slot:content>
        <v-instrument-select :selected="instrument" />
      </template>
    </v-modal>
    <v-modal :open="stringSelectOpen" title="Select Instrument"
             @closeModal="stringSelectOpen = false">
      <template v-slot:content>
        <v-string-select :instrument="instrument" :selected="instrumentString" />
      </template>
    </v-modal>
  </div>
</template>

<script>
import VFingerPattern from './components/VFingerPattern.vue';
import VModal from './components/VModal.vue';
import VInstrumentSelect from './components/VInstrumentSelect.vue';
import { EventBus } from './main.js';
import VStringSelect from './components/VStringSelect.vue';

export default {
  name: 'app',
  components: { VStringSelect, VInstrumentSelect, VModal, VFingerPattern },
  data() {
    return {
      instrument: 'Violin',
      instrumentString: 'A',
      instrumentSelectOpen: false,
      stringSelectOpen: false,
      printView: false,
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.printView = urlParams.get('print') || false;
    this.instrument = urlParams.get('instrument') || 'Violin';
    this.instrumentString = urlParams.get('instrumentString') || 'A';
    if (this.printView) {
      document.querySelector('body').style.backgroundColor = 'white';
    }
    EventBus.$on('instrumentChanged', nextInstrument => {
      this.instrument = nextInstrument;
    });
    EventBus.$on('instrumentStringChanged', nextInstrumentString => {
      this.instrumentString = nextInstrumentString;
    });
  },
  computed: {
    printUrl() {
      const url = new URL(window.location.href);
      const params = new URLSearchParams({
        print: true,
        instrument: this.instrument,
        instrumentString: this.instrumentString,
      });
      url.search = params.toString();
      return url;
    },
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700&display=swap');

  * {
    font-family: 'Libre Baskerville', serif;
  }

  body {
    background-color: rgba(232, 0, 255, 0.02);
  }

  .main-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    margin-top: 2rem;
  }

  .main-header__title {
    width: 100%;
    text-align: center;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }

  .clear-button {
    color: inherit;
    padding-left: 0;
    padding-right: 0;
    font-size: inherit;
    font-weight: inherit;
    background-color: transparent;
    box-shadow: none;
    border: none;
  }

  .main-header__button {
    border-bottom: 4px solid rgba(144, 0, 161, 0.79);
    cursor: pointer;
  }

  .main-header__subtitle {
    width: 100%;
    text-align: center;
    color: dimgray;
  }


  .main-body {
    margin: 1rem auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .col {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 1rem;
  }

  .print-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5rem;
    text-decoration: none;
  }

</style>
