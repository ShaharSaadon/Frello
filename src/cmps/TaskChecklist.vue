<template>
  <article class="task-Checklist">
    <header>
      <h1 class="title"><span class="icon"></span> {{ list.title }}</h1>
      <button @click="remove" class="btn-remove-checklist">Delete</button>
    </header>
    <div v-for="item in list.checklist">{{ item }}</div>

    <button v-if="!isEdit" class="btn-add-item" @click="openEdit">Add an item</button>

    <div v-if="isEdit" class="checklist-editor">
      <input ref="input" v-model="itemToAdd" type="text" />

      <div class="add-cancel flex">
        <button @click="addItem" class="btn-add">Add</button>
        <button @click="isEdit = false" class="btn-cancel">Cancel</button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'TaskPreview',
  props: {
    taskChecklist: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      itemToAdd: '',
      list: JSON.parse(JSON.stringify(this.taskChecklist)),
    }
  },
  methods: {
    openEdit() {
      this.isEdit = true
      this.$nextTick(() => this.$refs.input.focus())
    },
    addItem() {
      this.list.checklist.unshift(this.itemToAdd)
      this.itemToAdd = ''
      this.$emit('updateEntityVal', { key: 'checklist', val: this.list })
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>
