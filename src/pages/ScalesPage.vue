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
          <span class="string-name">G String</span>
          <v-finger-display
              :active-finger="activeString === 'G' ? activeFinger : null"
              normalized-id="scale"
              :widths="widths('G')"
              :radius="2"
              @activeFingerChanged="(num) => handleFingerChange('G', num)"
          ></v-finger-display>
        </div>
        <div class="row">
          <span class="string-name">D String</span>
          <v-finger-display
              :active-finger="activeString === 'D' ? activeFinger : null"
              normalized-id="scale"
              :widths="widths('D')"
              :radius="2"
              @activeFingerChanged="(num) => handleFingerChange('D', num)"
          ></v-finger-display>
        </div>
        <div class="row">
          <span class="string-name">A String</span>
          <v-finger-display
              :active-finger="activeString === 'A' ? activeFinger : null"
              normalized-id="scale"
              :widths="widths('A')"
              :radius="2"
              @activeFingerChanged="(num) => handleFingerChange('A', num)"
          ></v-finger-display>
        </div>
        <div class="row">
          <span class="string-name">E String</span>
          <v-finger-display
              :active-finger="activeString === 'E' ? activeFinger : null"
              normalized-id="scale"
              :widths="widths('E')"
              :radius="2"
              @activeFingerChanged="(num) => handleFingerChange('E', num)"
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
      return scales[this.scaleNote][this.scaleMode].patterns[string].map(computeWidths);
    },
    handleFingerChange(string, num) {
      this.activeString = string;
      this.activeFinger = num;
    },
    onNoteClicked(num) {
      console.log("note clicked", num);
    },
  },
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
