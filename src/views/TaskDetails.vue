<template>
  <section @drop.prevent="handleFile"  @dragover.prevent="this.isDragover = true" class="task-details">
    <div class="task-details-container">
      <div v-if="this.isDragover" class="task-darg-over">Drop files to upload.</div>
      <div v-if="!!this.task.cover" :class="this.task.cover" class="task-details-cover">
        <button class="btn-card-cover" @click="toggleModal('CoverPicker')"><span></span>Cover</button>
      </div>
      <RouterLink :to="'/board/' + boardId" :class="(!!this.task.cover)?'cover':''" class="close"></RouterLink>
      <div class="header">
        <div class="title icon-card">
          <textarea @blur="saveTask" ref="textarea" v-model="task.title" @keydown.enter.prevent="onEnter"></textarea>
        </div>
        <p>in list {{ groupTitle }}</p>
      </div>
      <div class="main-content">
        <TaskHeadTags @openModal="toggleModal" :task="task" @toggleKey="toggleKey" />
        <TaskDescription @saveDescription="saveTask" :taskDescription="task.description" />
        <TaskAttachments :taskAttachments="task.attachments" />
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
        <!-- <button class="btn-link member"><span> Join</span></button> -->
        <h3>Add to card</h3>

        <button class="btn-link member" @click="toggleModal('MemberPicker')"><span> Members</span></button>
        <button class="btn-link label" @click="toggleModal('LabelPicker')"><span> Labels</span></button>
        <button class="btn-link checklist" @click="toggleModal('ChecklistPicker')"><span> Checklist</span></button>
        <button class="btn-link clock" @click="toggleModal('DatePicker')"><span> Dates</span></button>
        <button class="btn-link attachment" @click="toggleModal('AttachmentPicker')"><span> Attachment</span></button>
        <button class="btn-link card-cover" @click="toggleModal('CoverPicker')"><span> Cover</span></button>
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
        @removeEntityVal="removeEntityVal"
        @switchDynamicCmp="toggleModal"
        @updateLabel="updateLabel"
        @removeLabel="removeLabel"
        @addChecklist="addChecklist"
        @saveTask="saveTask"
      />
    </div>
  </section>
</template>

<script>
import { boardService } from '../services/board.service.local'
// import GroupList from '../cmps/GroupList.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { svgService } from '../services/svg.service.js'
import TaskDescription from '../cmps/TaskDetails/TaskDescription.vue'
import TaskAttachments from '../cmps/TaskDetails/TaskAttachments.vue'
import TaskChecklist from '../cmps/TaskDetails/TaskChecklist.vue'
import ModalPicker from '../cmps/ModalPicker.vue'
import TaskHeadTags from '../cmps/TaskDetails/TaskHeadTags.vue'
import { utilService } from '../services/util.service'
import { uploadService } from '../services/upload.service'

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
      isDragover: false,
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
    groupTitle() {
      const group = this.watchedBoard.groups.find((group) => group.id === this.groupId)
      return group.title
    },
    taskId() {
      const { taskId } = this.$route.params
      return taskId
    },
    getTaskFromStore() {
      return JSON.parse(JSON.stringify(this.$store.getters.currTask))
    },
    // info() {
    //   return {
    //     isWatch: this.task.isWatch,
    //     labels: this.task.labels,
    //     members: this.task.members,
    //     dueDate: this.task.dueDate,
    //   }
    // },
    watchedBoard() {
      return this.$store.getters.watchedBoard
    },
    labels() {
      return this.$store.getters.labels
    },
  },
  methods: {
    async handleFile(ev) {
      this.isDragover = false
      const file = ev.dataTransfer.files[0]
      const val = await uploadService.handleFile(file)
      this.updateEntityVal({ key: 'attachments', val })
    },
    updateLabel(label) {
      const labels = JSON.parse(JSON.stringify(this.labels))
      const idx = labels.findIndex((l) => l.id === label.id)
      if (idx === -1) {
        label.id = utilService.makeId()
        labels.push(label)
      } else {
        labels.splice(idx, 1, label)
      }
      this.$store.dispatch('updateBoardEntity', { key: 'labels', val: labels })
    },
    removeLabel(labelId) {
      const labels = JSON.parse(JSON.stringify(this.labels))
      const idx = labels.findIndex((l) => l.id === labelId)
      labels.splice(idx, 1)
      this.$store.dispatch('updateBoardEntity', { key: 'labels', val: labels })
    },
    onEnter() {
      this.$refs.textarea.blur()
    },
    addChecklist(title) {
      let activity
      const task = JSON.parse(JSON.stringify(this.task))
      task.checklists.push({ title, checklist: [], id: utilService.makeId() })
      activity = ['added','checklists','to',this.task.title]
      this.saveTask({ key: 'checklists', newVal: task.checklists, activity })
      this.toggleModal()
    },
    removeChecklist(title) {
      let activity
      const task = JSON.parse(JSON.stringify(this.task))
      const idx = task.checklists.findIndex((list) => list.title === title)
      task.checklists.splice(idx, 1)
      activity = ['removed','checklists','from',this.task.title]
      this.saveTask({ key: 'checklists', newVal: task.checklists, activity })
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
      let activity
      const task = JSON.parse(JSON.stringify(this.task))
      // var isObj = val.id
      const itemId = val.id ?? val
      // finds the item index and pushes or removes
      const idx = task[key].findIndex((item) => item.id === itemId)
      if (idx === -1) {
        task[key].push(val)
        activity = ['added',`${key.slice(0, -1)}`,'to',this.task.title]
      } else {
        task[key].splice(idx, 1, val)
        activity = []

      }
      this.saveTask({ key, newVal: task[key], activity })
    },
    removeEntityVal({ key, val }) {
      let activity
      const task = JSON.parse(JSON.stringify(this.task))
      let idx
      if (val.id) {
        idx = task[key].findIndex((item) => item.id === val.id)
      } else {
        idx = task[key].findIndex((id) => id === val)
      }
      task[key].splice(idx, 1)
      activity = ['removed',`${key.slice(0, -1)}`,'from',this.task.title]
      this.saveTask({ key, newVal: task[key], activity })
    },
    async saveTask({ key, newVal, activity }) {
      if(!activity) activity = ['added',key ,'from',this.task.title]
      const task = JSON.parse(JSON.stringify(this.task))
      task[key] = newVal
      const groupId = this.groupId
      try {
        this.$store.dispatch({ type: 'saveTask', groupId, task, activity })
        showSuccessMsg('Task added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add Task')
      }
    },
    toggleModal(cmpType) {
      let isModalOpen = true
      let type = cmpType

      if (this.modal.type === cmpType || !cmpType) {
        isModalOpen = false
        type = null
      }
      this.modal.isModalOpen = isModalOpen
      this.modal.type = type
    },
    toggleKey(key) {
      const newVal = !this.task[key]
      let activity = [newVal,key,'to',this.task.title]
      this.saveTask({ key, newVal, activity })
    },
  },
  components: {
    TaskDescription,
    ModalPicker,
    TaskHeadTags,
    TaskChecklist,
    TaskAttachments,
  },
}
</script>
