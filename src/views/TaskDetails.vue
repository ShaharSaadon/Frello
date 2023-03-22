<template>
  <section class="task-details">
    <main class="container">
      <div class="header">
        <span></span>
        <div class="title">
          <!-- <h2>{{ rowCount }}</h2> -->
          <textarea ref="textarea" v-model="taskToEdit.title" @keydown.enter.prevent="enter" hidden></textarea>
        </div>
        <p>in list {{ task.title }} </p>
        <!-- <pre>{{ task }} </pre> -->
      </div>
      <div class="main-content">
        <!-- <TaskDescription :taskDescription="task.description" /> -->
        <!-- <TaskChecklist :taskDescription="task.description" /> -->
      </div>
      <div class="sidebar flex">
        <div class="flex space-between">
          <h3>Suggested</h3>
          <button class="gear"></button>
        </div>
        <button class="button-link member"> Join</button>
        <h3>Add to card</h3>
        
        <button class="button-link member"> Members</button>
        
        <button class="button-link label"> Labels</button>
        <button class="button-link checklist"> Checklist</button>
        <button class="button-link clock"> Dates</button>
        <button class="button-link attachment"> Attachment</button>
        <button class="button-link card-cover"> Cover</button>
        <!-- <button class="button-link"> Custom Fields</button> -->
        <h3>Actions</h3>
        <button class="button-link archive"> Archive</button>
      </div>



      <button @click="removeTask">x</button>
    </main>
  </section>
</template>

<script>
// import {boardService} from '../services/board.service'
// import GroupList from '../cmps/GroupList.vue'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { svgService } from "../services/svg.service.js"
import  TaskDescription  from "../cmps/TaskDescription.vue"

export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      taskToEdit: {}
    }
  },
  async created() {
    this.taskToEdit = { ...this.task }
  },
  watch: {
  },
  computed: {
        boardId() {
            return this.$store.getters.watchedBoardId
        },
      },
  methods: {
    enter(ev) {
      console.log("ev: ", ev);
      ev.preventDefault()
      ev.target.blur()
    },
    async removeTask() {
      try {
        this.$store.dispatch({ type: 'removeTask', groupId: this.groupId, taskId: this.task.id })
        showSuccessMsg("Task Removed");
        this.$router.push('/board/' + this.boardId)

      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add Task");
      }
    }
  },
  components: {
    TaskDescription
  }
}
</script>