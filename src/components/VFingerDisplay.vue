<!--suppress CssUnusedSymbol -->
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="300"
    height="100"
    viewBox="0 0 79.374999 26.458334"
    version="1.1"
    :id="normalizedId + '-finger-pattern'"
    :class="{raised: raised}"
  >
    <g
      transform="translate(0,-270.54165)">
      <path
        class="line stroke-default"
        d="M 0,283.59224 H 79.375"
        :id="normalizedId + '-finger-pattern-line'"
      />
      <circle
        :id="`${normalizedId}-finger-1`"
        class="stroke-default finger"
        :cx="oneXPos"
        cy="283.77081"
        :r="radius"
        :class="{'finger-active': activeFinger === 1}"
        @click="activeFingerChanged(1)"
      />
      <circle
        :id="`${normalizedId}-finger-2`"
        class="stroke-default finger"
        :cx="twoXPos"
        cy="283.77081"
        r="2.1166668"
        :class="{'finger-active': activeFinger === 2}"
        @click="activeFingerChanged(2)"
      />
      <circle
        :id="`${normalizedId}-finger-3`"
        class="stroke-default finger"
        :cx="threeXPos"
        cy="283.77081"
        r="2.1166668"
        :class="{'finger-active': activeFinger === 3}"
        @click="activeFingerChanged(3)"
      />
      <circle
        :id="`${normalizedId}-finger-4`"
        class="stroke-default finger"
        :cx="fourXPos"
        cy="283.77081"
        r="2.1166668"
        :class="{'finger-active': activeFinger === 4}"
        @click="activeFingerChanged(4)"
      />
      <text
        xml:space="preserve"
        class="stroke-default svg-text number"
        :class="{'finger-active': activeFinger === 1}"
        :x="oneXPos - 1.2"
        y="280.45789"
        :id="normalizedId + '-finger-1-text'"
        transform="scale(0.9999799,1.0000201)"
        @click="activeFingerChanged(1)"
      >
          <tspan
            :x="oneXPos - 1.2"
            y="280.45789"
          >1</tspan>
        </text>
      <text
        xml:space="preserve"
        :x="twoXPos - 1.3"
        :class="{'finger-active': activeFinger === 2}"
        y="280.45789"
        :id="normalizedId + '-finger-2-text'"
        transform="scale(0.99997991,1.0000201)"
        class="svg-text stroke-default finger"
        @click="activeFingerChanged(2)"
      >
          <tspan
            :x="twoXPos - 1.3"
            y="280.45789"
          >2</tspan>
        </text>
      <text
        xml:space="preserve"
        class="stroke-default svg-text finger"
        :class="{'finger-active': activeFinger === 3}"
        :x="threeXPos - 1.4"
        y="280.41202"
        :id="normalizedId + '-finger-3-text'"
        transform="scale(0.99997991,1.0000201)"
        @click="activeFingerChanged(3)"
      >
          <tspan
            :x="threeXPos - 1.4"
            y="280.41202"
          >3</tspan>
        </text>
      <text
        xml:space="preserve"
        class="stroke-default svg-text finger"
        :class="{'finger-active': activeFinger === 4}"
        :x="fourXPos - 1.5"
        y="280.45789"
        :id="normalizedId + '-finger-4-text'"
        transform="scale(0.99997991,1.0000201)"
        @click="activeFingerChanged(4)"
      >
          <tspan
            :x="fourXPos - 1.5"
            y="280.45789"
          >4</tspan>
        </text>
    </g>
  </svg>
</template>
<script>
export default {
  name: 'v-finger-display',
  props: {
    activeFinger: {
      type: Number,
      default: null,
    },
    normalizedId: {
      type: String,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
    },
    widths: {
      type: Array,
      required: true,
    },
    emptyStringLeft: {
      type: Number,
      default: 0,
    },
    raised: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    activeFingerChanged(num) {
      this.$emit('activeFingerChanged', num);
    },
  },
  computed: {
    oneXPos() {
      return this.emptyStringLeft + this.widths[0];
    },
    twoXPos() {
      return this.oneXPos + this.radius * 2 + this.widths[1];
    },
    threeXPos() {
      return this.twoXPos + this.radius * 2 + this.widths[2];
    },
    fourXPos() {
      return this.threeXPos + this.radius * 2 + this.widths[3];
    },
  },
};
</script>
<style scoped>

  .line {
    fill: none;
    stroke: #000000;
    stroke-linecap: butt;
    stroke-linejoin: miter;
    stroke-opacity: 0.52118641;
    stroke-miterlimit: 4;
    stroke-dasharray: none;
  }

  .stroke-default {
    stroke-width: 0.26458333;
  }

  .svg-text {
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    font-stretch: normal;
    font-size: 5px;
    line-height: 1.25;
    font-family: 'Libre Baskerville', serif;
    letter-spacing: 0;
    word-spacing: 0;
    fill: #000000;
    fill-opacity: 1;
    stroke: none;
  }

  .finger, .number {
    cursor: pointer;
  }

  .finger-active {
    fill: #ae00bf;
  }

  .print-mode .finger-active {
    fill: #000000;
  }

  .print-mode .finger,
  .print-mode .number {
    cursor: default;
  }

  .raised {
    background-color: white;
  }
</style>
