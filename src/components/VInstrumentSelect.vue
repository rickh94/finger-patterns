<template>
  <form title="Select Instrument">
    <div class="flex-row align-center option">
      <input type="radio"
             name="instrument"
             id="violin"
             value="Violin"
             v-model="instrument"
             @change="instrumentChanged"
      >
      <label for="violin">Violin</label>
    </div>
    <div class="flex-row align-center option">
      <input type="radio"
             name="instrument"
             id="viola"
             value="Viola"
             v-model="instrument"
             @change="instrumentChanged"
      >
      <label for="viola">Viola</label>
    </div>
  </form>
</template>
<script>
import EventBus from '../eventbus';

export default {
  name: 'v-instrument-select',
  data() {
    return {
      instrument: this.selected,
    };
  },
  props: {
    selected: {
      type: String,
      default: 'Violin',
    },
  },
  methods: {
    instrumentChanged(event) {
      EventBus.$emit('instrumentChanged', event.target.value);
    },
  },
};
</script>
