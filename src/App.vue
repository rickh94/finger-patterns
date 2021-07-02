<!--suppress ALL -->
<template>
  <div class="app">
    <nav class="page-nav" v-if="!printView">
      <button
          class="page-nav__element thick-bottom-border"
          :class="{'page-nav__active': currentPage === 'patterns'}"
          @click="currentPage = 'patterns'"
      >
        Patterns
      </button>
      <button
          class="page-nav__element thick-bottom-border"
          :class="{'page-nav__active': currentPage === 'scales'}"
          @click="currentPage = 'scales'"
      >Scales
      </button>
    </nav>
    <patterns-page v-if="currentPage === 'patterns'"></patterns-page>
    <scales-page v-else-if="currentPage === 'scales'"></scales-page>
    <div v-else>This page does not exist.</div>
  </div>
</template>

<script>
import PatternsPage from '@/pages/PatternsPage';
import ScalesPage from '@/pages/ScalesPage';

export default {
  name: 'app',
  components: { PatternsPage, ScalesPage },
  data() {
    return {
      printView: false,
      currentPage: 'patterns',
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.printView = urlParams.get('print') || false;
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
  position: absolute;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

html {
  margin: 0;
  padding: 0;
}

.app {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(232, 0, 255, 0.02);
}

.page-nav {
  display: flex;
  width: 100%;
  justify-content: center;
}

.page-nav__element {
  margin: 0.5rem 0.25rem;
  color: inherit;
  padding: 0;
  cursor: pointer;
  box-shadow: none;
  background-color: transparent;
  font-size: 1rem;
}

.page-nav__active {
  font-weight: bold;
}

.thick-bottom-border {
  border-bottom: 4px solid rgba(144, 0, 161, 0.79);
  border-top: none;
  border-left: none;
  border-right: none;
}

.main-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
}

.main-header__title {
  width: 100%;
  text-align: center;
  font-weight: bold;
  padding: 0;
  margin: 0;
}


.main-header__subtitle {
  width: 100%;
  text-align: center;
  color: dimgray;
  margin-top: 0.8rem;
}

.clear-button {
  color: inherit;
  padding-left: 0;
  padding-right: 0;
  font-size: inherit;
  font-weight: inherit;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
}

</style>
