<template>
  <section class="filter-by">
    <header class="filter-header">
      <h3>Filter</h3>
      <button class="btn-modal-close" @click="$emit('closeFilterBy')"></button>
    </header>
    <div class="main-filter">
      <h4>Keywoard</h4>
      <input placeholder="Enter a keyword..." @input="debounceEmitFilterBy" v-model="filterBy.txt" type="text" />
      <h4>Members</h4>
      <div class="filter-item-list">
        <div @click="setFilterBy('members', 'noMembers')" class="filter-item-preview">
          <span :class="isNoMembersChecked" class="check-box"></span>
          <div class="filter-icon-container icon-member"></div>
          <h5>No members</h5>
        </div>
        <div @click="setFilterBy('members', loggedInUser._id)" class="filter-item-preview">
          <span :class="isLoggedInUserChecked" class="check-box"></span>
          <img :src="loggedInUser.imgUrl" class="filter-icon-container" />
          <h5>Cards assigned to me</h5>
        </div>
        <div
          @click="setFilterBy('members', member._id)"
          v-for="member in members"
          :key="member._id"
          class="filter-item-preview"
        >
          <span :class="isCheckedMembers[member._id] ? 'checked' : ''" class="check-box"></span>
          <img :src="member.imgUrl" class="filter-icon-container" />
          <h5>{{ member.fullname }}</h5>
        </div>
      </div>
      <h4>Due date</h4>
      <h4>Labels</h4>
    </div>
  </section>
</template>

<script>
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'

export default {
  name: 'FilterBy',
  data() {
    return {
      filterBy: {
        txt: '',
        members: [],
        dueDate: [],
        labels: [],
      },
      isCheckedClass: {},
      debounceEmitFilterBy: null,
    }
  },
  methods: {
    setFilterBy(key, val) {
      if (this.filterBy[key]?.includes(val)) {
        const idx = this.filterBy[key].findIndex((item) => item === val)
        this.filterBy[key].splice(idx, 1)
      } else {
        this.filterBy[key].push(val)
      }

      this.emitFilterBy()
    },
    emitFilterBy() {
      console.log('filter: ', this.filterBy)
      this.$emit('setFilterBy', JSON.parse(JSON.stringify(this.filterBy)))
    },
  },
  computed: {
    members() {
      return this.$store.getters.watchedBoard.members.filter((member) => member._id !== this.loggedInUser._id)
    },
    isCheckedMembers() {
      const checkedMembers = {}
      this.filterBy.members.forEach((memberId) => {
        checkedMembers[memberId] = true
      })
      return checkedMembers
    },
    isLoggedInUserChecked() {
      return this.filterBy.members.includes(this.loggedInUser._id) ? 'checked' : ''
    },
    isNoMembersChecked() {
      return this.filterBy.members.includes('noMembers') ? 'checked' : ''
    },
    loggedInUser() {
      return userService.getLoggedinUser()
    },
  },
  created() {
    this.debounceEmitFilterBy = utilService.debounce(this.emitFilterBy, 400)
  },
  components: {},
}
</script>
