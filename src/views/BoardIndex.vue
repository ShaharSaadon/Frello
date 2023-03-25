<template>
  <!-- <div class="board-index main-container"> -->
  <div class="board-index grid">
    <div class="title-type-boards flex align-center">
      <span class="starred-boards-icon"></span>
      <h3>Starred boards</h3>
    </div>
    <ul class="board-list clean-list">
      <BoardPreview
        v-for="board in starredBoards"
        :key="board._id"
        :board="board"
        @removeBoard="removeBoard"
        @updateBoard="updateBoard"
        @updateBoardEntity="updateBoard"
      />
    </ul>

    <div class="title-type-boards flex align-center">
      <h3>Other boards</h3>
    </div>
    <ul class="board-list clean-list">
      <li class="add-board">
        <button class="btn-add-board" @click="openModal"></button>
      </li>
      <BoardPreview
        v-for="board in unStarredBoards"
        :key="board._id"
        :board="board"
        @removeBoard="removeBoard"
        @updateBoard="updateBoard"
        @updateBoardEntity="updateBoard"
      />
    </ul>

    <ModalPicker v-if="modal.isShowModal" :type="modal.type" @closeModal="closeModal" @createBoard="createBoard" />
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { boardService } from '../services/board.service.local'
import BoardPreview from '../cmps/BoardPreview.vue'
import ModalPicker from '../cmps/ModalPicker.vue'
import { getActionRemoveBoard, getActionUpdateBoard } from '../store/board.store'
export default {
  data() {
    return {
      boardToAdd: boardService.getEmptyBoard(),
      modal: {
        type: 'CreateBoard',
        isShowModal: false,
      },
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    boards() {
      return this.$store.getters.boards
    },
    starredBoards() {
      return this.boards.filter((b) => b.isStarred)
    },
    unStarredBoards() {
      return this.boards.filter((b) => !b.isStarred)
    },
  },
  created() {
    // this.$store.dispatch({ type: "loadBoards" });
  },
  methods: {
    async addBoard() {
      try {
        await this.$store.dispatch({ type: 'addBoard', board: this.boardToAdd })
        showSuccessMsg('Board added')
        this.boardToAdd = boardService.getEmptyBoard()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add board')
      }
    },
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch(getActionRemoveBoard(boardId))
        showSuccessMsg('Board removed')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove board')
      }
    },
    // async updateBoard(board) {
    //   try {
    //     board = { ...board }
    //     board.title = prompt('New title?', board.title)
    //     await this.$store.dispatch(getActionUpdateBoard(board))
    //     showSuccessMsg('Board updated')
    //   } catch (err) {
    //     console.log(err)
    //     showErrorMsg('Cannot update board')
    //   }
    // },
    async updateBoard(board) {
      try {
        await this.$store.dispatch(getActionUpdateBoard(board))
        showSuccessMsg('Board updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update board')
      }
    },

    async createBoard({ title, bg }) {
      this.boardToAdd.title = title
      this.boardToAdd.appHeaderBgc = bg.bgc
      this.boardToAdd.LeftSideBarBgc = bg.LeftSideBarBgc
      this.boardToAdd.style.backgroundImage = bg.bgImg
      try {
        await this.$store.dispatch({ type: 'addBoard', board: this.boardToAdd })
        showSuccessMsg('Board added')
        this.boardToAdd = boardService.getEmptyBoard()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add board')
      }
    },

    closeModal() {
      this.modal.isShowModal = false
    },
    openModal() {
      this.modal.isShowModal = true
    },
  },
  mounted() {
    this.$store.commit({ type: 'setAppHeaderBgc', bgc: '#026AA7' })
  },
  components: {
    BoardPreview,
    ModalPicker,
  },
}
</script>
