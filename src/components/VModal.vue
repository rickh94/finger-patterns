<template>
  <div v-show="open">
    <div :class="{dim: !noDim}" class="screen">
      <div class="modal" :title="title" :class="{lower: lower}">
        <header class="modal-header">
          <h3 class="modal-header__title">{{ title }}</h3>
          <button id="close-modal" title="Close Modal" @click="closeModal">&times;</button>
        </header>
        <main class="modal-content">
          <slot name="content"></slot>
        </main>
        <footer class="modal-actions">
          <slot name="actions">
            <button class="modal-action-button" :title="`Done with ${title}`" @click="closeModal">
              Done
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VModal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    noDim: {
      type: Boolean,
      default: false,
    },
    lower: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style scoped>
  .screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
  }

  /*noinspection CssUnusedSymbol*/
  .dim {
    background-color: rgba(0, 0, 0, 0.73);
  }

  .modal {
    position: absolute;
    background-color: white;
    z-index: 20;
    margin-top: 30vh;
    padding: 0.5rem;
    border-radius: 5px;
    max-width: 50vw;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.73);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }

  .modal-header__title {
    padding: 0;
    font-size: 1.5rem;
    margin: 0 2.5rem 0 0.3rem;
  }

  button#close-modal {
    color: red;
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 0.5rem;
    font-size: 2rem;
  }

  .modal-content {
    margin: 0.5rem 0.3rem;
  }

  .modal-actions {
    display: flex;
    flex-direction: row;
    justify-content: right;
    margin: 0 0.4rem 0.2rem 0.4rem;
  }

  .modal-action-button {
    background: transparent;
    box-shadow: none;
    border: none;
    border-bottom: 3px solid #ae00bf;
    cursor: pointer;
    font-size: 1rem;
    padding: 0 0 0.1rem 0;
  }

  .modal-action-button[disabled] {
    border-bottom: 3px solid dimgray;
  }

  /*noinspection CssUnusedSymbol*/
  .lower {
    margin-top: 60vh;
  }

</style>
