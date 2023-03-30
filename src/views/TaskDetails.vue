<template>
  <section @drop.prevent="handleFile" @dragover.prevent="this.isDragover = true" class="task-details">
    <div class="task-details-container">
      <div v-if="this.isDragover" class="task-darg-over">Drop files to upload.</div>
      <div v-if="!!this.task.cover?.color" :class="this.task.cover.color" :style="imgCover" class="task-details-cover">
        <button class="btn-card-cover" @click="toggleModal('CoverPicker', $event)"><span></span>Cover</button>
      </div>
      <RouterLink :to="'/board/' + boardId" :class="!!this.task.cover?.color ? 'cover' : ''" class="close"></RouterLink>
      <div class="header">
        <div class="title icon-card">
          <textarea @blur="saveTask" ref="textarea" v-model="task.title" @keydown.enter.prevent="onEnter"></textarea>
        </div>
        <p>in list {{ groupTitle }}</p>
      </div>
      <div class="main-content">
        <TaskHeadTags @openModal="toggleModal" :task="task" @toggleKey="toggleKey" />
        <TaskDescription @saveDescription="saveTask" :taskDescription="task.description" />
        <TaskAttachments
          @edit="(ev, id) => toggleModal('AttachmentEditor', ev, id)"
          @removeEntityVal="removeEntityVal"
          @saveTask="saveTask"
          :taskAttachments="task.attachments"
          :taskCover="task.cover"
        />
        <TaskChecklist
          :key="list.title"
          v-for="list in task.checklists"
          :taskChecklist="list"
          @removeChecklist="removeChecklist"
          @updateEntityVal="updateEntityVal"
        />
        <TaskActivities
          :taskId="task.id"
          :taskTitle="task.title"
          @updateEntityVal="updateEntityVal"
          :taskComments="task.comments"
        />
      </div>
      <div class="sidebar flex">
        <!-- <div class="flex space-between">
          <h3>Suggested</h3>
          <button class="gear"></button>
        </div> -->
        <!-- <button class="btn-link member"><span> Join</span></button> -->
        <h3>Add to card</h3>
        <button
          class="btn-link"
          :class="cmp.class"
          @click="toggleModal(cmp.cmpType, $event)"
          v-for="cmp in cmps"
          :key="cmp.title"
        >
          <span>{{ cmp.title }}</span>
        </button>

        <!-- <button class="button-link"> Custom Fields</button> -->
        <h3>Actions</h3>
        <button @click="removeTask" class="btn-link archive">
          <span> Archive</span>
        </button>
      </div>
      <ModalPicker
        v-if="modal.isModalOpen"
        :modal="modal"
        @closeModal="toggleModal"
        @updateEntityVal="updateEntityVal"
        @removeEntityVal="removeEntityVal"
        @switchDynamicCmp="toggleModal"
        @updateLabel="updateLabel"
        @removeLabel="removeLabel"
        @addChecklist="addChecklist"
        @saveTask="saveTask"
        :style="modalPos"
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
import TaskActivities from '../cmps/TaskDetails/TaskActivities.vue'
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
          this.task = JSON.parse(JSON.stringify(this.getTaskFromStore))
        }
      },
      immediate: true,
    },
    // watchedBoard: {
    //   handler(changed) {
    //     if (this.watchedBoard) {
    //       this.task = this.getTaskFromStore
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  data() {
    return {
      modal: {
        type: '',
        isModalOpen: false,
        pos: { top: null, left: null },
      },
      cmps: [
        { class: 'member', cmpType: 'MemberPicker', title: ' Members' },
        { class: 'label', cmpType: 'LabelPicker', title: ' Labels' },
        { class: 'checklist', cmpType: 'ChecklistPicker', title: ' Checklist' },
        { class: 'clock', cmpType: 'DatePicker', title: ' Dates' },
        { class: 'attachment', cmpType: 'AttachmentPicker', title: ' Attachment' },
        { class: 'card-cover', cmpType: 'CoverPicker', title: ' Cover' },
      ],
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
      return this.$store.getters.currTask
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
    imgCover() {
      return this.task.cover?.url
        ? { backgroundImage: `url(${this.task.cover.url})`, backgroundColor: this.task.cover.color, height: '160px' }
        : ''
    },
    // setBottom({height}) {
    //   console.log("height: ", height);
    //   this.modal.pos.top = window.visualViewport.height - height
    // },
    modalPos() {
      let x = this.modal.pos.left
      let y = this.modal.pos.top
      const { width } = window.visualViewport
      if (width - x < 304) x = width - 308
      if (y > 350 || this.modal.type === 'DatePicker' || this.modal.type === 'LabelPicker') y = 48
      return { top: y + 'px', left: x + 'px' }
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
      activity = ['added', 'checklists', 'to', this.task.title]
      this.saveTask({ key: 'checklists', newVal: task.checklists, activity })
      this.toggleModal()
    },
    removeChecklist(title) {
      let activity
      const task = JSON.parse(JSON.stringify(this.task))
      const idx = task.checklists.findIndex((list) => list.title === title)
      task.checklists.splice(idx, 1)
      activity = ['removed', 'checklists', 'from', this.task.title]
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
        activity = ['added', `${key.slice(0, -1)}`, 'to', this.task.title]
      } else {
        task[key].splice(idx, 1, val)
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
      activity = ['removed', `${key.slice(0, -1)}`, 'from', this.task.title]
      this.saveTask({ key, newVal: task[key], activity })
    },
    async saveTask({ key, newVal, activity }) {
      if (!activity) activity = ['added', key, 'from', this.task.title]
      const task = JSON.parse(JSON.stringify(this.task))
      task[key] = newVal
      const groupId = this.groupId
      try {
        this.$store.dispatch({ type: 'saveTask', groupId, task, activity })
        // showSuccessMsg('Task added')
      } catch (err) {
        console.log(err)
        // showErrorMsg('Cannot add Task')
      }
    },
    toggleModal(cmpType, ev, id) {
      if (ev) this.setModalPos(ev)
      let isModalOpen = true
      let type = cmpType

      if (this.modal.type === cmpType || !cmpType) {
        isModalOpen = false
        type = null
      }
      this.modal.isModalOpen = isModalOpen
      this.modal.type = type
      if (id) this.modal.id = id
    },
    toggleKey(key) {
      const newVal = !this.task[key]
      let activity = [newVal, key, 'to', this.task.title]
      this.saveTask({ key, newVal, activity })
    },
    setModalPos(ev) {
      const target = ev.target.localName === 'span' ? ev.target.offsetParent : ev.target
      let { x, y, height } = target.getBoundingClientRect()
      y += height + 4
      this.modal.pos.left = x
      this.modal.pos.top = y
    },
  },
  components: {
    TaskDescription,
    ModalPicker,
    TaskHeadTags,
    TaskChecklist,
    TaskAttachments,
    TaskActivities,
  },
}
</script>
