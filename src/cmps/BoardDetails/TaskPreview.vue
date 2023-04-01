<template>
  <RouterLink style="text-decoration: none" :to="'/board/' + boardId + '/' + this.groupId + '/' + task.id">
    <div ref="taskPreview" class="tp">
      <div v-if="task.cover?.color" :style="imgCover" :class="task.cover.color" class="task-preview-cover"></div>
      <div :class="[task.cover ? 'with-cover' : '', task.cover?.isFull ? task.cover.color : '']" @click.right.prevent="toggleEdit" class="task-preview">
        <Draggable
          class="dragarea-task-preview"
          ghost-class="ghost-task-member"
          v-model="memberList"
          group="members"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              {{ element.name }}
            </div>
          </template>
        </Draggable>
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
        <div class="task-body">

          <h2 class="task-preview-title">{{ task.title }}</h2>
          <button class="fast-edit-btn" @click.prevent="toggleEdit">
            <i className="icon" v-html="getSvg('edit')"></i>
          </button>
        </div>
        <div v-if="showBadges" class="task-preview-footer">
          <div class="action-badges">
            <!-- <div v-if="task.members.length" class="badge-watch"></div> -->
            <div v-if="task.description" class="badge-description"></div>
            <div v-if="task.comments.length" class="badge-comment"><span>{{ task.comments.length }}</span></div>
            <div v-if="task.attachments?.length" class="badge-attachments">
              <span>{{ task.attachments.length }}</span>
            </div>
            <div v-if="task.checklists?.length" class="badge-checklist" :class="getChecklistClass">
              <span> {{ checklist.checkedItems }}/{{ checklist.totalItems }} </span>
            </div>
            <div
              :class="getDateClass"
              @click.prevent="toggleKey('isComplete')"
              v-if="task.dueDate"
              class="badge-date flex align-center"
            >
              <span class="clock"></span><span class="date">{{ getDate }}</span>
            </div>
          </div>
          <TaskMember :members="task.members" />
        </div>
      </div>
    </div>
  </RouterLink>

  <!-- <RouterView /> -->
</template>

<script>
import TaskMember from '../TaskMember.vue'
import { utilService } from '../../services/util.service.js'
import Draggable from 'vuedraggable'
import { svgService } from '../../services/svg.service'
import { eventBus } from '../../services/event-bus.service'

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
    return {
      isOnFastEdit: false,
    }
  },
  methods: {
    toggleKey(key) {
      const newVal = !this.task[key]
      let activity = [newVal, key, 'to', this.task.title]
      this.saveTask({ key, newVal, activity })
    },
    async saveTask({ key, newVal, activity }) {
      const task = JSON.parse(JSON.stringify(this.task))
      task[key] = newVal
      const groupId = this.groupId
      try {
        this.$store.dispatch({ type: 'saveTask', groupId, task, activity })
      } catch (err) {
        console.log(err)
      }
    },
    toggleLabelFullDisplay() {
      this.$store.dispatch('updateBoardEntity', { key: 'isLabelFullDisplay', val: !this.isLabelFullDisplay })
    },
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
    setCurrTask() {
      console.log('boardId:', this.boardId)
      console.log('groupId:', this.groupId)
      console.log('this.task:', this.task)
      console.log('taskId:', this.task.id)
      this.$store.commit({
        type: 'setCurrTask',
        boardId: this.boardId,
        groupId: this.groupId,
        taskId: this.task.id,
      })
    },
    toggleEdit() {
      this.setCurrTask()
      const { x, y } = this.$refs.taskPreview.getBoundingClientRect()
      eventBus.emit('onFastEdit', {x, y})
    },
  },
  computed: {
    showBadges() {
      if (
        this.task.description ||
        this.task.checklists?.length ||
        this.task.dueDate ||
        this.task.members?.length ||
        this.task.attachments?.length
      )
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
    getChecklistClass() {
      console.log('checklist.checkedItems:', this.checklist.checkedItems)
      console.log('checklist.totalItems:', this.checklist.totalItems)
      return {
        complete: (this.checklist.checkedItems === this.checklist.totalItems) & (this.checklist.totalItems !== 0),
      }
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
    imgCover() {
      return this.task.cover?.url
        ? { backgroundImage: `url(${this.task.cover.url})`, backgroundColor: this.task.cover.color, height: '200px' }
        : ''
    },
    memberList: {
      get() {
        return []
      },
      set(member) {
        member = member[member.length - 1]
        let activity = ['enter', 'member', 'to', this.task.title]
        const members = [...this.task.members]
        if (members.find((m) => m === member)) return
        members.push(member)
        this.saveTask({ key: 'members', newVal: members, activity })
      },
    },
  },
  created() {},
  components: {
    TaskMember,
    Draggable,
  },
}
</script>
