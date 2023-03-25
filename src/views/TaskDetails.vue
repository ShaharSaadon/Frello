<template>
  <section class="task-details">
    <main class="container">
      <RouterLink :to="'/board/' + boardId" class="close"></RouterLink>
      <div class="header">
        <div class="title icon-card">
          <textarea @blur="saveTask" ref="textarea" v-model="task.title" @keydown.enter.prevent="onEnter"></textarea>
        </div>
        <p>in list {{ task.title }}</p>
      </div>
      <div class="main-content">
        <TaskHeadTags :info="info" @toggleWatch="toggleWatch" />
        <TaskDescription @saveDescription="saveTask" :taskDescription="task.description" />
        <TaskChecklist
          :key="list.title"
          v-for="list in task.checklists"
          :taskChecklist="list"
          @removeChecklist="removeChecklist"
          @updateEntityVal="updateEntityVal"
        />
      </div>
      <div class="sidebar flex">
        <!-- <div class="flex space-between">
          <h3>Suggested</h3>
          <button class="gear"></button>
        </div> -->
        <button class="btn-link member"><span> Join</span></button>
        <h3>Add to card</h3>

        <button class="btn-link member" @click="toggleModal('MemberPicker')"><span> Members</span></button>
        <button class="btn-link label" @click="toggleModal('LabelPicker')"><span> Labels</span></button>
        <button class="btn-link checklist" @click="toggleModal('ChecklistPicker')"><span> Checklist</span></button>
        <button class="btn-link clock"><span> Dates</span></button>
        <button class="btn-link attachment"><span> Attachment</span></button>
        <button class="btn-link card-cover"><span> Cover</span></button>
        <!-- <button class="button-link"> Custom Fields</button> -->
        <h3>Actions</h3>
        <button @click="removeTask" class="btn-link archive">
          <span> Archive</span>
        </button>
      </div>
      <ModalPicker
        v-if="modal.isModalOpen"
        :type="modal.type"
        @closeModal="toggleModal"
        @updateEntityVal="updateEntityVal"
        @addChecklist="addChecklist"
        @toLabelEditor="toggleModal('LabelEditor')"
        @updateLabel="updateLabel"
      />
    </main>
  </section>
</template>

<script>
// import {boardService} from '../services/board.service'
// import GroupList from '../cmps/GroupList.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { svgService } from '../services/svg.service.js'
import TaskDescription from '../cmps/TaskDescription.vue'
import TaskChecklist from '../cmps/TaskChecklist.vue'
import ModalPicker from '../cmps/ModalPicker.vue'
import TaskHeadTags from '../cmps/TaskHeadTags.vue'
import { utilService } from '../services/util.service'

export default {
  watch: {
    taskId: {
      handler() {
        if (this.taskId) {
          this.$store.commit({
            type: 'setCurrTask',
            boardId: this.boardId,
            groupId: this.groupId,
            taskId: this.taskId,
          })
        }
      },
      immediate: true,
    },
    getTaskFromStore: {
      handler() {
        if (this.getTaskFromStore) {
          this.task = this.getTaskFromStore
        }
      },
      immediate: true,
    },
    watchedBoard: {
      handler(changed) {
        console.log(changed)
        if (this.watchedBoard) {
          console.log('board has changed')
          this.task = this.getTaskFromStore
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      modal: {
        type: '',
        isModalOpen: false,
      },
      task: null,
    }
  },
  computed: {
    boardId() {
      return this.$store.getters.watchedBoardId
    },
    groupId() {
      const { groupId } = this.$route.params
      return groupId
    },
    taskId() {
      const { taskId } = this.$route.params
      return taskId
    },
    getTaskFromStore() {
      return JSON.parse(JSON.stringify(this.$store.getters.currTask))
    },
    info() {
      return {
        isWatch: this.task.isWatch,
        labels: this.task.labels,
        members: this.task.members,
      }
    },
    watchedBoard() {
      return this.$store.getters.watchedBoard
    },
  },
  methods: {
    onEnter() {
      this.$refs.textarea.blur()
    },
    addChecklist(title) {
      const task = JSON.parse(JSON.stringify(this.task))
      task.checklists.push({ title, checklist: [], id: utilService.makeId() })
      this.saveTask({ key: 'checklists', newVal: task.checklists })
      this.toggleModal()
    },
    removeChecklist(title) {
      const task = JSON.parse(JSON.stringify(this.task))
      const idx = task.checklists.findIndex((list) => list.title === title)
      task.checklists.splice(idx, 1)
      this.saveTask({ key: 'checklists', newVal: task.checklists })
    },
    async removeTask() {
      try {
        this.$store.dispatch({
          type: 'removeTask',
          groupId: this.groupId,
          taskId: this.task.id,
        })
        showSuccessMsg('Task Removed')
        this.$router.push('/board/' + this.boardId)
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add Task')
      }
    },
    updateEntityVal({ key, val }) {
      const task = JSON.parse(JSON.stringify(this.task))
      var idx
      if (key === 'checklists') {
        idx = task[key].findIndex((list) => list.id === val.id)
        if (idx === -1) {
          task[key].push(val)
        } else {
          task[key].splice(idx, 1, val)
        }
        this.saveTask({ key, newVal: task[key] })
        return
      }
      if (key === 'members') {
        idx = task[key].findIndex((id) => id === val)
      } else if (key === 'labels') {
        idx = task.labels.findIndex((label) => label.color === val.color)
      }
      if (idx === -1) {
        task[key].push(val)
      } else {
        task[key].splice(idx, 1)
      }
      this.saveTask({ key, newVal: task[key] })
    },
    async saveTask({ key, newVal }) {
      const task = JSON.parse(JSON.stringify(this.task))
      task[key] = newVal
      const groupId = this.groupId
      try {
        this.$store.dispatch({ type: 'saveTask', groupId, task })
        showSuccessMsg('Task added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add Task')
      }
    },
    toggleModal(cmpType) {
      if (this.modal.type === cmpType || !cmpType) {
        this.modal.isModalOpen = false
        this.modal.type = null
      } else {
        this.modal.isModalOpen = true
        this.modal.type = cmpType
      }
    },
    toggleWatch() {
      const newVal = !this.task.isWatch
      this.saveTask({ key: 'isWatch', newVal })
    },
  },
  components: {
    TaskDescription,
    ModalPicker,
    TaskHeadTags,
    TaskChecklist,
  },
}
</script>
