<template>
  <div class="task-head-tags">
    <div v-if="members?.length">
      <h3 class="title">Members</h3>
      <div class="head-members">
        <img
          @click="$emit('openModal', 'MemberPicker', $event)"
          v-for="member in members"
          :src="member.imgUrl"
          class="member-profile"
        />
      </div>
    </div>
    <div v-if="labels?.length">
      <h3 class="title">Labels</h3>
      <div class="head-labels">
        <div @click="$emit('openModal', 'LabelPicker', $event)" v-for="label in labels" class="label-tag" :class="label.color">
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
        <button :class="getCheckedClass" @click="$emit('toggleKey', 'isComplete', $event)" class="btn-is-complete">
          <span></span>
        </button>
        <button @click="$emit('openModal', 'DatePicker', $event)" class="notifications">
          {{ getDate }}<span v-if="getDateLabel" :class="getDateClass" class="date-label">{{ getDateLabel }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { utilService } from '../../services/util.service.js'

export default {
  name: 'TaskHeadTags',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  computed: {
    labels() {
      return this.$store.getters.labels.filter((label) => {
        if (this.task.labels.includes(label.id)) return label
      })
    },
    getDate() {
      const dueDate = new Date(this.task.dueDate)
      let month = ''
      if (this.isToday) month = 'today'
      else if (this.isTomorrow) month = 'tomorrow'
      else month = utilService.getDate(this.task.dueDate)
      const time = dueDate.toLocaleTimeString('en-US').split(' ')
      var timeToShow = time[0].split(':').splice(0,2).join(':')
      return  `${month} at ${timeToShow} ${time[1]}`
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
    getCheckedClass() {
      return this.task.isComplete ? 'checked' : ''
    },
    getDateClass() {
      const msDay = 1000 * 60 * 60 * 24
      const dueDate = new Date(this.task.dueDate)
      const diff = dueDate - Date.now()
      return {
        complete: this.task.isComplete,
        closeToDate: diff < msDay && diff > 0,
        overdue: diff < 0,
      }
    },
    getDateLabel() {
      const msDay = 1000 * 60 * 60 * 24
      const dueDate = new Date(this.task.dueDate)
      const diff = dueDate - Date.now()
      if(this.task.isComplete) return 'complete'
      if(diff < msDay && diff > 0) return 'due soon'
      if(diff < 0) return 'overdue'
      return ''
    },
  },
  created() {},
  components: {},
}
</script>
