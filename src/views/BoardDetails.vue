<template>
  <section v-if="board" class="board-details" :style="board.style">
    <LeftSideBar @onToggleStarred="onToggleStarred" />
    <div class="main">
      <header class="board-header flex space-between">
        <div class="left-side-header flex align-center">
          <h1 @click="onStartEdit" v-if="!isTitleOnEdit">{{ board.title }}</h1>
          <input class="title-input" type="text" v-if="isTitleOnEdit" v-model="editedTitle" ref="titleInput"
            @keydown.enter.prevent="changeTitle" @blur="changeTitle" />
          <button :class="getStarClass" @click="onToggleStarred(board)" class="btn-header-star"></button>
          <span class="separate-line"></span>
        </div>
        <div class="right-side-header flex align-center">
          <button class="btn-filter" @click="isFilterOpen = true">
            <i class="filter-icon" v-html="getSvg('filter')"></i>Filter
          </button>
          <span class="separate-line"></span>
          <!-- right side of header goes here -->
          <BoardMembers />
          <RouterLink :to="board._id + '/share'">
            <button class="btn-share"><i className="icon" v-html="getSvg('share')"></i><span>Share</span></button>
          </RouterLink>
          <RouterLink :to="board._id + '/dashboard'">
            <button class="btn-share"><i className="icon" v-html="getSvg('share')"></i><span>Dashboard </span></button>
          </RouterLink>

          <span class="separate-line"></span>
          <div class="three-dot-btn" @click="onOpenMenu" v-if="!isExpended"></div>
        </div>
      </header>

      <GroupList
        v-if="groups?.length"
        :groups="groups"
        @updateGroup="updateGroup"
        @removed="removeGroup"
        @addGroup="addGroup"
        @saveTask="saveTask"
        @updateGroups="updateGroups"
        @updateTasksPos="updateTasksPos"
      />
    </div>
    <RightSideBar
      :type="rightSideBar.type"
      @switchDynamicCmp="toggleSideBar"
      @onChangeBackground="onChangeBackground"
    />

    <RouterView />
  </section>
</template>

<script>
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EMIT_SET_BOARD_ID, SOCKET_EVENT_BOARD_UPDATED } from '../services/socket.service'
import { svgService } from '../services/svg.service'
import { getActionRemoveGroup, getActionUpdateBoard } from '../store/board.store'
import GroupList from '../cmps/BoardDetails/GroupList.vue'
import LeftSideBar from '../cmps/BoardDetails/LeftSideBar.vue'
import TaskHeadTags from '../cmps/TaskDetails/TaskHeadTags.vue'
import BoardMembers from '../cmps/BoardDetails/BoardMembers.vue'
import RightSideBar from '../cmps/BoardDetails/RightSideBar.vue'
import FilterBy from '../cmps/BoardDetails/FilterBy.vue'
import { userService } from '../services/user.service'
import QuickEdit from '../cmps/BoardDetails/QuickEdit.vue'

