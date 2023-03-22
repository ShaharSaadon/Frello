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

      <TaskList :tasks="tasks" :groupId="group.id" />
      <button @click="$emit('removed')">x</button>

      <footer class="flex">
        <p class="add-a-card" @click="$emit('addTask')">Add a card</p>
        <span className="icon" v-html="getSvg('filter')"></span>
      </footer>
    </div>
  </li>
</template>

<script>
import TaskList from "../cmps/TaskList.vue";
import { svgService } from "../services/svg.service.js";

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
      cloneGroup: { ...this.group },
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getTrelloSvg(iconName);
    },
    addTask() {
      this.$store.dispatch({ type: "addTask", group: this.group });
    },
    updateGroup() {
      this.$emit("updateGroup", this.cloneGroup);
    },
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
