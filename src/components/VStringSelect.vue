<template>
  <form title="Select Instrument">
    <div class="flex-row align-center option" v-if="instrument === 'Violin'">
      <input type="radio" name="string" id="e-string" value="E" v-model="instrumentString"
             @change="stringChanged">
      <label for="e-string">E String</label>
    </div>
    <div class="flex-row align-center option">
      <input type="radio" name="string" id="a-string" value="A" v-model="instrumentString"
             @change="stringChanged">
      <label for="a-string">A String</label>
    </div>
    <div class="flex-row align-center option">
      <input type="radio" name="string" id="d-string" value="D" v-model="instrumentString"
             @change="stringChanged">
      <label for="d-string">D String</label>
    </div>
    <div class="flex-row align-center option">
      <input type="radio" name="string" id="g-string" value="G" v-model="instrumentString"
             @change="stringChanged">
      <label for="g-string">G String</label>
    </div>
    <div class="flex-row align-center option" v-if="instrument === 'Viola'">
      <input type="radio" name="string" id="c-string" value="C" v-model="instrumentString"
             @change="stringChanged">
      <label for="c-string">C String</label>
    </div>
  </form>
</template>

<script>
import { EventBus } from '../main.js';

export default {
  name: 'v-string-select',
  data() {
    return {
      instrumentString: this.selected,
    }
  },
  props: {
    instrument: {
      type: String,
      required: true,
    },
    selected: {
      type: String,
      default: 'A',
    },
  },
  methods: {
    stringChanged(event) {
      EventBus.$emit('instrumentStringChanged', event.target.value);
    },
  },
}
</script>
