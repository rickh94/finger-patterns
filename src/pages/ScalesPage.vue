<template>
  <div class="scales-page">
    <header class="main-header">
      <h1 class="main-header__title">
        <button v-if="!printView" class="clear-button thick-bottom-border" title="Change Scale"
                @click="scaleSelectOpen = true"
        >{{ scaleNote }} {{ scaleMode }}
        </button>
        <span v-else>{{ scaleNote }} {{ scaleMode }}</span>
        Scale
      </h1>
      <h3 class="main-header__subtitle">on the
        <button v-if="!printView"
                class="clear-button thick-bottom-border"
                title="Change Instrument"
                @click="instrumentSelectOpen = true"
        >{{ instrument }}
        </button>
        <span v-else>{{ instrument }}</span>
      </h3>
    </header>
    <main class="scale-body">
      <v-notes-display
          normalized-id="scale"
          :clef="instrument === 'Violin' ? 'treble' : 'alto'"
          :notes="scales[scaleNote][scaleMode].notes"
          scale
          @noteClicked="onNoteClicked"
      >
      </v-notes-display>
      <div class="scale-finger-patterns">
        <div class="row">
          <span class="string-name">{{instrument === 'Violin' ? 'G' : 'C'}} String</span>
          <v-finger-display
              :active-finger="activeString === 0 ? activeFinger : null"
              normalized-id="scale"
              :widths="widths(4)"
              :radius="2"
              @activeFingerChanged="(num) => handleFingerChange(0, num)"
          ></v-finger-display>
        </div>
        <div class="row">
          <span class="string-name">{{instrument === 'Violin' ? 'D' : 'G'}} String</span>
          <v-finger-display
              :active-finger="activeString === 1 ? activeFinger : null"
              normalized-id="scale"
              :widths="widths(3)"
              :radius="2"
              @activeFingerChanged="(num) => handleFingerChange(1, num)"
          ></v-finger-display>
        </div>
        <div class="row">
          <span class="string-name">{{instrument === 'Violin' ? 'A' : 'D'}} String</span>
          <v-finger-display
              :active-finger="activeString === 2 ? activeFinger : null"
              normalized-id="scale"
              :widths="widths(2)"
              :radius="2"
              @activeFingerChanged="(num) => handleFingerChange(2, num)"
          ></v-finger-display>
        </div>
        <div class="row">
          <span class="string-name">{{instrument === 'Violin' ? 'E' : 'A'}} String</span>
          <v-finger-display
              :active-finger="activeString === 3 ? activeFinger : null"
              normalized-id="scale"
              :widths="widths(1)"
              :radius="2"
              @activeFingerChanged="(num) => handleFingerChange(3, num)"
          ></v-finger-display>
        </div>
      </div>
    </main>
  </div>

</template>

<script>
import VNotesDisplay from "@/components/VNotesDisplay.vue";
import VFingerDisplay from "@/components/VFingerDisplay";
import scales from "@/util/scales";
import computeWidths from "@/util/computeWidths";
import EventBus from "@/eventbus";

export default {
  name: "ScalesPage",
  components: { VNotesDisplay, VFingerDisplay },
  data() {
    return {
      scaleNote: "B",
      scaleMode: "Major",
      instrument: "Violin",
      printView: false,
      scaleSelectOpen: false,
      instrumentSelectOpen: true,
      scales: scales,
      activeFinger: null,
      activeString: null,
    };
  },
  methods: {
    widths(string) {
      return this.scale.patterns[string].map(computeWidths);
    },
    handleFingerChange(string, num) {
      this.activeString = string;
      this.activeFinger = num;
      const nextFinger = string * 4 + num - this.startOffset;
      EventBus.$emit('activeFingerChanged', {parentId: 'scale', finger: nextFinger})
    },
    onNoteClicked(num) {
      const nextNum = num + this.startOffset;
      this.activeString = Math.floor((nextNum - 1 ) / 4);
      this.activeFinger = nextNum % 4 || 4;  // what a hack. allows to select fourth fingers in scales without breaking other functionality
    },
  },
  computed: {
    scale() {
      return scales[this.scaleNote][this.scaleMode];
    },
    startOffset() {
      return this.scale.startOffset;
    }
  }
};
</script>

<style scoped>
.scales-page {
  padding-top: 1rem;
}

.scale-finger-patterns {
  display: flex;
  flex-direction: column;
  align-content: center;
}

.row {
  display: flex;
  align-items: center;
}

.string-name {
  font-weight: bold;
  margin-right: 0.5rem;
  font-size: 1.5rem;
}

.scale-body {
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