export default {
  data() {
    return {
      rightSideBar: {
        type: 'SideBarMain',
      },
      isTitleOnEdit: false,
      editedTitle: '',
    }
  },
  watch: {
    boardId: {
      handler() {
        if (this.boardId) {
          this.$store.commit({ type: 'setWatchedBoardId', boardId: this.boardId })
          socketService.emit(SOCKET_EMIT_SET_BOARD_ID, this.boardId)
        }
      },
      immediate: true,
    },
    board: {
      handler() {
        if (this.board) {
          console.log('this.board: ', this.board)
          this.$store.commit({ type: 'setAppHeaderBgc', bgc: this.board.appHeaderBgc })
          document.title = this.board.title + ' | Merllo'
          this.editedTitle = this.board.title
        }
      },
      immediate: true,
    },
  },
  computed: {
    board() {
      return this.$store.getters.watchedBoard
    },
    boardId() {
      return this.$route.params.id
    },
    groups() {
      const groups = JSON.parse(JSON.stringify(this.board.groups))
      return groups.map((group) => {
        group.tasks = group.tasks.filter((task) => {
          // if (task.members.includes('64257cdba8754b4d0079fd70')) return task
          if (
            this.filterTasksByTxt(task) &&
            this.filterTasksByMembers(task) &&
            this.filterTasksByDate(task) &&
            this.filterTasksByLabels(task)
          )
            return task
        })
        return group
      })
    },
    // groups() {
    //   return this.board.groups
    // },
    getStarClass() {
      return this.board.isStarred ? 'starred' : ''
    },
    isExpended() {
      return this.$store.getters.isRightSideBarOpen
    },
    isAdmin() {
      return userService.getLoggedinUser().isAdmin
    },
  },
  created() {
    socketService.on(SOCKET_EVENT_BOARD_UPDATED, this.updateBoard)
    eventBus.on('onFastEdit', (ev) => {
      console.log('ev:', ev)
      // if (ev) this.setQuickEditPos(ev)toggleEdit
      this.fastEdit.isOnFastEdit = !this.fastEdit.isOnFastEdit
    })
  },
  unmounted() {
    document.title = 'Merllo'
  },
  components: {
    GroupList,
    LeftSideBar,
    TaskHeadTags,
    BoardMembers,
    RightSideBar,
    QuickEdit,
    FilterBy,
  },
  methods: {
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
    filterTasksByTxt(task) {
      const { txt } = this.filterBy
      const regex = new RegExp(txt, 'i')
      return regex.test(task.title)
    },
    filterTasksByMembers(task) {
      const { members } = this.filterBy

      if (members?.length) {
        if (task.members.some((member) => members.includes(member))) return true
        if (members.includes('noMembers')) {
          if (!task.members.length) return true
        }
      } else {
        return true
      }

      return false
    },
    filterTasksByLabels(task) {
      const { labels } = this.filterBy

      if (labels?.length) {
        if (task.labels.some((label) => labels.includes(label))) return true

        if (labels.includes('noLabels')) {
          if (!task.labels.length) return true
        }
      } else {
        return true
      }

      return false
    },
    filterTasksByDate(task) {
      const { dueDate } = this.filterBy
      if (!dueDate?.length) return true
      const msDay = 1000 * 60 * 60 * 24
      const taskDueDate = new Date(task?.dueDate)
      const diff = taskDueDate - Date.now()

      if (dueDate.includes('noDates')) {
        if (!task.dueDate) return true
      }
      if (dueDate.includes('dueSoon')) {
        if (diff < msDay && diff > 0) return true
      }
      if (dueDate.includes('overdue')) {
        if (diff < 0 && task?.dueDate) return true
      }

      return false
    },
    updateBoard(board) {
      this.$store.commit(getActionUpdateBoard(board))
    },
    async removeGroup(groupId) {
      try {
        await this.$store.dispatch(getActionRemoveGroup(this.boardId, groupId))
        // showSuccessMsg('Group removed')
      } catch (err) {
        console.log(err)
        // showErrorMsg('Cannot remove Group')
      }
    },
    async addGroup(group) {
      try {
        await this.$store.dispatch({ type: 'addGroup', boardId: this.boardId, group })
        // showSuccessMsg('Group added')
      } catch (err) {
        console.log(err)
        // showErrorMsg('Cannot add Group')
      }
    },
    async saveTask({ task, groupId }) {
      try {
        let activity = ['added', task.title, 'to', this.groupById(groupId).title]
        this.$store.dispatch({ type: 'saveTask', groupId, task, activity })
        // showSuccessMsg('Task added')
      } catch (err) {
        console.log(err)
        // showErrorMsg('Cannot add Task')
      }
    },
    async updateGroup(group) {
      try {
        await this.$store.dispatch({ type: 'updateGroup', boardId: this.boardId, group })
        // showSuccessMsg('group updated')
      } catch (err) {
        console.log(err)
        // showErrorMsg('Cannot update group')
      }
    },
    async updateGroups(groups) {
      try {
        await this.$store.dispatch({ type: 'updateGroups', boardId: this.boardId, groups })
        // showSuccessMsg('board Drag updated')
      } catch (err) {
        console.log(err)
        // showErrorMsg('Cannot Drag group')
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
        // showSuccessMsg('board Drag updated')
      } catch (err) {
        console.log(err)
        // showErrorMsg('Cannot Drag group')
      }
    },
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
    onOpenMenu() {
      this.$store.commit('onToggleMenu')
    },
    toggleSideBar(ev) {
      this.rightSideBar.type = ev
    },
    setQuickEditPos(ev) {
      const target = ev.target.localName === 'span' ? ev.target.offsetParent : ev.target
      let { x, y, height } = target.getBoundingClientRect()
      y += height + 4
      this.fastEdit.pos.left = x
      this.fastEdit.pos.top = y
    },
    async onChangeBackground({ LeftSideBarBgc, bgImg, bgc }) {
      const style = {
        backgroundImage: `${bgImg}`,
      }
      try {
        this.$store.commit('setAppHeaderBgc', { bgc })
        await this.$store.dispatch({ type: 'updateBoardEntity', key: 'appHeaderBgc', val: bgc })
        await this.$store.dispatch({ type: 'updateBoardEntity', key: 'style', val: style })
        await this.$store.dispatch({ type: 'updateBoardEntity', key: 'LeftSideBarBgc', val: LeftSideBarBgc })
      } catch (err) {
        console.log(err)
      }
    },
    groupById(groupId) {
      return this.groups.find((group) => group.id === groupId)
    },
    onStartEdit() {
      this.isTitleOnEdit = true
      this.$nextTick(() => {
        this.$refs.titleInput.focus()
        this.$refs.titleInput.select()
      })
    },
    async changeTitle() {
      try {
        await this.$store.dispatch({ type: 'updateBoardEntity', key: 'title', val: this.editedTitle })
        this.isTitleOnEdit = false
      } catch (err) {
        console.log(err)
      }
    },

  },
}
</script>
