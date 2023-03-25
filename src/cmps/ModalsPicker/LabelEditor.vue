<template>
  <div class="label-editor">
    {{ labelToEdit }}
    <div class="label-container">
      <div :class="this.labelToEdit.color" class="label-tag-preview label-tag">{{ labelToEdit.title }}</div>
    </div>
    <h3>Title</h3>
    <input v-model="this.labelToEdit.title" class="title-input" type="text" />
    <hr />
    <div class="flex space-between">
      <button @click="$emit('updateLabel', { ...this.labelToEdit })" class="btn-save">Save</button>
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
      labelToEdit: this.info.label,
    }
  },
  methods: {},
  computed: {},
  created() {},
  components: {},
}
</script>
