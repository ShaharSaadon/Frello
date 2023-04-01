<template>
  <section class="drop-down">
    <div class="main-filter">
      <div v-if="dropDown.type === 'members'" class="filter-item-list">
        <div
          v-for="member in filteredMembers"
          :key="member._id"
          @click="setFilterBy('members', member._id)"
          class="filter-item-preview"
        >
          <span :class="isCheckedMembers[member._id] ? 'checked' : ''" class="check-box"></span>
          <img :src="member.imgUrl" class="filter-icon-container" />
          <h5>{{ member.fullname }}<span class="username">@{{ member.username }}</span></h5>
        </div>
      </div>

      <div v-if="dropDown.type === 'labels'" class="filter-item-list">
        <div
          v-for="label in filteredLabels"
          :key="label.id"
          @click="setFilterBy('labels', label.id)"
          class="filter-item-preview"
        >
          <span :class="{ checked: isCheckedLabels(label.id) }" class="check-box"></span>
          <div :class="label.color" class="label-tag">{{ label.title }}</div>
        </div>
      </div>
    </div>
    <button @click="$emit('closeModal')">close</button>
  </section>
</template>

<script>
import { svgService } from '../../services/svg.service'
import { userService } from '../../services/user.service'

export default {
  name: 'FilterBy',
  props: {
    dropDown: {
      type: Object,
    },
    currFilterBy: {
      type: Object,
    },
  },
  data() {
    return {
      filterBy: {
        txt: '',
        members: [],
        dueDate: [],
        labels: [],
      },
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
      this.$emit('setFilterBy', JSON.parse(JSON.stringify(this.filterBy)))
    },
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
  },
  computed: {
    members() {
      return this.$store.getters.watchedBoard.members.filter((member) => member._id !== this.loggedInUser._id)
    },
    filteredMembers() {
      const regex = new RegExp(this.dropDown.txt, 'i')
      return this.members.filter((member) => regex.test(member.fullname) || regex.test(member.username))
    },
    isCheckedMembers() {
      const checkedMembers = {}
      this.filterBy.members?.forEach((memberId) => {
        checkedMembers[memberId] = true
      })
      return checkedMembers
    },
    loggedInUser() {
      return userService.getLoggedinUser()
    },
    labels() {
      return JSON.parse(JSON.stringify(this.$store.getters.labels))
    },
    filteredLabels() {
      const regex = new RegExp(this.dropDown.txt, 'i')
      return this.labels.filter((label) => regex.test(label.title) || regex.test(label.color))
    },
    isCheckedLabels() {
      return (labelId) => this.filterBy.labels?.includes(labelId)
    },
  },
  created() {
    this.filterBy = JSON.parse(JSON.stringify(this.currFilterBy))
  },
  components: {},
}
</script>
