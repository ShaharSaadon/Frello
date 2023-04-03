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
            <i class="filter-icon" v-html="getSvg('filter')"></i>
            Filter
            <button @click.stop="clearFilter" class="btn-filter-clear" v-if="isFiltering"></button>
          </button>

          <button class="btn-record" @click="toggleMic">
            <i class="filter-icon" :class="isActive" v-html="getSvg('record')" ></i>
            Talk to me
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

      <GroupList v-if="groups?.length" :groups="groups" @updateGroup="updateGroup" @removed="removeGroup"
        @addGroup="addGroup" @saveTask="saveTask" @updateGroups="updateGroups" @updateTasksPos="updateTasksPos" />
    </div>
    <RightSideBar :type="rightSideBar.type" @switchDynamicCmp="toggleSideBar" @onChangeBackground="onChangeBackground" />
    <FilterBy v-if="isFilterOpen" :currFilterBy="filterBy" @setFilterBy="setFilterBy"
      @closeFilterBy="isFilterOpen = false" />
    <QuickEdit :quickEditPos="quickEditPos" ref="quickEdit" @closeFastEdit="quickEdit.isOn = false"
      v-if="quickEdit.isOn" />
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
      isFilterOpen: false,
      filterBy: {
        txt: '',
        members: [],
        dueDate: [],
        labels: [],
      },
      quickEdit: {
        isOn: false,
        pos: { top: null, left: null, height: null },
      },
      sr: null,
      isRecording: false,
      text: null,
      blue: {
        bgc: '#07479E',
        bgImg: 'url(https://a.trellocdn.com/prgb/assets/707f35bc691220846678.svg)',
        LeftSideBarBgc: 'hsla(215,90%,37.7%,0.9)',
      },
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
    quickEditPos() {
      let x = this.quickEdit.pos.left
      let y = this.quickEdit.pos.top
      // let quickEditHeight = this.quickEdit.pos.height
      const { width } = window.visualViewport
      if (width - x < 265) x = width - 265
      if (y > 495) y = 495
      return { top: y + 'px', left: x + 'px' }
    },
    isFiltering() {
      const { txt, dueDate, labels, members } = this.filterBy
      if (!!txt || !!dueDate?.length || !!labels?.length || !!members?.length) return true
      else return false
    },
    isActive(){
      return this.isRecording ? 'active' : ''
    }
  },
  created() {
    socketService.on(SOCKET_EVENT_BOARD_UPDATED, this.updateBoard)
    eventBus.on('onFastEdit', ({ x, y }) => {
      this.setQuickEditPos(x, y)
      this.quickEdit.isOn = !this.quickEdit.isOn
      // if (this.quickEdit.isOn) {
      //   this.$nextTick(() => {
      //     this.quickEdit.pos.height = this.$refs.quickEdit.$el.offsetHeight
      //   })
      // }
    })
    this.recording()
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
    clearFilter() {
      this.filterBy = {
        txt: '',
        members: [],
        dueDate: [],
        labels: [],
      }
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
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
    onOpenMenu() {
      this.$store.commit('onToggleMenu')
    },
    toggleSideBar(ev) {
      this.rightSideBar.type = ev
    },
    setQuickEditPos(x, y) {
      this.quickEdit.pos.left = x
      this.quickEdit.pos.top = y
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
    recording() {
      const Recognition = window.speechRecognition || window.webkitSpeechRecognition
      this.sr = new Recognition()
      this.sr.continuous = true
      this.sr.interimResults = true
      this.sr.onstart = () => {
        console.log('SR started')
        this.isRecording = true
      }
      this.sr.onend = () => {
        console.log('SR stopped')
        this.isRecording = false
      }
      this.sr.onresult = (evt) => {
        const text = Array.from(evt.results).map(result => result[0]).map(result => result.transcript).join('')
        console.log('text:', text)
        this.text = text
        this.checkForCommand()
      }
    },
    toggleMic() {
      console.log('this.isRecording:', this.isRecording)
      if (this.isRecording) {
        console.log('checking')
        this.sr.stop()
      } else {
        this.sr.start()
      }
    },
    checkForCommand() {
      setTimeout(() => {
        if (this.text.includes('להחליף')) {
          this.onChangeBackground(this.blue)
          this.sr.stop()
        }
        if (this.text.includes('תחליף')) {
          this.onChangeBackground(this.blue)
          this.sr.stop()
        }
        if (this.text.includes('רקע')) {
          this.onChangeBackground(this.blue)
          this.sr.stop()
        }
        if (this.text.includes('רכב')) {
          this.onChangeBackground(this.blue)
          this.sr.stop()
        }
      }, 2000);

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
