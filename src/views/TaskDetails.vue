<template>
  <section class="task-details">
    <main class="container">
      <RouterLink :to="'/board/' + boardId" class="close"></RouterLink>
      <div class="header">
        <div class="title icon-card">
          <textarea
            @blur="saveTask"
            ref="textarea"
            v-model="task.title"
            @keydown.enter.prevent="onEnter"
          ></textarea>
        </div>
        <p>in list {{ task.title }}</p>
        <pre>{{ task }} </pre>
      </div>
      <div class="main-content">
        <TaskDescription
          @saveDescription="saveTask"
          :taskDescription="task.description"
        />

        <!-- <TaskChecklist :taskDescription="task.description" /> -->
      </div>
      <div class="sidebar flex">
        <div class="flex space-between">
          <h3>Suggested</h3>
          <button class="gear"></button>
        </div>
        <button class="btn-link member"><span> Join</span></button>
        <h3>Add to card</h3>

        <button class="btn-link member"><span> Members</span></button>
        <button class="btn-link label"><span> Labels</span></button>
        <button class="btn-link checklist"><span> Checklist</span></button>
        <button class="btn-link clock"><span> Dates</span></button>
        <button class="btn-link attachment"><span> Attachment</span></button>
        <button class="btn-link card-cover"><span> Cover</span></button>
        <!-- <button class="button-link"> Custom Fields</button> -->
        <h3>Actions</h3>
        <button @click="removeTask" class="btn-link archive">
          <span> Archive</span>
        </button>
      </div>
    </main>
  </section>
</template>

<script>
// import {boardService} from '../services/board.service'
// import GroupList from '../cmps/GroupList.vue'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { svgService } from "../services/svg.service.js"
import TaskDescription from "../cmps/TaskDescription.vue"

export default {
  watch: {
    taskId: {
      handler() {
        if (this.taskId) {
          this.$store.commit({
            type: "setCurrTask",
            boardId: this.boardId,
            groupId: this.groupId,
            taskId: this.taskId,
          })
        }
      },
      immediate: true,
    },
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
    task() {
      return { ...this.$store.getters.currTask }
    },
  },
  methods: {
    onEnter(ev) {
      this.$refs.textarea.blur()
    },
    async removeTask() {
      try {
        this.$store.dispatch({
          type: "removeTask",
          groupId: this.groupId,
          taskId: this.task.id,
        })
        showSuccessMsg("Task Removed")
        this.$router.push("/board/" + this.boardId)
      } catch (err) {
        console.log(err)
        showErrorMsg("Cannot add Task")
      }
    },
    async saveTask({ key, newVal }) {
      this.task[key] = newVal
      const groupId = this.groupId
      const task = this.task
      try {
        this.$store.dispatch({ type: "saveTask", groupId, task })
        showSuccessMsg("Task added")
      } catch (err) {
        console.log(err)
        showErrorMsg("Cannot add Task")
      }
    },
  },
  components: {
    TaskDescription,
  },
}
</script>
