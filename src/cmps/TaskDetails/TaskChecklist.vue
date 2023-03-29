<template>
  <article class="task-Checklist">
    <header>
      <h1 v-if="!(this.isItemEdit === 'title')" @click="openItemEdit(list.title, 'title')" class="title">
        <span class="icon"></span> {{ list.title }}
      </h1>
      <div v-if="this.isItemEdit === 'title'" class="item-editor">
        <input @keypress.enter="save(this.list)" ref="inputEdit" v-model="this.itemToEdit" type="text" />

        <div class="add-cancel flex">
          <button @click="save(this.list)" class="btn-add">save</button>
          <button @click="isItemEdit = null" class="close-item-edit"></button>
        </div>
      </div>
      <div class="flex">
        <button
          v-if="!(isAnyChecked && this.isItemEdit === 'title')"
          @click="isUnCheckedOnly = !isUnCheckedOnly"
          class="btn-checklist"
        >
          {{ hideCheckedTitle }}
        </button>
        <button
          v-if="!(this.isItemEdit === 'title')"
          @click="$emit('removeChecklist', list.title)"
          class="btn-checklist"
        >
          Delete
        </button>
      </div>
    </header>
    <div class="progress-bar">
      <span>{{ donePercent }}%</span>
      <div class="progress-bar-container"><div class="progress-bar-percent" :style="this.stylePercent"></div></div>
    </div>
    <div class="checklist-item" v-for="(item, idx) in checklistItems" :key="idx">
      <span @click="toggleCheck(idx)" class="check-box" :class="item.isChecked ? 'checked' : ''"></span>
      <h3
        v-if="this.isItemEdit !== idx"
        @click="openItemEdit(item.title, idx)"
        :class="item.isChecked ? 'checked' : ''"
      >
        {{ item.title }}
      </h3>
      <div v-if="this.isItemEdit === idx" class="item-editor">
        <input @keypress.enter="save(item)" ref="inputEdit" v-model="this.itemToEdit" type="text" />

        <div class="add-cancel flex">
          <button @click="save(item)" class="btn-add">save</button>
          <button @click="isItemEdit = null" class="close-item-edit"></button>
        </div>
      </div>
      <span v-if="this.isItemEdit !== idx" @click.stop="removeItem(idx)" class="checklist-archive"></span>
    </div>

    <button v-if="!isEdit" class="btn-add-item" @click="openEdit">Add an item</button>

    <div v-if="isEdit" class="checklist-editor">
      <input @keypress.enter="addItem" ref="inputAdd" v-model="itemToAdd.title" type="text" />

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
      itemToAdd: { isChecked: false, title: '' },
      list: JSON.parse(JSON.stringify(this.taskChecklist)),
      isItemEdit: null,
      itemToEdit: '',
      isUnCheckedOnly: false,
    }
  },
  methods: {
    openEdit() {
      this.isEdit = true
      this.$nextTick(() => this.$refs.inputAdd.focus())
    },
    openItemEdit(txt, idx) {
      this.isItemEdit = idx
      this.itemToEdit = txt
      this.$nextTick(() => this.$refs.inputEdit.focus())
    },
    addItem() {
      if (!this.itemToAdd.title) return
      this.list.checklist.push({ ...this.itemToAdd })
      this.itemToAdd.title = ''
      this.$nextTick(() => this.$refs.inputAdd.focus())
      this.update()
    },
    removeItem(idx) {
      this.list.checklist.splice(idx, 1)
      this.update()
    },
    toggleCheck(idx) {
      this.list.checklist[idx].isChecked = !this.list.checklist[idx].isChecked
      this.update()
    },
    save(item) {
      this.isItemEdit = null
      item.title = this.itemToEdit
      this.itemToEdit = ''
      this.update()
    },
    saveTitle() {},
    update() {
      const val = JSON.parse(JSON.stringify(this.list))
      this.$emit('updateEntityVal', { key: 'checklists', val })
    },
  },
  computed: {
    donePercent() {
      const total = this.list.checklist.length
      if (!total) return 0
      const percent = this.list.checklist.filter((item) => item.isChecked).length
      return Math.round((percent / total) * 100)
    },
    stylePercent() {
      if (this.donePercent === 100) return { backgroundColor: '#61bd4f', width: this.donePercent + '%' }
      return { width: this.donePercent + '%' }
    },
    checklistItems() {
      return this.list.checklist.filter((item) => {
        return this.isUnCheckedOnly ? !item.isChecked : true
      })
    },
    isAnyChecked() {
      return this.list.checklist.find((item) => item.isChecked)
    },
    hideCheckedTitle() {
      const nomOfChecked = this.list.checklist.filter((item) => item.isChecked).length
      return this.isUnCheckedOnly ? `Show checked items (${nomOfChecked})` : 'Hide checked items'
    },
  },
  created() {},
  components: {},
}
</script>
