<template>
  <RouterLink style="text-decoration: none" :to="'/board/' + boardId + '/' + this.groupId + '/' + task.id">
    <div class="task-preview">
      <h2 class="task-preview-title">{{ task.title }}</h2>
      <div class="task-preview-footer">
        <div class="action-badges">
          <!-- <div v-if="task.members.length" class="badge-watch"></div> -->
          <!-- <div class="badge-date">mar 25</div> -->
          <div v-if="task.description" class="badge-description"></div>
          <!-- <div class="badge-attachments">1</div> -->
          <div v-if="task.checklists?.length" class="badge-checklist"> {{ checklist.checkedItems }}/{{ checklist.totalItems }}

          </div>
        </div>

        <TaskMember :members="task.members" />
      </div>
    </div>
  </RouterLink>

  <!-- <RouterView /> -->
</template>

<script>
import TaskMember from '../TaskMember.vue';

export default {
  name: "TaskPreview",
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
    return {};
  },
  methods: {},
  computed: {
    boardId() {
      return this.$store.getters.watchedBoardId;
    },
    board() {
      return this.$store.getters.watchedBoard;
    },
    checklist() {
      const checklists = this.task.checklists
      const stats = {
        totalItems: 0,
        checkedItems: 0,
      };

      const result = checklists.reduce((accumulator, current) => {
        current.checklist.forEach((item) => {
          accumulator.totalItems++;
          if (item.isChecked) {
            accumulator.checkedItems++;
          }
        });

        return accumulator;
      }, stats);

      return result;
    }



  },
  created() { },
  components: {
    TaskMember,
  },
};
</script>

<style></style>
