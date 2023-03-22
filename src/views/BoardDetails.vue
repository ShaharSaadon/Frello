<template>
  <section v-if="board" class="board-details">
    <header class="board-header">
      <h1>Board Details - {{ board.title }}</h1>
    </header>

    <GroupList :groups="groups" @updateGroup="updateGroup" @removed="removeGroup" @addGroup="addGroup" @addTask="addTask"/>
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
      // boardId: this.$route.params.id;
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
  },
  components: {
    GroupList,
  },
  methods: {
    async updateGroup() {
      try {
        const board = JSON.parse(JSON.stringify(this.board));
        board.groups[0].title = prompt("New title?", board.groups[0].title);
        await this.$store.dispatch(getActionUpdateBoard(board));
        showSuccessMsg("Board updated");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot update board");
      }
    },
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
        await this.$store.dispatch({ type: "addGroup", boardId: this.boardId, group});
        showSuccessMsg("Group added");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add Group");
      }
    },
    async addTask({newTask, groupId}) {
      console.log('newTask',newTask)
      console.log('newTask',groupId)
      // try {
      //   await this.$store.dispatch({ type: "addTask", groupId});
      //   showSuccessMsg("Task added");
      // } catch (err) {
      //   console.log(err);
      //   showErrorMsg("Cannot add Task");
      // }
    },
    async updateGroup(group) {
      group = {...group}
      try {
        await this.$store.dispatch({ type: "updateGroup",  boardId: this.boardId, group});
        showSuccessMsg("group updated");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot update group");
      }
    },
  },
};
</script>
