<template>
  <section class="filter-by">
    <header class="filter-header">
      <h3>Filter</h3>
      <button class="btn-modal-close" @click="$emit('closeFilterBy')"></button>
    </header>
    <div class="main-filter">
      <h4>Keywoard</h4>
      <input
        placeholder="Enter a keyword..."
        @input="debounceEmitFilterBy(filterBy)"
        v-model="filterBy.txt"
        type="text"
      />
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
        <div class="filter-item-preview">
          <span :class="{ checked: !!memberSelected.length }" @click="clearMemberSelected" class="check-box"></span>
          <input
            class="member-drop-down"
            :placeholder="membersPlaceholder"
            @input="onInput"
            v-model="dropDown.txt"
            @click="setDropDownPos($event, 'members')"
            type="text"
          />
        </div>
      </div>
      <h4>Due date</h4>
      <div class="filter-item-list">
        <div @click="setFilterBy('dueDate', 'noDates')" class="filter-item-preview">
          <span :class="isNoDatesChecked" class="check-box"></span>
          <div class="filter-icon-container"><span class="calender" v-html="getSvg('calender')"></span></div>
          <h5>No dates</h5>
        </div>
        <div @click="setFilterBy('dueDate', 'overdue')" class="filter-item-preview">
          <span :class="isOverdueChecked" class="check-box"></span>
          <div class="filter-icon-container icon-clock overdue"></div>
          <h5>Overdue</h5>
        </div>
        <div @click="setFilterBy('dueDate', 'dueSoon')" class="filter-item-preview">
          <span :class="isDueSoonChecked" class="check-box"></span>
          <div class="filter-icon-container icon-clock due-soon"></div>
          <h5>Due in the next day</h5>
        </div>
      </div>
      <h4>Labels</h4>
      <div class="filter-item-list">
        <div @click="setFilterBy('labels', 'noLabels')" class="filter-item-preview">
          <span :class="isNoLabelsChecked" class="check-box"></span>
          <div class="filter-icon-container icon-label"></div>
          <h5>No labels</h5>
        </div>
        <div
          v-for="label in labels"
          :key="label.id"
          @click="setFilterBy('labels', label.id)"
          class="filter-item-preview"
        >
          <span :class="{ checked: isCheckedLabels(label.id) }" class="check-box"></span>
          <div :class="label.color" class="label-tag">{{ label.title }}</div>
        </div>
        <div class="filter-item-preview">
          <span @click="clearLabelsSelected" :class="labelSelected" class="check-box"></span>
          <input
            class="labels-drop-down"
            @input="onInput"
            v-model="dropDown.txt"
            :placeholder="labelsPlaceholder"
            @click="setDropDownPos($event, 'labels')"
            type="text"
          />
        </div>
      </div>
    </div>
    <DropDown
      v-if="dropDown.type"
      @setFilterBy="emitFilterBy"
      ref="dropDown"
      :currFilterBy="filterBy"
      :dropDown="dropDown"
      @closeModal="setDropDownType('')"
      :style="dropDownPos"
    />
  </section>
</template>

<script>
import { svgService } from '../../services/svg.service'
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'
import DropDown from './DropDown.vue'

