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
      <button @click="save" class="btn-save">
        Save
      </button>
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
  methods: {
    save(){
      this.$emit('updateEntityVal', { key: 'labels', val: { ...this.labelToEdit } })
      this.$emit('closeModal')
    }
  },
  computed: {},
  created() {},
  components: {},
}
</script>
