<template>
  <div class="label-editor">
    <div class="label-container">
      <div :class="this.labelToEdit.color" class="label-tag-preview label-tag">{{ labelToEdit.title }}</div>
    </div>
    <h3>Title</h3>
    <input v-model="this.labelToEdit.title" class="title-input" type="text" />
    <h3>Select a color</h3>
    <div class="color-table">
      <div @click="switchColor('light-'+color)" class="color" :class="'light-'+color" :key="color" color v-for="color in colorOne"></div>
      <div @click="switchColor(color)" class="color" :class="color" :key="color" color v-for="color in colorOne"></div>
      <div @click="switchColor('dark-'+color)" class="color" :class="'dark-'+color" :key="color" color v-for="color in colorOne"></div>
      
      <div @click="switchColor('light-'+color)" class="color" :class="'light-'+color" :key="color" color v-for="color in colorTwo"></div>
      <div @click="switchColor(color)" class="color" :class="color" :key="color" color v-for="color in colorTwo"></div>
      <div @click="switchColor('dark-'+color)"  class="color" :class="'dark-'+color" :key="color" color v-for="color in colorTwo"></div>
    </div>
    <hr />
    <div class="flex space-between">
      <button @click="save" class="btn-save">Save</button>
      <button class="btn-cancel">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  name: '',
  data() {
    return {
      labelToEdit: null,
      colorOne: ['green', 'yellow', 'orange', 'red', 'purple'],
      colorTwo: ['blue', 'sky', 'lime', 'pink', 'black']
    }
  },
  methods: {
    save() {
      this.$emit('updateLabel', { ...this.labelToEdit })
      this.$emit('switchDynamicCmp')
    },
    switchColor(color){
      this.labelToEdit.color = color
    }
  },
  computed: {
    getLabel() {
      return { ...this.$store.getters.getLabelsById(this.info.labelId) }
    },
  },
  created() {
    this.labelToEdit = this.getLabel
  },
  components: {},
}
</script>
