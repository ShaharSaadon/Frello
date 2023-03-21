<template>
  <div class="board-index">
    <h1>hello board</h1>

    <ul class="board-list">
      <li v-for="board in boards" :key="board._id">
        <router-link :to="'board/' + board._id ">
          {{board.title}}
        </router-link>
        <button @click="removeBoard(board._id)">x</button>
        <button @click="updateBoard(board)">Update</button>

      </li>
    </ul>
    <hr />
    <form @submit.prevent="addBoard()">
      <h2>Add Board</h2>
      <input type="text" v-model="boardToAdd.title" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { boardService } from "../services/board.service.local";
import {
  getActionRemoveBoard,
  getActionUpdateBoard,
} from "../store/board.store";
export default {
  data() {
    return {
      boardToAdd: boardService.getEmptyBoard(),
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    boards() {
      return this.$store.getters.boards;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadBoards" });
  },
  methods: {
    async addBoard() {
      try {
        await this.$store.dispatch({ type: "addBoard", board: this.boardToAdd });
        showSuccessMsg("Board added");
        this.boardToAdd = boardService.getEmptyBoard();
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add board");
      }
    },
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch(getActionRemoveBoard(boardId));
        showSuccessMsg("Board removed");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot remove board");
      }
    },
    async updateBoard(board) {
      try {
        board = { ...board };
        board.title = prompt("New title?", board.title);
        await this.$store.dispatch(getActionUpdateBoard(board));
        showSuccessMsg("Board updated");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot update board");
      }
    },
  },
};
</script>
