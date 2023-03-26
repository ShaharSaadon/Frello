<template>
  <div class="member-picker">
    <hr />
    <input type="text" placeholder="Search Labels..." class="search-members" />
    <p>Board members</p>
    <ul class="clean-list members flex column">
      <li
        v-for="member in this.membersToPick"
        :key="member._id"
        :member="member"
        class="member-select flex"
        @click="toggleMember(member)"
      >
        <img :src="member.imgUrl" class="member-profile" />
        <p>{{ member.fullname }}({{ member.username }})</p>
      </li>
    </ul>

    <!-- <button>Create a new label</button> -->
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  name: '',
  data() {
    return {
      membersToPick: JSON.parse(JSON.stringify(this.info.members)),
    }
  },
  methods: {
    toggleMember(member) {
      const type = member.isChecked ? 'removeEntityVal' : 'updateEntityVal'
      member.isChecked = !member.isChecked
      this.$emit(type, { key: 'members', val: member._id })
    },
  },
  computed: {},
  created() {
    this.membersToPick.forEach((member) => {
      member.isChecked = this.info.taskMembers.includes(member._id) ? true : false
    })
  },
  components: {},
}
</script>

<style></style>
