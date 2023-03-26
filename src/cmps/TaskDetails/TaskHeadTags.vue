<template>
  <div class="task-head-tags">
    <div v-if="members?.length">
      <h3 class="title">Members</h3>
      <div class="head-members">
        <img v-for="member in members" :src="member.imgUrl" class="member-profile" />
      </div>
    </div>
    <div v-if="labels?.length">
      <h3 class="title">Labels</h3>
      <div class="head-labels">
        <div v-for="label in labels" class="label-tag" :class="label.color">
          {{ label.title }}
        </div>
      </div>
    </div>
    <div>
      <h3 class="title">Notifications</h3>
      <button @click="$emit('toggleKey', 'isWatch')" class="notifications">
        <span class="eye-icon"></span> {{ task.isWatch ? 'Watching' : 'Watch' }}
      </button>
    </div>
    <div v-if="task?.dueDate">
      <h3 class="title">Due date</h3>
      <div class="date-tag flex">
        <button :class="getCheckedClass" @click="$emit('toggleKey', 'isComplete')" class="btn-is-complete"><span></span></button>
        <button class="notifications">{{ getDate }}<span v-if="task.isComplete" class="complete-label">complete</span></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskHeadTags',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }
  },
  methods: {},
  computed: {
    labels() {
      return this.task.labels
    },
    getDate() {
      const dueDate = new Date(this.task.dueDate)
      let dateStr = ''
      let month = ''
      let day = ''
      if (this.isToday) month = 'today'
      else if (this.isTomorrow) month = 'tomorrow'
      else {
        month = this.months[dueDate.getMonth()]
        day = dueDate.getDate()
      }
      const time = dueDate.toLocaleTimeString('en-US')
      const date = `${month} ${day}`
      dateStr = `${date} at ${time.slice(0, 4)} ${time.slice(-2)}`
      return dateStr
    },
    isToday() {
      const date = new Date(this.task.dueDate)
      const today = new Date()
      return (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
      )
    },
    isTomorrow() {
      const date = new Date(this.task.dueDate)
      const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24)
      return (
        date.getDate() == tomorrow.getDate() &&
        date.getMonth() == tomorrow.getMonth() &&
        date.getFullYear() == tomorrow.getFullYear()
      )
    },
    members() {
      return this.$store.getters.watchedBoard.members.filter((m) => {
        if (this.task.members?.includes(m._id)) return m
      })
    },
    getCheckedClass(){
      return this.task.isComplete? 'checked' : ''
    }
  },
  created() {},
  components: {},
}
</script>
