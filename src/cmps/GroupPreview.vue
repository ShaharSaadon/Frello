<template>
  <li class="group-preview-wrapper">
    <div class="group-preview-content">
      <header class="group-preview-header flex space-between align-center">
        <!-- <h3>{{ group.title }}</h3> -->

        <form @submit.prevent="updateGroup">
          <textarea
            @blur="updateGroup"
            v-model="cloneGroup.title"
            id="w3review"
            name="w3review"
            rows="1"
            cols="50"
          ></textarea>
        </form>

        <span>...</span>
      </header>

      <TaskList :tasks="tasks" :groupId="group.id"/>
      
      <footer class="flex">
        <p v-if="!isOnEdit" class="add-a-card" @click="isOnEdit=true" >Add a card</p>
        <li class="task-preview" v-if="isOnEdit">
            <textarea v-model="newTask.title" @blur="addTask" placeHolder="Enter a title for this card..." rows="1"> </textarea>
        </li>
        <span className="icon" v-html="getSvg('filter')"></span>
      </footer>
      <button @click="$emit('removed')">x</button>
    </div>
  </li>
</template>

<script>
import TaskList from "../cmps/TaskList.vue";
import { svgService } from "../services/svg.service.js";
import { boardService } from "../services/board.service.local.js";

export default {
  name: "GroupPreview",
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cloneGroup: {...this.group},
      isOnEdit: false,
      newTask: boardService.getEmptyTask(),

    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getTrelloSvg(iconName);
    },
    addTask() {
      this.$emit('addTask', {newTask:this.newTask, groupId:this.group.id})
      // this.$store.dispatch({ type: 'addTask', groupId: this.group.id , task:this.newTask})
      // this.newTask = boardService.getEmptyTask();
      // this.isOnEdit = false;
    }
  },
  computed: {
    tasks() {
      return this.group.tasks;
    },
  },
  created() {},
  components: {
    TaskList,
  },
};
</script>

<style></style>
