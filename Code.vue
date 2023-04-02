<script>
export default {
  methods: {

    // TaskDetails Component
    updateEntityVal({ key, val }) {
      let activity
      const valToChange = JSON.parse(JSON.stringify(this.task[key]))
      const itemId = val.id ?? val
      // finds the item index and pushes or removes
      const idx = valToChange.findIndex((item) => item.id === itemId)
      if (idx === -1) {
        valToChange.push(val)
        activity = ['added', `${key.slice(0, -1)}`, 'to', this.task.title]
      } else {
        valToChange.splice(idx, 1, val)
      }
      this.saveTask({ key, newVal: valToChange, activity })
    },

    // Task Activities Component
    addComment() {
      this.$emit('updateEntityVal', { key: 'comments', val: this.newComment })
      this.newComment = boardService.getEmptyComment()
      this.isOnEdit = false
    },
  },
}
</script>
