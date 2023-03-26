<template>
  <section v-if="board" class="board-details" :style="board.style">
    <LeftSideBar @onToggleStarred="onToggleStarred" />
    <div class="main">
      <header class="board-header flex space-between">
        <div class="left-side-header flex align-center">
          <h1>{{ board.title }}</h1>
          <button :class="getStarClass" @click="onToggleStarred(board)" class="btn-header-star"></button>
          <span class="separate-line"></span>
        </div>
        <div class="right-side-header flex align-center">
          <!-- right side of header goes here -->
          <BoardMembers />
          <button class="btn-share"> <i className="icon" v-html="getSvg('share')"></i>Share</button>

          <span class="separate-line"></span>
          <div class="three-dot-btn" @click="onOpenMenu" v-if="!isExpended"></div>

        </div>
      </header>

      <GroupList :groups="groups" @updateGroup="updateGroup" @removed="removeGroup" @addGroup="addGroup"
        @saveTask="saveTask" @updateGroups="updateGroups" @updateTasksPos="updateTasksPos" />
    </div>
    <RightSideBar />

    <RouterView />
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { boardService } from '../services/board.service.local'
import { svgService } from '../services/svg.service'
import { getActionRemoveGroup, getActionUpdateBoard } from '../store/board.store'
import GroupList from '../cmps/BoardDetails/GroupList.vue'
import LeftSideBar from '../cmps/BoardDetails/LeftSideBar.vue'
import TaskHeadTags from '../cmps/TaskDetails/TaskHeadTags.vue'
import BoardMembers from '../cmps/BoardDetails/BoardMembers.vue'
import RightSideBar from '../cmps/BoardDetails/RightSideBar.vue'

export default {
  data() {
    return {}
  },
  async created() { },
  watch: {
    boardId: {
      handler() {
        if (this.boardId) {
          this.$store.commit({ type: 'setWatchedBoardId', boardId: this.boardId })
        }
      },
      immediate: true,
    },
    board: {
      handler() {
        if (this.board) {
          this.$store.commit({ type: 'setAppHeaderBgc', bgc: this.board.appHeaderBgc })
          document.title = this.board.title + ' | Merllo'
        }
      },
      immediate: true,
    },
    isRightMenuOpen: false,
  },
  computed: {
    board() {
      return this.$store.getters.watchedBoard
    },
    boardId() {
      return this.$route.params.id
    },
    groups() {
      return this.board.groups
    },
    getStarClass() {
      return this.board.isStarred ? 'starred' : ''
    },
    isExpended(){
            return this.$store.getters.isRightSideBarOpen
        }
  },
  unmounted() {
    document.title = 'Merllo'
  },
  components: {
    GroupList,
    LeftSideBar,
    TaskHeadTags,
    BoardMembers,
    RightSideBar
  },
  methods: {
    async removeGroup(groupId) {
      try {
        await this.$store.dispatch(getActionRemoveGroup(this.boardId, groupId))
        showSuccessMsg('Group removed')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove Group')
      }
    },
    async addGroup(group) {
      try {
        await this.$store.dispatch({ type: 'addGroup', boardId: this.boardId, group })
        showSuccessMsg('Group added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add Group')
      }
    },
    async saveTask({ task, groupId }) {
      try {
        this.$store.dispatch({ type: 'saveTask', groupId, task })
        showSuccessMsg('Task added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add Task')
      }
    },
    async updateGroup(group) {
      try {
        await this.$store.dispatch({ type: 'updateGroup', boardId: this.boardId, group })
        showSuccessMsg('group updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update group')
      }
    },
    async updateGroups(groups) {
      try {
        await this.$store.dispatch({ type: 'updateGroups', boardId: this.boardId, groups })
        showSuccessMsg('board Drag updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot Drag group')
      }
    },
    async updateTasksPos({ tasks, groupId }) {
      try {
        await this.$store.dispatch({ type: 'updateTasksPos', groupId, tasks })
        showSuccessMsg('board Drag updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot Drag group')
      }
    },
    async onToggleStarred(board) {
      const isStarred = board.isStarred
      try {
        await this.$store.dispatch({ type: 'updateBoardEntity', key: 'isStarred', val: !isStarred })
        showSuccessMsg('board Drag updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot Drag group')
      }
    },
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
    onOpenMenu() {
      this.$store.commit('onToggleMenu')
    },
 
  },
}
</script>
