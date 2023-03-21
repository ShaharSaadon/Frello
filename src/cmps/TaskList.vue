<template>
  <section class="task-list">
    <ul v-if="tasks.length" class="clean-list">
      <TaskPreview
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @removed="$emit('removed', task.id)"
      />
    </ul>
  </section>
</template>

<script>
import TaskPreview from "./TaskPreview.vue";
export default {
  name: "TaskList",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {},
  components: {
    TaskPreview,
  },
};
</script>

<style></style>
