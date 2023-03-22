<template>
  <section class="task-details">
    <main class="container">
      <RouterLink :to="'/board/' + boardId" class="close"></RouterLink>
      <div class="header">
        <div class="title icon-card">
          <textarea
            ref="textarea"
            v-model="taskToEdit.title"
            @keydown.enter.prevent="enter"
            hidden
          ></textarea>
        </div>
        <p>in list {{ task.title }}</p>
        <!-- <pre>{{ task }} </pre> -->
      </div>
      <div class="main-content">
        <TaskDescription @saveDescription="saveTask" :taskDescription="task.description" />
        <!-- <TaskChecklist :taskDescription="task.description" /> -->
      </div>
      <div class="sidebar flex">
        <div class="flex space-between">
          <h3>Suggested</h3>
          <button class="gear"></button>
        </div>
        <button class="button-link member"><span> Join</span></button>
        <h3>Add to card</h3>

        <button class="button-link member"><span> Members</span></button>
        <button class="button-link label"><span> Labels</span></button>
        <button class="button-link checklist"><span> Checklist</span></button>
        <button class="button-link clock"><span> Dates</span></button>
        <button class="button-link attachment"><span> Attachment</span></button>
        <button class="button-link card-cover"><span> Cover</span></button>
        <!-- <button class="button-link"> Custom Fields</button> -->
        <h3>Actions</h3>
        <button @click="removeTask" class="button-link archive"><span> Archive</span></button>
      </div>

    </main>
  </section>
</template>

<script>
// import {boardService} from '../services/board.service'
// import GroupList from '../cmps/GroupList.vue'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { svgService } from "../services/svg.service.js";
import TaskDescription from "../cmps/TaskDescription.vue";

export default {
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
      taskToEdit: {},
    };
  },
  async created() {
    this.taskToEdit = { ...this.task };
  },
  watch: {},
  computed: {
    boardId() {
      return this.$store.getters.watchedBoardId;
    },
    boardId() {
      return this.$route.params.id;
    },
  },
  methods: {
    enter(ev) {
      ev.preventDefault();
      ev.target.blur();
    },
    async removeTask() {
      try {
        this.$store.dispatch({
          type: "removeTask",
          groupId: this.groupId,
          taskId: this.task.id,
        });
        showSuccessMsg("Task Removed");
        this.$router.push("/board/" + this.boardId);
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add Task");
      }
    },
    saveTask({description}){
      console.log("description: ", description);
    }
  },
  components: {
    TaskDescription,
  },
};
</script>
