  <script>
  export default {
    methods: {
      // TaskDetails Component
      updateEntityVal({ key, val }) {
        let activity
        const entityValues = JSON.parse(JSON.stringify(this.task[key]))
        
        // Differentiate between two types of arrays
        // an array of objects and an array of IDs
        const itemId = val.id ? val.id : val
        const idx = entityValues.findIndex((item) => item.id === itemId)
        if (idx === -1) {
          entityValues.push(val)
          activity = ['added', `${key.slice(0, -1)}`, 'to', this.task.title]
        } else {
          entityValues.splice(idx, 1, val)
          activity = ['updated', `${key.slice(0, -1)}`, 'from', this.task.title]
        }
        this.saveTask({ key, newVal: entityValues, activity })
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