export default {
  name: 'FilterBy',
  props: {
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
      isCheckedClass: {},
      debounceEmitFilterBy: null,
      dropDown: {
        type: '',
        txt: '',
        pos: {
          x: null,
          y: null,
          height: null,
        },
      },
    }
  },
  methods: {
    onInput() {
      this.$nextTick(() => {
        this.dropDown.pos.height = this.$refs.dropDown.$el.offsetHeight
      })
    },
    setFilterBy(key, val) {
      if (this.filterBy[key]?.includes(val)) {
        const idx = this.filterBy[key].findIndex((item) => item === val)
        this.filterBy[key].splice(idx, 1)
      } else {
        this.filterBy[key].push(val)
      }
      this.emitFilterBy(this.filterBy)
    },
    emitFilterBy(filterBy) {
      this.filterBy = filterBy
      this.$emit('setFilterBy', JSON.parse(JSON.stringify(this.filterBy)))
    },
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
    setDropDownType(type) {
      this.dropDown.type = type
      this.$nextTick(() => {
        this.dropDown.pos.height = this.$refs.dropDown.$el.offsetHeight
      })
    },
    clearMemberSelected() {
      this.filterBy.members = this.filterBy.members.filter(
        (member) => member === this.loggedInUser._id && member === 'noMembers'
      )
      this.emitFilterBy(this.filterBy)
    },
    clearLabelsSelected() {
      this.filterBy.labels = this.filterBy.labels.filter((label) => label === 'noLabels')
      this.emitFilterBy(this.filterBy)
    },
    setDropDownPos(ev, type) {
      this.setDropDownType(type)
      let { x, y, height } = ev.target.getBoundingClientRect()
      console.log('x, y, height: ', x, y, height)
      y += height + 4
      this.dropDown.pos.x = x
      this.dropDown.pos.y = y
    },
  },
  computed: {
    dropDownPos() {
      const y = this.dropDown.pos.y
      const x = this.dropDown.pos.x
      return this.dropDown.type === 'labels'
        ? { top: y - this.dropDown.pos.height - 42 + 'px', left: x + 'px' }
        : { top: y + 2 + 'px', left: x + 'px' }
    },
    members() {
      return this.$store.getters.watchedBoard.members.filter((member) => member._id !== this.loggedInUser._id)
    },
    labels() {
      return JSON.parse(JSON.stringify(this.$store.getters.labels)).splice(0, 3)
    },
    isCheckedMembers() {
      const checkedMembers = {}
      this.filterBy.members.forEach((memberId) => {
        checkedMembers[memberId] = true
      })
      return checkedMembers
    },
    isLoggedInUserChecked() {
      return this.filterBy.members?.includes(this.loggedInUser._id) ? 'checked' : ''
    },
    isNoMembersChecked() {
      return this.filterBy.members?.includes('noMembers') ? 'checked' : ''
    },
    isNoDatesChecked() {
      return this.filterBy.dueDate?.includes('noDates') ? 'checked' : ''
    },
    isOverdueChecked() {
      return this.filterBy.dueDate?.includes('overdue') ? 'checked' : ''
    },
    isDueSoonChecked() {
      return this.filterBy.dueDate?.includes('dueSoon') ? 'checked' : ''
    },
    isNoLabelsChecked() {
      return this.filterBy.labels?.includes('noLabels') ? 'checked' : ''
    },
    loggedInUser() {
      return userService.getLoggedinUser()
    },
    isCheckedLabels() {
      return (labelId) => this.filterBy.labels?.includes(labelId)
    },
    memberSelected() {
      return this.filterBy.members.filter((member) => member !== this.loggedInUser._id && member !== 'noMembers')
    },
    membersPlaceholder() {
      const numOfSelectedMembers = this.memberSelected.length
      if (!numOfSelectedMembers) return 'Select members'
      if (numOfSelectedMembers === 1) return '1 member selected'
      if (numOfSelectedMembers > 1) return `${numOfSelectedMembers} members selected`
    },
    labelSelected() {
      return this.filterBy.labels.filter((label) => label !== 'noLabels')
    },
    labelsPlaceholder() {
      const numOfSelectedLabels = this.labelSelected.length
      if (!numOfSelectedLabels) return 'Select labels'
      if (numOfSelectedLabels === 1) return '1 label selected'
      if (numOfSelectedLabels > 1) return `${numOfSelectedLabels} labels selected`
    },
  },
  created() {
    this.debounceEmitFilterBy = utilService.debounce(this.emitFilterBy, 400)
    this.filterBy = JSON.parse(JSON.stringify(this.currFilterBy))
  },
  components: {
    DropDown,
  },
}
</script>
