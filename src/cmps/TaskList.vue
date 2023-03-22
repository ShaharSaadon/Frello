<template>
  <section class="task-list">
    <ul v-if="tasks.length" class="clean-list">
      <TaskPreview v-for="task in tasks" :key="task.id" :task="task" :groupId="groupId" />
  
    </ul>
    
  </section>

</template>

<script>
import TaskPreview from "./TaskPreview.vue";
import { svgService } from "../services/svg.service.js";

export default {
  name: "TaskList",
  emits: ['removeTask'],
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    groupId: {
      type: String,
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
  computed: {},
  created() { },
  components: {
    TaskPreview,
  },
};
</script>

<style></style>
