<template>
  <section class="task-list">
    <div class="draggable-task-list">
      <Draggable
        
        v-model="taskList"
        class="list-task"
        ghost-class="ghost-task"
        item-key="name"
        drag-class="drag-task"
        @start="drag = true"
        @end="drag = false"
        group="tasks"
      >
        <template #item="{ element }">
          <div class="">
            <TaskPreview v-if="tasks.length" :task="element" :groupId="groupId" />
          </div>
        </template>
      </Draggable>
    </div>

  </section>
</template>

<script>
import TaskPreview from './TaskPreview.vue'
import { svgService } from '../../services/svg.service.js'
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
