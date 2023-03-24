<template>
  <article class="task-CheckList">
    <header>
      <h1 class="title"><span class="icon"></span> Checklist</h1>
      <button @click="remove" class="btn-remove-checklist">Delete</button>
    </header>
    <button v-if="!isEdit" class="btn-add-item" @click="openEdit">Add an item</button>

    <div v-if="isEdit" class="checklist-editor">
      <input ref="input" type="text" />

      <div class="save-cancel flex">
        <button @click="saveDescription" class="btn-save">Save</button>
        <button @click="isEdit = false" class="btn-cancel">Cancel</button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'TaskPreview',
  props: {
    taskDescription: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      isEdit: false,
      checklist: [],
    }
  },
  methods: {
    openEdit() {
      this.isEdit = true
      this.$nextTick(() => this.$refs.input.focus())
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>
