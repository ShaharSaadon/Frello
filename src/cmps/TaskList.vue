<template>
  <section class="task-list">
    <div class="draggable-task-list">
      <Draggable
        v-if="tasks.length"
        v-model="taskList"
        class="list-task"
        ghost-class="ghost"
        item-key="name"
        drag-class="drag"
        @start="drag = true"
        @end="drag = false"
        group="tasks"
      >
        <template #item="{ element }">
          <div class="">
            <TaskPreview :task="element" :groupId="groupId" />
          </div>
        </template>
      </Draggable>
    </div>

    <!-- <ul v-if="tasks.length" class="clean-list">
      <TaskPreview v-for="task in tasks" :key="task.id" :task="task" :groupId="groupId" />
    </ul> -->
  </section>
</template>

<script>
import TaskPreview from './TaskPreview.vue'
import { svgService } from '../services/svg.service.js'
import Draggable from 'vuedraggable'

export default {
  name: 'TaskList',
  emits: ['removeTask', 'updateTasks'],
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
    return {}
  },
  methods: {
    getSvg(iconName) {
      return svgService.getTrelloSvg(iconName)
    },
  },
  computed: {
    taskList: {
      get() {
        return this.tasks
      },
      set(tasks) {
        this.$emit('updateTasks', {tasks, groupId:this.groupId})
      },
    },
  },
  created() {},
  components: {
    TaskPreview,
    Draggable,
  },
}
</script>

<style></style>
