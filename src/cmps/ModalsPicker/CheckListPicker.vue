<template>
  <div class="check-list-picker">
    <h3>Title</h3>
    <input ref="mainInput" class="search-input" v-model="title" type="text" placeholder="Add check list title here" />

    <button @click="addChecklist" class="btn-add-check-list">Add</button>
  </div>
</template>

<script>
export default {
  props: {},
  name: '',
  data() {
    return {
      title: 'Checklist',
    }
  },
  methods: {
    addChecklist() {
      this.$emit('addChecklist', this.title)
      this.title = 'checklist'
    },
  },
  computed: {},
  created() {
    this.$nextTick(() => {
      this.$refs.mainInput.focus()
      this.$refs.mainInput.select()
    })
  },
  components: {},
}
</script>
