<template>
  <RouterLink style="text-decoration: none" :to="'/board/' + boardId + '/' + this.groupId + '/' + task.id">
    <div v-if="task.cover" :class="task.cover" class="task-preview-cover"></div>
    <div :class="task.cover ? 'with-cover' : ''" class="task-preview">
      <div v-if="task.labels?.length" class="task-preview-labels">
        <div
          v-for="label in labels"
          :key="label.id"
          :class="[label.color, isLabelFullDisplay ? 'label-tag' : '']"
          class="task-preview-label"
          @click.prevent="toggleLabelFullDisplay"
        >
          {{ isLabelFullDisplay ? label.title : '' }}
        </div>
      </div>
      <h2 class="task-preview-title">{{ task.title }}</h2>
      <div v-if="showBadges" class="task-preview-footer">
        <div class="action-badges">
          <!-- <div v-if="task.members.length" class="badge-watch"></div> -->
          <div v-if="task.description" class="badge-description"></div>
          <!-- <div class="badge-attachments">1</div> -->
          <div v-if="task.checklists?.length" class="badge-checklist">
            {{ checklist.checkedItems }}/{{ checklist.totalItems }}
          </div>
          <div
            :class="getDateClass"
            @click.prevent="toggleKey('isComplete')"
            v-if="task.dueDate"
            class="badge-date flex align-center"
          >
            <span></span>{{ getDate }}
          </div>
        </div>

        <TaskMember :members="task.members" />
      </div>
    </div>
  </RouterLink>

  <!-- <RouterView /> -->
</template>

<script>
import TaskMember from '../TaskMember.vue'
import { utilService } from '../../services/util.service.js'

export default {
  name: 'TaskPreview',
  props: {
    task: {
      type: Object,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    toggleKey(key) {
      const newVal = !this.task[key]
      this.saveTask({ key, newVal })
    },
    async saveTask({ key, newVal }) {
      const task = JSON.parse(JSON.stringify(this.task))
      task[key] = newVal
      const groupId = this.groupId
      try {
        this.$store.dispatch({ type: 'saveTask', groupId, task })
      } catch (err) {
        console.log(err)
      }
    },
    toggleLabelFullDisplay() {
      this.$store.dispatch('updateBoardEntity', { key: 'isLabelFullDisplay', val: !this.isLabelFullDisplay })
    },
  },
  computed: {
    showBadges() {
      if (this.task.description || this.task.checklists?.length || this.task.dueDate || this.task.members?.length)
        return true
    },
    boardId() {
      return this.$store.getters.watchedBoardId
    },
    getDateClass() {
      const msDay = 1000 * 60 * 60 * 24
      const diff = this.task.dueDate - Date.now()
      return {
        complete: this.task.isComplete,
        closeToDate: diff < msDay && diff > 0,
        overdue: diff < 0,
      }
    },
    board() {
      return this.$store.getters.watchedBoard
    },
    checklist() {
      const checklists = this.task.checklists
      const stats = {
        totalItems: 0,
        checkedItems: 0,
      }
      const result = checklists.reduce((accumulator, current) => {
        current.checklist.forEach((item) => {
          accumulator.totalItems++
          if (item.isChecked) {
            accumulator.checkedItems++
          }
        })

        return accumulator
      }, stats)

      return result
    },
    getDate() {
      return utilService.getDate(this.task.dueDate)
    },
    labels() {
      return this.task.labels.map((id) => this.$store.getters.getLabelsById(id))
    },
    isLabelFullDisplay() {
      return this.$store.getters.isLabelFullDisplay
    },
  },
  created() {},
  components: {
    TaskMember,
  },
}
</script>
