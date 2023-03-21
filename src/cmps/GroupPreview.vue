<template>
  <li class="group-preview-wrapper">
    <div class="group-preview-content">
      <header class="group-preview-header flex space-between align-center">
        <h3>{{ group.title }}</h3>
        <span>...</span>
      </header>

      <TaskList :tasks="tasks" />

      <footer class="flex">
        <p class="add-a-card"> Add a card</p>
        <span className="icon" v-html="getSvg('filter')"></span>
        
      </footer>
    </div>
  </li>
</template>

<script>
import TaskList from "../cmps/TaskList.vue";
import { svgService } from "../services/svg.service.js"

export default {
  name: "GroupPreview",
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    getSvg(iconName) {
      return svgService.getTrelloSvg(iconName);
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
