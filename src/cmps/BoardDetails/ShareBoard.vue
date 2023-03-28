<template>
  <section @click="isMemberSelect = false" class="share-board">
    <section class="share-board-modal">
      <header class="header-share">
        <h2>Share board</h2>
        <RouterLink :to="'/board/' + boardId">
          <button @click="closeModal" class="btn-exit"></button>
        </RouterLink>
      </header>
      <form @submit.prevent="shareBoard" class="form-share flex">
        <input
          placeholder="Full name"
          v-model="fullname"
          @input="getUsersDebounce"
          @click.stop
          @focus="isMemberSelect = true"
          class="input-share"
          type="text"
        />
        <button class="btn-share">Share</button>
      </form>
      <div class="members-select" v-if="isMemberSelect">
        <div v-for="member in members" :key="member._id" class="member-select" @click.stop="setChosenMember(member)">
          <img :src="member.imgUrl" class="profile-img" />
          <p class="fullname">{{ member.fullname }}</p>
        </div>
      </div>
      <div class="board-members">
        <div v-for="member in boardMembers" :key="member._id" class="board-member">
          <img :src="member.imgUrl" class="profile-img" />
          <p class="fullname">{{ member.fullname }}</p>
          <p class="username">@{{ member.username }} <span class="dot"></span> Workspace {{ getAdminText(member) }}</p>
          <div class="btn-member">
            <span>{{ getAdminText(member) }}</span>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import {utilService} from '../../services/util.service.js'

export default {
  data() {
    return {
      isMemberSelect: false,
      chosenMember: null,
      fullname: '',
      getUsersDebounce: utilService.debounce(this.getUsers)
    }
  },
  computed: {
    boardMembers() {
      return this.$store.getters.boardMembers
    },
    boardId() {
      return this.$route.params.id
    },
    members() {
      return this.$store.getters.users.filter((member) => !this.boardMembers.find((m) => m._id === member._id))
    },
  },
  methods: {
    setChosenMember(member) {
      this.chosenMember = member
      this.isMemberSelect = false
      this.fullname = member.fullname
    },
    shareBoard() {
      if (this.chosenMember.fullname !== this.fullname) return
      // if(this.members.find(member => member._id === this.chosenMember._id)) return
      this.$store.dispatch({ type: 'addMember', member: this.chosenMember })
    },
    getAdminText(member) {
      return this.$store.getters.watchedBoard.createdBy._id === member._id ? 'Admin' : 'Guest'
    },
    getUsers() {
      this.$store.commit({ type: 'setUserFilterBy', filterBy: { txt: this.fullname } })
      this.$store.dispatch({ type: 'loadUsers' })
    },
  },
  created() {
    
  },
}
</script>
