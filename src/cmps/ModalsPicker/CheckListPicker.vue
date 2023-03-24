<template>
  <div class="check-list-picker">
    <h3>Title</h3>
    <input class="search-input" v-model="title" type="text" placeholder="Add check list title here" />

    <button @click="addChecklist" class="btn-add-check-list">Add</button>
  </div>
</template>

<script>
export default {
  props: {},
  name: '',
  data() {
    return {
      title: '',
    }
  },
  methods: {
    addChecklist() {
      this.$emit('addChecklist', this.title)
      this.title = ''
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>
