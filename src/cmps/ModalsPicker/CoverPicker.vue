<template>
  <div class="cover-picker">
    <h3>Size</h3>
    <div class="cover-preview-container">
      <div :style="isGray" :class="this.color" class="cover-preview"></div>
      <div :style="isGray" :class="this.color" class="cover-preview"></div>
    </div>
    <button @click="switchColor(null)" class="btn-cover-picker">Remove cover</button>
    <h3>Colors</h3>
    <div class="color-table">
      <div @click="switchColor(color)" class="color" :class="color" :key="color" color v-for="color in colorOne"></div>
      <div @click="switchColor(color)" class="color" :class="color" :key="color" color v-for="color in colorTwo"></div>
    </div>
    <h3>Attachments</h3>
    <button @click="addChecklist" class="btn-cover-picker">Add</button>
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
      colorOne: ['dark-green', 'dark-yellow', 'dark-orange', 'dark-red', 'dark-purple'],
      colorTwo: ['dark-blue', 'dark-sky', 'dark-lime', 'dark-pink', 'dark-black'],
    }
  },
  methods: {
    switchColor(color) {
      if (this.color === color) return
      this.color = color
      this.$emit('saveTask', { key: 'cover', newVal: this.color })
    },
  },
  computed: {
    isGray() {
      return !this.color ? { backgroundColor: '#091e4240' } : ''
    },
  },
  created() {},
  components: {},
}
</script>
