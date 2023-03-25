<template>
  <article class="task-Checklist">
    <header>
      <h1 class="title"><span class="icon"></span> {{ list.title }}</h1>
      <button @click="remove" class="btn-remove-checklist">Delete</button>
    </header>
    <div class="checklist-item" v-for="(item, idx) in list.checklist" :key="idx">
      <span @click="toggleCheck(idx)" class="check-box" :class="item.isChecked ? 'checked' : ''"></span>
      <h3 :class="item.isChecked ? 'checked' : ''">{{ item.title }}</h3>
    </div>

    <button v-if="!isEdit" class="btn-add-item" @click="openEdit">Add an item</button>

    <div v-if="isEdit" class="checklist-editor">
      <input ref="input" v-model="itemToAdd.title" type="text" />

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
      itemToAdd: {isChecked:false, title: ''},
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
      const val = JSON.parse(JSON.stringify(this.list))
      this.$emit('updateEntityVal', { key: 'checklists', val })
    },
    toggleCheck(idx) {
      this.list.checklist[idx].isChecked = !this.list.checklist[idx].isChecked
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>
