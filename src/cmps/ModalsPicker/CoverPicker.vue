<template>
  <div class="cover-picker">
    <h3>Size</h3>
    <div class="cover-preview-container">
      <div :style="isGray" :class="this.color" class="cover-preview"></div>
      <div :style="isGray" :class="this.color" class="cover-preview"></div>
    </div>
    <button></button>
    <h3>Colors</h3>
    <div class="color-table">
      <div
        @click="switchColor(color)"
        class="color"
        :class="'dark-' + color"
        :key="color"
        color
        v-for="color in colorOne"
      ></div>
      <div
        @click="switchColor(color)"
        class="color"
        :class="'dark-' + color"
        :key="color"
        color
        v-for="color in colorTwo"
      ></div>
    </div>
    <h3>Attachments</h3>
    <button @click="addChecklist" class="btn-add-check-list">Add</button>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
  name: '',
  data() {
    return {
      color: null,
      colorOne: ['green', 'yellow', 'orange', 'red', 'purple'],
      colorTwo: ['blue', 'sky', 'lime', 'pink', 'black'],
    }
  },
  methods: {
    switchColor(color) {
      this.color = 'dark-' + color
      this.$emit('saveTask', { key: 'cover', newVal: this.color })
    },
  },
  computed: {
    isGray() {
      return !this.color ? { backgroundColor: '#091e4240' } : ''
    },
  },
  created() {
  },
  components: {},
}
</script>
