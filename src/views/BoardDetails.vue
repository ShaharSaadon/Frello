<template>
  <section v-if="board" class="board-details" :style="board.style">
    <header class="board-header">
      <h1>{{ board.title }}</h1>
    </header>

    <GroupList
      :groups="groups"
      @updateGroup="updateGroup"
      @removed="removeGroup"
      @addGroup="addGroup"
      @saveTask="saveTask"
      @updateGroups="updateGroups"
      @updateTasksPos="updateTasksPos"
    />


    <RouterView/>
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { boardService } from "../services/board.service.local";
import { getActionRemoveGroup, getActionUpdateBoard } from "../store/board.store";
import GroupList from "../cmps/GroupList.vue";
 

export default {
  data() {
    return {
    };
  },
  async created() {},
  watch: {
    boardId: {
      handler() {
        if (this.boardId) {
          this.$store.commit({ type: "setWatchedBoardId", boardId: this.boardId });
        }
      },
      immediate: true,
    },
  },
  computed: {
    board() {
      return this.$store.getters.watchedBoard;
    },
    boardId() {
      return this.$route.params.id;
    },
    groups() {
      return this.board.groups;
    },
    myList: {
      get() {
        return this.groups;
      },
      set(value) {
        this.$store.commit("updateList", value);
      },
    },
  },
  components: {
    GroupList,
  },
  methods: {
    async removeGroup(groupId) {
      try {
        await this.$store.dispatch(getActionRemoveGroup(this.boardId, groupId));
        showSuccessMsg("Group removed");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot remove Group");
      }
    },
    async addGroup(group) {
      try {
        await this.$store.dispatch({ type: "addGroup", boardId: this.boardId, group });
        showSuccessMsg("Group added");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add Group");
      }
    },
    async saveTask({task, groupId}) {
      try {
        this.$store.dispatch({ type: 'saveTask', groupId ,task })
        showSuccessMsg("Task added");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add Task");
      }
    },
    async updateGroup(group) {
      try {
        await this.$store.dispatch({ type: "updateGroup", boardId: this.boardId, group });
        showSuccessMsg("group updated");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot update group");
      }
    },
    async updateGroups(groups) {
      try {
        await this.$store.dispatch({ type: "updateGroups", boardId: this.boardId, groups });
        showSuccessMsg("board Drag updated");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot Drag group");
      }
    },
    async updateTasksPos({tasks, groupId}) {
      try {
        await this.$store.dispatch({ type: "updateTasksPos", groupId, tasks });
        showSuccessMsg("board Drag updated");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot Drag group");
      }
    },
  },
};
</script>

