<template>
  <div class="label-editor">
    <div class="label-container">
      <div :class="this.labelToEdit.color" class="label-tag-preview label-tag">{{ labelToEdit.title }}</div>
    </div>
    {{ labelToEdit }}
    <h3>Title</h3>
    <input v-model="this.labelToEdit.title" class="title-input" type="text" />
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
    }
  },
  methods: {
    save() {
      this.$emit('updateLabel', { ...this.labelToEdit })
      this.$emit('switchDynamicCmp')
    },
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
