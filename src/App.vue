<template>
  <div>
    <header class="main-header">
      <h1 class="main-header__title">
        <button
          :class="{'main-header__button': !printView}"
          class="clear-button"
          title="Change Instrument"
          @click="instrumentSelectOpen = true"
          v-if="!printView"
        >
          {{ instrument }}
        </button>
        <span v-else>{{ instrument }}</span>
        Finger Patterns
      </h1>
      <h3 class="main-header__subtitle" v-if="instrumentString !== 'fingers-only'">on the
        <button
          title="Change String"
          :class="{'main-header__button': !printView}"
          class="clear-button"
          @click="stringSelectOpen = true"
          v-if="!printView"
        >
          {{ instrumentString }} String
        </button>
        <span v-else>{{ instrumentString }} String</span>
      </h3>
      <h3 class="main-header__subtitle" v-else>
        <button
          title="Change String"
          :class="{'main-header__button': !printView}"
          class="clear-button"
          @click="stringSelectOpen = true"
          v-if="!printView"
        >
          Fingers Only
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
        <v-finger-pattern pattern-name="1-2"
                          :steps="['W', 'H', 'W', 'W']"
                          :notes="oneTwoNotes"
                          :clef="clef"
        ></v-finger-pattern>
        <v-finger-pattern pattern-name="2-3"
                          :steps="['W', 'W', 'H', 'W']"
                          :notes="twoThreeNotes"
                          :clef="clef"
        ></v-finger-pattern>
        <v-finger-pattern pattern-name="3-4"
                          :steps="['W', 'W', 'W', 'H']"
                          :notes="threeFourNotes"
                          :clef="clef"
        ></v-finger-pattern>
      </div>
      <div class="col">
        <v-finger-pattern pattern-name="Whole Steps"
                          :steps="['H', 'W', 'W', 'W']"
                          :notes="wholeStepsNotes"
                          :clef="clef"
        ></v-finger-pattern>
        <v-finger-pattern pattern-name="Half Steps"
                          :steps="['W', 'H', 'A', 'H']"
                          :notes="halfStepsNotes"
                          :clef="clef"
        ></v-finger-pattern>
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
import VStringSelect from './components/VStringSelect.vue';
import { getNotes } from './util/notes';
import EventBus from './eventbus';

export default {
  name: 'app',
  components: {
    VStringSelect, VInstrumentSelect, VModal, VFingerPattern,
  },
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
      document.querySelector('body').classList.add('print-mode');
    }
    EventBus.$on('instrumentChanged', (nextInstrument) => {
      this.instrument = nextInstrument;
    });
    EventBus.$on('instrumentStringChanged', (nextInstrumentString) => {
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
    oneTwoNotes() {
      return getNotes('1-2', this.instrument, this.instrumentString);
    },
    twoThreeNotes() {
      return getNotes('2-3', this.instrument, this.instrumentString);
    },
    threeFourNotes() {
      return getNotes('3-4', this.instrument, this.instrumentString);
    },
    wholeStepsNotes() {
      return getNotes('whole-steps', this.instrument, this.instrumentString);
    },
    halfStepsNotes() {
      return getNotes('half-steps', this.instrument, this.instrumentString);
    },
    clef() {
      switch (this.instrument) {
        case 'Violin':
          return 'treble';
        case 'Viola':
          return 'alto';
        default:
          return null;
      }
    },
  },
};
</script>

<style>
  /*noinspection CssUnknownTarget*/
  @import url('https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700&display=swap');

  * {
    font-family: 'Libre Baskerville', serif;
  }

  body {
    background-color: rgba(232, 0, 255, 0.02);
  }

  /*noinspection CssUnusedSymbol*/
  body.print-mode {
    background-color: white;
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
    margin-top: 0.8rem;
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
