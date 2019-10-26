<template>
  <v-modal :open="open" title="Help" @closeModal="onClose" no-dim :lower="lower">
    <template v-slot:content>
      <component :is="`v-help-${currentView}`"></component>
    </template>
    <template v-slot:actions>
      <button class="modal-action-button mr" @click="previousView" :disabled="!hasPrev">Previous
      </button>
      <button class="modal-action-button" @click="nextView" v-if="hasNext">Next</button>
      <button class="modal-action-button" @click="onClose" v-else>Done</button>
    </template>
  </v-modal>
</template>
<script>
import VModal from './VModal.vue';

export default {
  name: 'v-help-modal',
  components: {
    VModal,
    VHelpPrint: () => import('./help-views/VHelpPrint.vue'),
    VHelpInstrument: () => import('./help-views/VHelpInstrument.vue'),
    VHelpInstrumentString: () => import('./help-views/VHelpInstrumentString.vue'),
    VHelpNotes: () => import('./help-views/VHelpNotes.vue'),
    VHelpFingers: () => import('./help-views/VHelpPrint.vue'),
  },
  data() {
    return {
      currentViewNumber: 0,
      views: [
        'instrument',
        'instrument-string',
        'print',
        'notes',
        'fingers',
      ],
    };
  },
  computed: {
    currentView() {
      return this.views[this.currentViewNumber];
    },
    hasNext() {
      return this.currentViewNumber + 1 < this.views.length;
    },
    hasPrev() {
      return this.currentViewNumber - 1 >= 0;
    },
    lower() {
      return this.currentView === 'notes' || this.currentView === 'fingers';
    },
  },
  props: {
    changeElementRaised: {
      type: Function,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    nextView() {
      const nextViewNum = this.currentViewNumber + 1;
      if (nextViewNum >= this.views.length) {
        return;
      }
      this.changeElementRaised(this.views[nextViewNum]);
      this.currentViewNumber = nextViewNum;
    },
    previousView() {
      const prevViewNum = this.currentViewNumber - 1;
      if (prevViewNum < 0) {
        return;
      }
      this.changeElementRaised(this.views[prevViewNum]);
      this.currentViewNumber = prevViewNum;
    },
  },
  mounted() {
    this.changeElementRaised(this.currentView);
  },
};
</script>

<style>
  .mr {
    margin-right: auto;
  }

  /*noinspection CssUnusedSymbol*/
  .help-text {
    line-height: 1.5rem;
  }
</style>
