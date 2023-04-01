<template>
  <!-- <div class="board-index main-container"> -->
  <div class="board-index grid">
    <div v-if="starredBoards.length" class="title-type-boards flex align-center">
      <span class="starred-boards-icon icon"></span>
      <h3>Starred boards</h3>
    </div>
  
    <ul class="board-list clean-list">
      <BoardPreview
        v-for="board in starredBoards"
        :key="board._id"
        :board="board"
        @removeBoard="removeBoard"
        @updateBoard="updateBoard"
        @updateBoardEntity="updateBoardEntity"
      />
    </ul>

    <div class="title-type-boards flex align-center">
      <span class="trello-boards-icon icon"></span>
      <h3>Boards</h3>
    </div>
    
    <ul class="board-list clean-list">
      <BoardPreview
        v-for="board in boards"
        :key="board._id"
        :board="board"
        @removeBoard="removeBoard"
        @updateBoard="updateBoard"
        @updateBoardEntity="updateBoardEntity"
      />
      <li class="add-board">
        <button class="btn-add-board" @click="openModal">Create new board</button>
      </li>
    </ul>

    <ModalPicker v-if="modal.isShowModal" :modal="modal" @closeModal="closeModal" @createBoard="createBoard" :style="modalPos" />
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EMIT_SET_BOARD_INDEX, SOCKET_EVENT_BOARD_UPDATED } from '../services/socket.service'
// import { boardService } from '../services/board.service.local.js'
import { boardService } from '../services/board.service.js'
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
        posX: null
      },
      filterBy: {...this.$store.getters.filterBy}
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
    modalPos() {
      let x = this.modal.posX
      const { width } = window.visualViewport
      x += 198
      if (width - x < 304) x = width - 304
      return { top: '48px', left: x + 'px' }
    },
  },
  created() {
    this.filterBy.memberId = this.$store.getters.loggedinUser?._id || ''
    this.$store.commit({ type: "setFilterBy", filterBy: this.filterBy });
    this.$store.dispatch({ type: "loadBoards" });
  },
  unmounted() {
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
      console.log("board: ", board);
      try {
        await this.$store.dispatch(getActionUpdateBoard(board))
        showSuccessMsg('Board updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update board')
      }
    },
    async updateBoardEntity(boardId, key, val) {
      try {
        await this.$store.dispatch({ type: 'updateBoardEntityById', boardId, key, val })
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
      // this.boardToAdd.members.push = this.$store.getters.loggedInUser
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
      this.modal.posX = null
    },
    openModal(ev) {
      const { x } = ev.target.getBoundingClientRect()
      this.modal.posX = x
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
